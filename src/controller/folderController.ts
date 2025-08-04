import prisma from '../database/prismaClient.js';
import { NextFunction, Request, Response } from 'express';

const foldersGet = async (req: Request, res: Response, next: NextFunction) => {
  let user = req.session.passport?.user;
  res.render('folders', {
    title: 'Home',
    user: user,
  });
};

const foldersPost = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const folderName = req.body.newFolderName;
  let parentFolderId;

  if (req.params.id) {
    parentFolderId = req.params.id;
  }

  if (userId && req.isAuthenticated()) {
    createFolder(folderName, userId);
  }
  next();
  res.redirect('/folders');
};

const createFolder = async (name: string, userId: string) => {
  return prisma.metadata.create({
    data: {
      name: name,
      type: 'FOLDER',
      userId: userId,
    },
  });
};

export { foldersGet, foldersPost };
