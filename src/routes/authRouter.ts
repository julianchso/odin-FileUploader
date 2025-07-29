import { Router } from 'express';
import passport from 'passport';
import { homeGet, signUpGet, signUpPost, loginGet, loginPost } from '../controller/authController';

const authRouter = Router();

authRouter.get('/', homeGet);

authRouter.get('/login', loginGet);
authRouter.post('/login', loginPost);

authRouter.get('/sign-up', signUpGet);
authRouter.post('/sign-up', signUpPost);

export default authRouter;
