import { Router } from 'express';
import { homeGet, loginGet, signUpGet, signUpPost } from '../controller/authController';

const authRouter = Router();

authRouter.get('/', homeGet);

authRouter.get('/login', loginGet);

authRouter.get('/sign-up', signUpGet);
authRouter.post('/sign-up', signUpPost);

export default authRouter;
