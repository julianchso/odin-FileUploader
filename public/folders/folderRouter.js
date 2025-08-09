import { Router } from 'express';
import folderController from './folderController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const folderRouter = Router();
folderRouter.get('/{:folderId}', isAuthenticated, folderController.foldersGet);
folderRouter.post('/{:folderId}', isAuthenticated, folderController.foldersPost);
folderRouter.delete('/:folderid', isAuthenticated, folderController.folderDelete);
export default folderRouter;
