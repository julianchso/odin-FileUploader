import { Request, Response } from 'express';
import { createNewFile } from './filePrisma.js';
import { getPath } from '../folders/folderService.js';
import { uploadFile } from '../storage/storageController.js';

const fileUploadPost = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('no file to upload');
  }
  const fileId = crypto.randomUUID();
  const userId = res.locals.currentUser.id;

  const { originalname, mimetype, size } = req.file;
  const parentFolderId: string | null = req.body.parentFolderId || null;
  const path = await getPath(userId, parentFolderId, fileId);

  const bucketName = 'odin-FileUploader';
  const filePath = 'Uploads';

  try {
    uploadFile(originalname, bucketName, filePath);
    createNewFile(fileId, originalname, mimetype, userId, parentFolderId, size, path);
  } catch (err) {
    console.log(err);
  }

  res.redirect(`/folders/${parentFolderId ?? ''}`);
};

export { fileUploadPost };
