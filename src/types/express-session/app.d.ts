// types/express/index.d.ts
import { User as PrismaUser } from '@prisma/client';
import 'express-session';

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

// TODO
declare module 'passport' {
  export interface Authenticator {
    serializeUser<TID>(fn: (user: User, done: (err: any, id?: TID) => void) => void): void;
  }
}

// used for "req.session.passport?.user;" in authController
declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: string;
    };
  }
}
