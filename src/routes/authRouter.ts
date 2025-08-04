import { Router } from 'express';
import {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  logout,
} from '../controller/authController.js';

const authRouter = Router();

// authRouter.get('/', homeGet);

authRouter.get('/login', loginGet);
authRouter.post('/login', loginPost);

authRouter.get('/sign-up', signUpGet);
authRouter.post('/sign-up', signUpPost);

authRouter.get('/logout', logout);

export default authRouter;
