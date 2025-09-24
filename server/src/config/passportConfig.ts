import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { validatePassword } from '../utils/passwordUtils.js';

import prisma from '../database/prismaClient.js';

export default passport.use(
  new LocalStrategy(async (username: string, password: string, done: Function) => {
    // const user: Promise<string> = await prisma.user
    await prisma.user
      .findUnique({
        where: {
          username: username,
        },
      })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        const isValidPassword = validatePassword(password, user.hash, user.salt);

        if (isValidPassword) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
  })
);

// TODO
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (err) {
    done(err, null);
  }
});
