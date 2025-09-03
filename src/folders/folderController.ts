import { Request, Response } from 'express';
import { createFolder, getFolderById, getFolderTree } from './folderPrisma.js';
import { getFolderData, getRootFolderData } from './folderPrisma.js';
import prisma from '../database/prismaClient.js';
import { getBreadcrumbs } from '../files/filePrisma.js';
// import formatDate from '../utils/formatDateUtils.js';

const foldersGet = async (req: Request, res: Response) => {
  const user = req.session.passport?.user;
  const userId = req.user?.id;

  const folders = await getFolderTree(userId);
  const folderId = req.params.folderId;

  let folderData;

  if (req.params.folderId) {
    await getFolderById(req.params.folderId);
  }

  if (userId && folderId) {
    folderData = await getFolderData(folderId);
  } else if (userId) {
    folderData = await getRootFolderData(userId);
  }

  let breadcrumbs;

  if (folderId) {
    breadcrumbs = await getBreadcrumbs(folderId);
    console.log(breadcrumbs);
  }

  res.render('folders', {
    title: 'Home',
    user: user,
    folders: folders,
    parentFolderId: folderId,
    folderData: folderData,
    breadcrumbs: breadcrumbs,
  });
};

const foldersPost = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const folderName = req.body.newFolderName;
  let parentFolderId = req.body.parentFolderId || null;

  if (userId && req.isAuthenticated()) {
    const newFolder = await createFolder(folderName, userId, parentFolderId);
    return res.redirect(`/folders/${newFolder.id}`);
  }

  res.status(401).send('Not authenticated');
};

const folderEdit = async (req: Request, res: Response) => {
  const { folderId, folderName } = req.body;

  if (!folderId || !folderName) {
    return res.status(400).send('folder ID and name are required');
  }

  await prisma.metadata.update({
    where: {
      id: folderId,
    },
    data: {
      name: folderName,
      modifiedAt: new Date(),
    },
  });

  res.redirect('/folders');
};

const folderDelete = async (req: Request, res: Response) => {
  const folderId = req.body.folderId;
  await prisma.metadata.delete({
    where: {
      id: folderId,
    },
  });

  res.redirect('/folders');
};

export default { foldersGet, foldersPost, folderEdit, folderDelete };
