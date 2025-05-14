import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LoggingService } from './common/services/logging.service';

dotenv.config();

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.stack);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', JSON.stringify(reason));
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(PORT);

  console.log(`listening on http://localhost:${PORT}`);
}
void bootstrap().catch((error) => {
  console.error('Application bootstrap failed:', error);
  process.exit(1);
});
