import { Router } from 'express';
import { fileUploadPost, fileDelete } from './fileController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const fileRouter = Router();

fileRouter.post('/', upload.single('uploaded_file'), fileUploadPost);

fileRouter.delete('/delete', fileDelete);

export default fileRouter;
