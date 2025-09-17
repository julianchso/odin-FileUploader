import { NextFunction, Request, Response } from 'express';
import { createNewFile, deleteEntity } from './filePrisma.js';
import { getPath } from '../folders/folderService.js';
import {
  deleteEntitySupa,
  downloadFile,
  uploadFile,
  listItems,
} from '../storage/storageController.js';

const fileUploadPost = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('no file to upload');
  }
  const fileId = crypto.randomUUID();
  const userId = res.locals.currentUser.id;

  const { originalname, mimetype, size, path: localPath } = req.file;
  const parentFolderId: string | null = req.body.parentFolderId || null;
  const path = await getPath(userId, parentFolderId, fileId);

  const bucket = 'odin-FileUploader';
  const storagePath = `${userId}/${fileId}`;

  try {
    await uploadFile(bucket, storagePath, localPath, mimetype);
    await listItems(bucket, userId);
    await createNewFile(fileId, originalname, mimetype, userId, parentFolderId, size, path);
  } catch (err) {
    console.log(err);
  }

  res.redirect(`/folders/${parentFolderId ?? ''}`);
};

const fileDelete = async (req: Request, res: Response) => {
  const fileId = req.body.deleteFileInput;
  const userId = res.locals.currentUser.id;

  const bucket = 'odin-FileUploader';
  const storagePath = `${userId}/${fileId}`;

  await listItems(bucket, userId);

  try {
    await deleteEntity(fileId);
    await deleteEntitySupa(bucket, storagePath);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/folders/');
};

export { fileUploadPost, fileDelete };
