import { NextFunction, Request, Response } from 'express';

const fileUpload = (req: Request, res: Response) => {
  if (req.file) {
    res.redirect('/folders');
  }
};

export { fileUpload };
