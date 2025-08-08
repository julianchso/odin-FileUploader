import { Router } from 'express';
import { homeGet, signUpGet, signUpPost, loginGet, loginPost, logout } from './authController.js';

const authRouter = Router();

authRouter.get('/', homeGet);

authRouter.get('/login', loginGet);
authRouter.post('/login', loginPost);

authRouter.get('/sign-up', signUpGet);
authRouter.post('/sign-up', signUpPost);

authRouter.get('/logout', logout);

export default authRouter;
