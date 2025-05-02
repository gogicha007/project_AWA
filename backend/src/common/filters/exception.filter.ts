import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { LoggingService } from '../services/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal Server Error';

    this.loggingService.error(`Error: ${JSON.stringify(message)} - Request: ${request.method} ${request.url}`);

    response.status(status).json({
      statusCode: status,
      message: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : message,
    });
  }
}