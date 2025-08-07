import { NextFunction, Request, Response } from 'express';
import { genPassword } from '../utils/passwordUtils.js';
import prisma from '../database/prismaClient.js';
import passport from 'passport';

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

    await prisma.user.create({
      data: {
        username: req.body.username,
        salt: salt,
        hash: hash,
      },
    });

    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }

  // console.log(user);
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
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });
};

export { homeGet, signUpGet, signUpPost, loginGet, loginPost, logout };
