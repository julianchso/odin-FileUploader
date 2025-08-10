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
const getFolderById = async (id) => {
    return await prisma.metadata.findUnique({
        where: {
            id: id,
        },
        include: {
            childFolders: true,
        },
    });
};
const getFolderData = async (folderId) => {
    const folder = await getFolderById(folderId);
    if (!folder) {
        throw new Error('folder not found');
    }
    const { childFolders, parentFolderId } = folder;
    return { files: childFolders, parentFolderId };
};
const getRootByUserId = async (userId) => {
    return await prisma.metadata.findMany({
        where: {
            userId: userId,
            parentFolderId: null,
        },
    });
};
const getRootFolderData = async (userId) => {
    const folders = await getRootByUserId(userId);
    return { files: folders };
};
const getFolderByIdFromName = async (name) => {
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
const getUserFoldersFiles = async (userId) => {
    return prisma.metadata.findMany({
        where: { userId: userId },
        include: {
            childFolders: true,
        },
    });
};
export { createFolder, getFolderTree, getFolderById, getFolderByIdFromName, getUserFoldersFiles, getFolderData, getRootFolderData, };
