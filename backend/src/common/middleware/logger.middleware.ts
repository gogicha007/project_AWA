import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/common/services/logging.service';

interface TypedRequestBody<T> extends Request {
  body: T;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(
    req: TypedRequestBody<Record<string, unknown>>,
    res: Response,
    next: NextFunction,
  ) {
    const { method, url, query, body } = req;
    this.loggingService.info(
      `Incoming Request: ${method} ${url} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`,
    );

    const originalSend = res.send;
    res.send = (body: unknown): Response => {
      this.loggingService.info(
        `Response: ${res.statusCode} - Body: ${JSON.stringify(body)}`,
      );
      return originalSend.call(res, body) as Response;
    };
    next();
  }
}
