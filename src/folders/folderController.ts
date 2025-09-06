import { Request, Response } from 'express';
import { createFolder, getFolderById, getFolderTree } from './folderPrisma.js';
import { getFolderData, getRootFolderData } from './folderPrisma.js';
import prisma from '../database/prismaClient.js';
import { getBreadcrumbs } from '../files/filePrisma.js';
import { getPath } from './folderService.js';

const foldersGet = async (req: Request, res: Response) => {
  const user = req.session.passport?.user;
  const userId = req.user?.id;

  // const folders = userId ? await getFolderTree(userId) : [];
  const folders = userId ? (await getFolderTree(userId)) ?? [] : [];
  const folderId = req.params.folderId;

  if (folders == undefined) {
    console.log;
  }

  if (req.params.folderId) {
    await getFolderById(req.params.folderId);
  }

  const folderData =
    folderId && userId
      ? await getFolderData(folderId)
      : userId
      ? await getRootFolderData(userId)
      : null;

  const breadcrumbs = folderId ? await getBreadcrumbs(folderId) : [];

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
  const folderId = crypto.randomUUID();
  const folderName = req.body.newFolderName;
  const userId = req.user?.id;
  let parentFolderId = req.body.parentFolderId || null;
  let path;

  if (!userId || !req.isAuthenticated()) {
    return res.status(401).send('Not authenticated');
  }

  path = await getPath(userId, parentFolderId, folderId);
  // const path = userId ? getPath(userId, parentFolderId, folderId) : (()=> {throw new Error ("userId is null")})

  if (userId && req.isAuthenticated()) {
    const newFolder = await createFolder(folderId, folderName, userId, parentFolderId, path);
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
