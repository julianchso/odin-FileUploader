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
  const folder = await prisma.metadata.findUnique({
    where: {
      id: id,
    },
    include: {
      childFolders: true,
    },
  });
  return folder;
};

export { createFolder, getFolderTree, getFolderById };
