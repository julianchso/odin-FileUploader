import { Router } from 'express';
import { foldersGet, foldersPost } from '../controller/folderController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const folderRouter = Router();

folderRouter.get('/{:folderId}', isAuthenticated, foldersGet);
folderRouter.post('/{:folderId}', isAuthenticated, foldersPost);

export default folderRouter;
