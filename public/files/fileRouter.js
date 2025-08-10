import { Router } from 'express';
import { fileUpload } from './fileController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const fileRouter = Router();
// fileRouter.get('/:fileId');
fileRouter.post('/', upload.single('uploaded_file'), fileUpload);
export default fileRouter;
