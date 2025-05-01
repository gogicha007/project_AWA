import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

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

  private cleanuupInterval: NodeJS.Timeout;

  onModuleInit() {
    this.cleanuupInterval = setInterval(
      () => this.cleanupExpiredTokens(),
      10 * 60 * 1000,
    );
  }

  onModuleDestroy() {
    if (this.cleanuupInterval) {
      clearInterval(this.cleanuupInterval);
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
        if (this.tokenCache.size >= this.MAX_CACHE_SIZE) {
          const entriesToDelete = Math.ceil(this.MAX_CACHE_SIZE * 0.2); // Delete 20% of entries
          const entries = Array.from(this.tokenCache.entries());
          entries.sort((a, b) => a[1].expiry - b[1].expiry); // Sort by expiry

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
        name: decodedToken.displayName,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
