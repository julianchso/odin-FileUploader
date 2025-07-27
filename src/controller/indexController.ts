import { Request, Response } from 'express';

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

export { homeGet, loginGet, signUpGet };
