import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Request } from 'express';
import { LoggingService } from 'src/common/services/logging.service';

declare module 'express' {
  interface Request {
    user?: {
      uid: string;
      email?: string;
      name?: string;
    };
  }
}

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  private readonly MAX_CACHE_SIZE = 1000;
  private tokenCache: Map<
    string,
    {
      decodedToken: admin.auth.DecodedIdToken;
      expiry: number;
    }
  > = new Map();

  private cleanupInterval: NodeJS.Timeout;

  constructor(private readonly loggingService: LoggingService) {}

  onModuleInit() {
    this.cleanupInterval = setInterval(
      () => this.cleanupExpiredTokens(),
      10 * 60 * 1000,
    );
  }

  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  private cleanupExpiredTokens() {
    const now = Date.now();
    for (const [token, cached] of this.tokenCache.entries()) {
      if (cached.expiry <= now) {
        this.tokenCache.delete(token);
      }
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
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
        this.loggingService.debug(
          'Cached decoded token: ' + JSON.stringify(decodedToken),
        );
      } else {
        decodedToken = await admin.auth().verifyIdToken(token);

        const expiryTime = Math.min(
          now + 5 * 60 * 1000,
          decodedToken.exp * 1000,
        );
        if (this.tokenCache.size >= this.MAX_CACHE_SIZE) {
          const entriesToDelete = Math.ceil(this.MAX_CACHE_SIZE * 0.2);
          const entries = Array.from(this.tokenCache.entries());
          entries.sort((a, b) => a[1].expiry - b[1].expiry);

          for (let i = 0; i < entriesToDelete && i < entries.length; i++) {
            this.tokenCache.delete(entries[i][0]);
          }
        }

        this.tokenCache.set(token, {
          decodedToken,
          expiry: expiryTime,
        });
      }

      // Add the user to the request object
      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name:
          typeof decodedToken.name === 'string' ? decodedToken.name : undefined,
      };
      return true;
    } catch (error) {
      if (error instanceof Error) {
        this.loggingService.error(
          `Token verification error: ${error.message}`,
          error.stack || 'No stack trace available',
        );
      } else {
        this.loggingService.error(
          'Unknown error during token verification:',
          JSON.stringify(error),
        );
      }

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };

        if (firebaseError.code === 'auth/id-token-expired') {
          throw new UnauthorizedException('Token has expired');
        } else if (firebaseError.code === 'auth/id-token-revoked') {
          throw new UnauthorizedException('Token has been revoked');
        } else if (firebaseError.code === 'auth/invalid-id-token') {
          throw new UnauthorizedException('Invalid token format');
        } else if (firebaseError.code === 'auth/argument-error') {
          throw new UnauthorizedException('Invalid token argument');
        } else {
          throw new UnauthorizedException(
            'Invalid token: ' + firebaseError.message,
          );
        }
      }
    }
    throw new UnauthorizedException('Authentication failed');
  }
}
