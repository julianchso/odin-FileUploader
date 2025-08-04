import { Router } from 'express';
import { foldersGet, foldersPost } from '../controller/folderController.js';

const folderRouter = Router();

folderRouter.get('/{:folderId}', foldersGet);
folderRouter.post('/{:folderId}', foldersPost);

export default folderRouter;
