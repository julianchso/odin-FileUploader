import prisma from '../database/prismaClient.js';
const createFolder = async (name, userId, parentFolderId) => {
    return await prisma.metadata.create({
        data: {
            name: name,
            type: 'FOLDER',
            userId: userId,
            parentFolderId: parentFolderId,
        },
    });
};
const getFolderTree = async (userId, parentFolderId) => {
    return await prisma.metadata.findMany({
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
// TODO: This function is running twice and folder throwing null the second time?
const getFolderData = async (folderId) => {
    const folder = await getFolderById(folderId);
    if (!folder) {
        throw new Error('folder not found');
    }
    const { childFolders, parentFolderId } = folder;
    return { files: childFolders, parentFolderId };
};
const getFolderByIdFromName = async (name) => {
    return await prisma.metadata.findFirst({
        where: {
            name: name,
        },
        select: {
            id: true,
        },
    });
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
