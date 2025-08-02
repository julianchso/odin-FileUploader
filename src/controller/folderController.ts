import prisma from '../database/prismaClient';

const createFolder = async (name: string, userId: string) => {
  return prisma.metadata.create({
    data: {
      name: name,
      type: 'FOLDER',
      userId: userId,
    },
  });
};

export default { createFolder };
