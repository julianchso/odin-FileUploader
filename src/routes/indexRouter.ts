import { Router } from 'express';
import { homeGet, loginGet, signUpGet } from '../controller/indexController';

const indexRouter = Router();

indexRouter.get('/', homeGet);
indexRouter.get('/login', loginGet);
indexRouter.get('/sign-up', signUpGet);

export default indexRouter;
