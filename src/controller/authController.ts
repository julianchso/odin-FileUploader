import { Request, Response } from 'express';
import { genPassword } from '../utils/passwordUtils';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const homeGet = async (req: Request, res: Response) => {
  res.render('index', {
    title: 'Home',
  });
};

const loginGet = (req: Request, res: Response) => {
  res.render('login', {
    title: 'Log In',
  });
};

const signUpGet = (req: Request, res: Response) => {
  res.render('signUp', {
    title: 'Sign Up',
  });
};

const signUpPost = async (req: Request, res: Response) => {
  const saltHash = genPassword(req.body.password);
  console.log(saltHash);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      salt: salt,
      hash: hash,
    },
  });

  console.log(user);
};

export { homeGet, loginGet, signUpGet, signUpPost };
