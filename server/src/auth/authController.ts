import type { NextFunction, Request, Response } from 'express';
import { genPassword } from '../utils/passwordUtils.js';
import prisma from '../database/prismaClient.js';
import passport from 'passport';
import storageClient from '../database/supabaseClient.js';

const homeGet = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.redirect('/folders');
  } else {
    return res.redirect('/login');
  }
};

const signUpGet = (req: Request, res: Response) => {
  if (req.isAuthenticated()) return res.redirect('/folders');

  res.render('signUp', {
    title: 'Sign Up',
  });
};

const signUpPost = async (req: Request, res: Response) => {
  try {
    const saltHash = genPassword(req.body.password);
    const salt: string = saltHash.salt;
    const hash: string = saltHash.hash;

    const userId = crypto.randomUUID();

    await prisma.user.create({
      data: {
        id: userId,
        username: req.body.username,
        salt: salt,
        hash: hash,
      },
    });

    await createUserFolderSupabase(userId, 'odin-FileUploader');

    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};

const createUserFolderSupabase = async (userId: string, bucketName: string) => {
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await storageClient.storage
    .from(bucketName)
    .upload(`${userId}/.emptyFolderPlaceholder`, new File([''], '.emptyFolderPlaceholder'));

  if (error) {
    console.log(error);
    throw new Error();
  } else {
    console.log('user folder created successfully', data);
  }
};

const loginGet = (req: Request, res: Response) => {
  if (req.isAuthenticated()) return res.redirect('/');
  res.render('login', {
    title: 'Log In',
  });
};

const loginPost = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function () {
      res.redirect('/');
    });
  });
};

export { homeGet, signUpGet, signUpPost, loginGet, loginPost, logout };
