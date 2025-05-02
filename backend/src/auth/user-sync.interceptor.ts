import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { UsersService } from '../users/users.service';

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

  constructor(private usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return next.handle().pipe(
      tap(() => {
        if (request.user && request.user.uid) {
          const userId = request.user.uid;

          if (!this.userCache.has(userId)) {
            void this.usersService.create({
              firebaseUid: request.user.uid,
              email: request.user.email,
              name: request.user.name,
            });

            this.userCache.set(userId, true);
          }
        }
      }),
    );
  }
}
