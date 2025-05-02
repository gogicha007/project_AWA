import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggingService } from '../services/logging.service';

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

    this.loggingService.error(
      `Error: ${JSON.stringify(message)} - Request: ${request.method} ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message:
        (status as HttpStatus) === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal Server Error'
          : message,
    });
  }
}
