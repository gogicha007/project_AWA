import {
  Module,
  NestModule,
  MiddlewareConsumer,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import * as admin from 'firebase-admin';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserSyncInterceptor } from './auth/user-sync.interceptor';
import { LoggingService } from './common/services/logging.service';
import { CustomExceptionFilter } from './common/filters/exception.filter';
import { MasterDataModule } from './master-data/master-data.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MasterDataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserSyncInterceptor,
    },
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    try {
      const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
      if (!projectId) {
        throw new Error(
          'FIREBASE_PROJECT_ID environment variable is not defined',
        );
      }

      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId,
      });

      this.logger.log('Firebase Admin SDK initialized successfully');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';

      this.logger.error(
        `Failed to initialize Firebase Admin SKD: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
