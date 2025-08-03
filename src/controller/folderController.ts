import prisma from '../database/prismaClient.js';
import { NextFunction, Request, Response } from 'express';

const createFolder = async (name: string, userId: string) => {
  return prisma.metadata.create({
    data: {
      name: name,
      type: 'FOLDER',
      userId: userId,
    },
  });
};

const uploadFile = async () => {};

export { createFolder, uploadFile };
