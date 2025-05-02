import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap, catchError, of } from 'rxjs';
import { UsersService } from '../users/users.service';
import { LoggingService } from 'src/common/services/logging.service';

interface RequestWithUser extends Request {
  user: {
    uid: string;
    email: string;
    name: string;
  };
}
@Injectable()
export class UserSyncInterceptor implements NestInterceptor {
  private userCache = new Map<string, boolean>();

  constructor(
    private usersService: UsersService,
    private loggingService: LoggingService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return next.handle().pipe(
      tap(() => {
        if (request.user && request.user.uid) {
          const userId = request.user.uid;

          if (!this.userCache.has(userId)) {
            this.usersService
              .create({
                firebaseUid: request.user.uid,
                email: request.user.email,
                name: request.user.name,
              })
              .then(() => {
                this.userCache.set(userId, true);
              })
              .catch((error) => {
                if (error instanceof Error) {
                  this.loggingService.error(
                    'Error creating user:',
                    error.stack || 'No stack trace available',
                  );
                } else {
                  this.loggingService.error(
                    'Unknown error while creating user:',
                    JSON.stringify(error),
                  );
                }
              });
          }
        }
      }),
      catchError((error) => {
        if (error instanceof Error) {
          this.loggingService.error(
            'Error in user sync interceptor:',
            error.stack || 'No stack trace available',
          );
        } else {
          this.loggingService.error(
            'Unknown error in user sync interceptor:',
            JSON.stringify(error),
          );
        }
        return of(null);
      }),
    );
  }
}
