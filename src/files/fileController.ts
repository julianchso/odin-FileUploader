import { Request, Response } from 'express';
import { createNewFile } from './filePrisma.js';

const fileUploadPost = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('no file to upload');
  }

  const userId = res.locals.currentUser.id;

  const { originalname, mimetype, size } = req.file;
  const parentFolderId: string | null = req.body.parentFolderId || null;

  // create row in prisma database
  createNewFile(originalname, mimetype, userId, parentFolderId, size);

  res.redirect(`/folders/${parentFolderId ?? ''}`);
};

export { fileUploadPost };
