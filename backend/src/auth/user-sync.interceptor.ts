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
  constructor(private usersService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return next.handle().pipe(
      tap(() => {
        if (request.user && request.user.uid) {
          void this.usersService.create({
            firebaseUid: request.user.uid,
            email: request.user.email,
            name: request.user.name,
          });
        }
      }),
    );
  }
}
