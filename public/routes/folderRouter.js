import { Router } from 'express';
import { foldersGet, foldersPost } from '../controller/folderController.js';
const folderRouter = Router();
folderRouter.get('/{:id}', foldersGet);
folderRouter.post('/{:id}', foldersPost);
export default folderRouter;
