import { Router } from 'express';
import { fileUpload } from '../controller/fileController.js';

const fileRouter = Router();

fileRouter.post('/', fileUpload);

export default fileRouter;
