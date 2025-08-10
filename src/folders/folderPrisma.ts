import prisma from '../database/prismaClient.js';

const createFolder = async (name: string, userId: string, parentFolderId: string | null) => {
  return prisma.metadata.create({
    data: {
      name: name,
      type: 'FOLDER',
      userId: userId,
      parentFolderId: parentFolderId,
    },
  });
};

const getFolderTree = async (userId: string | undefined, parentFolderId?: string | null) => {
  const allFolders = await prisma.metadata.findMany({
    where: {
      userId: userId,
      parentFolderId: parentFolderId,
      type: 'FOLDER',
    },
    select: {
      id: true,
      name: true,
      parentFolder: true,
    },
  });
  return allFolders;
};

const getFolderById = async (id: string) => {
  return await prisma.metadata.findUnique({
    where: {
      id: id,
    },
    include: {
      childFolders: true,
    },
  });
};

const getFolderData = async (folderId: string) => {
  const folder = await getFolderById(folderId);

  if (!folder) {
    throw new Error('folder not found');
  }

  const { childFolders, parentFolderId } = folder;
  return { files: childFolders, parentFolderId };
};

const getRootByUserId = async (userId: string) => {
  return await prisma.metadata.findMany({
    where: {
      userId: userId,
      parentFolderId: null,
    },
  });
};

const getRootFolderData = async (userId: string) => {
  const folders = await getRootByUserId(userId);

  return { files: folders };
};

const getFolderByIdFromName = async (name: string) => {
  const folderName = await prisma.metadata.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });
  return folderName;
};

const getUserFoldersFiles = async (userId: string) => {
  return prisma.metadata.findMany({
    where: { userId: userId },
    include: {
      childFolders: true,
    },
  });
};

export {
  createFolder,
  getFolderTree,
  getFolderById,
  getFolderByIdFromName,
  getUserFoldersFiles,
  getFolderData,
  getRootFolderData,
};
