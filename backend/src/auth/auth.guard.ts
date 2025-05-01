import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  private tokenCache: Map<
    string,
    {
      decodedToken: admin.auth.DecodedIdToken;
      expiry: number;
    }
  > = new Map();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const cached = this.tokenCache.get(token);
      const now = Date.now();

      let decodedToken: admin.auth.DecodedIdToken;

      if (cached && cached.expiry > now) {
        decodedToken = cached.decodedToken;
      } else {
        decodedToken = await admin.auth().verifyIdToken(token);
        const expiryTime = Math.min(
          now + 5 * 60 * 1000,
          decodedToken.exp * 1000,
        );
        this.tokenCache.set(token, {
          decodedToken,
          expiry: expiryTime,
        });
      }

      // Add the user to the request object
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.displayName,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
