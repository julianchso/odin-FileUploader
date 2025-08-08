import { Router } from 'express';
import { foldersGet, foldersPost, folderDelete } from './folderController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const folderRouter = Router();

folderRouter.get('/{:folderId}', isAuthenticated, foldersGet);
folderRouter.post('/{:folderId}', isAuthenticated, foldersPost);

folderRouter.delete('/{:folderid}', isAuthenticated, folderDelete);

export default folderRouter;
