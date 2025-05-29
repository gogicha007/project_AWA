import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggingService } from '../services/logging.service';

function hasMessageProperty(
  obj: object,
): obj is { message: string | string[] } {
  return Boolean(
    Object.prototype.hasOwnProperty.call(obj, 'message') &&
    (typeof (obj as { message?: unknown }).message === 'string' ||
      Array.isArray((obj as { message?: unknown }).message))
  );
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    let errorMessage: string;
    if (typeof message === 'string') {
      errorMessage = message;
    } else if (typeof message === 'object' && message !== null) {
      if (hasMessageProperty(message)) {
        errorMessage = Array.isArray(message.message)
          ? message.message.join(', ')
          : message.message;
      } else {
        errorMessage = JSON.stringify(message);
      }
    } else {
      errorMessage = 'Internal Server Error';
    }

    this.loggingService.error(
      `Error: ${errorMessage} - Request: ${request.method} ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message: errorMessage,
    });
  }
}
