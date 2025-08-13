import { Router } from 'express';
import { fileUploadPost } from './fileController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const fileRouter = Router();

// fileRouter.get('/:fileId');
fileRouter.post('/', upload.single('uploaded_file'), fileUploadPost);

export default fileRouter;
