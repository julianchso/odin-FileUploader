import { NextFunction, Request, Response } from 'express';
import { createNewFile } from './filePrisma.js';

const fileUploadPost = (req: Request, res: Response) => {
  const { originalname, mimetype, size } = req.file;
  console.log(req.file);

  // createNewFile();

  const parentFolderId: string | null = req.body.parentFolderId;

  if (req.file) {
    res.redirect(`/folders/${parentFolderId}`);
  }
};

export { fileUploadPost };
