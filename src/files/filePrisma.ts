import prisma from '../database/prismaClient.js';

const createNewFile = async (
  name: string,
  mimetype: string,
  userId: string,
  parentFolderId: string | null,
  size: number
) => {
  return await prisma.metadata.create({
    data: {
      name: name,
      type: 'FILE',
      mimeType: mimetype,
      userId: userId,
      parentFolderId: parentFolderId,
      size: size,
    },
  });
};

export { createNewFile };
