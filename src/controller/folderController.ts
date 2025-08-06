import prisma from '../database/prismaClient.js';
import { NextFunction, Request, Response } from 'express';
import { createFolder, getFolderById, getFolderTree } from '../helperFunctions/folderHelpers.js';

const foldersGet = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.session.passport?.user;
  const userId = req.user?.id;

  const folders = await getFolderTree(userId);
  const folderId = req.params.folderId;

  if (req.params.folderId) {
    const folder = await getFolderById(req.params.folderId);
    console.log(folder);
  }

  res.render('folders', {
    title: 'Home',
    user: user,
    folders: folders,
    parentFolderId: folderId,
  });
};

const foldersPost = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const folderName = req.body.newFolderName;
  let parentFolderId;

  if (req.body.parentFolderId) {
    parentFolderId = req.body.parentFolderId;
  } else {
    parentFolderId = null;
  }

  if (userId && req.isAuthenticated()) {
    createFolder(folderName, userId, parentFolderId);
  }
  next();
  res.redirect(`/folders/${parentFolderId}`);
};

export { foldersGet, foldersPost };
