import prisma from '../database/prismaClient.js';

const createFolder = async (
  id: string,
  name: string,
  userId: string,
  parentFolderId: string | null,
  path: string
) => {
  return await prisma.metadata.create({
    data: {
      id: id,
      name: name,
      type: 'FOLDER',
      userId: userId,
      parentFolderId: parentFolderId,
      path: path,
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

const getFolderData = async (folderId: string) => {
  const folder = await getFolderById(folderId);

  if (!folder) {
    throw new Error('folder not found');
  }

  const { childFolders, parentFolderId } = folder;
  return { files: childFolders, parentFolderId };
};

const getFolderByIdFromName = async (name: string) => {
  return await prisma.metadata.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });
};

const getUserFoldersFiles = async (userId: string) => {
  return await prisma.metadata.findMany({
    where: { userId: userId },
    include: {
      childFolders: true,
    },
  });
};

const getPath = async (parentId: string) => {
  const entity = await prisma.metadata.findFirst({
    where: { id: parentId },
    select: { path: true },
  });
  if (entity) {
    return entity.path;
  }
};

const getAllPaths = async (userId: string) => {
  return await prisma.metadata.findMany({
    where: { userId: userId },
    select: { name: true, path: true },
  });
};

const getAllFolderNamesIds = async (userId: string) => {
  return await prisma.metadata.findMany({
    where: { userId: userId },
    select: { id: true, name: true },
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
  getPath,
  getAllPaths,
  getAllFolderNamesIds,
};
