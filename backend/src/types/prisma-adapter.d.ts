import '@prisma/client';

declare module '@prisma/client' {
  namespace Prisma {
    interface PrismaClientOptions {
      adapter?: unknown;
    }
  }
}
