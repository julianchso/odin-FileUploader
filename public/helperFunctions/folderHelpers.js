import prisma from '../database/prismaClient.js';
const createFolder = async (name, userId, parentFolderId) => {
    return prisma.metadata.create({
        data: {
            name: name,
            type: 'FOLDER',
            userId: userId,
            parentFolderId: parentFolderId,
        },
    });
};
const getFolderTree = async (userId, parentFolderId) => {
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
export { createFolder, getFolderTree };
