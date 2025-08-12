import { createFolder, getFolderById, getFolderTree } from './folderPrisma.js';
import { getFolderByIdFromName, getFolderData, getRootFolderData } from './folderPrisma.js';
import prisma from '../database/prismaClient.js';
const foldersGet = async (req, res) => {
    const user = req.session.passport?.user;
    const userId = req.user?.id;
    const folders = await getFolderTree(userId);
    const folderId = req.params.folderId;
    let folderData;
    if (req.params.folderId) {
        await getFolderById(req.params.folderId);
    }
    if (userId && folderId) {
        folderData = await getFolderData(folderId);
    }
    else if (userId) {
        folderData = await getRootFolderData(userId);
    }
    res.render('folders', {
        title: 'Home',
        user: user,
        folders: folders,
        parentFolderId: folderId,
        folderData: folderData,
    });
};
const foldersPost = async (req, res, next) => {
    const userId = req.user?.id;
    const folderName = req.body.newFolderName;
    // const folderId = req.body.newFolderId;
    let parentFolderId;
    // TODO: no new folder with the same name in the same folder
    // Check to see that name and parentId are not the same
    if (req.body.parentFolderId) {
        parentFolderId = req.body.parentFolderId;
    }
    if (userId && req.isAuthenticated()) {
        await createFolder(folderName, userId, parentFolderId);
    }
    // TODO: folderId is returning null? Is folderName null?
    const folderIdObj = await getFolderByIdFromName(folderName);
    let folderId;
    if (folderIdObj) {
        folderId = folderIdObj.id;
    }
    console.log(folderId);
    res.redirect(`/folders/${folderId}`);
    next();
};
const folderEdit = async (req, res) => {
    const folderId = req.body.folderId;
    const folderName = req.body.folderName;
    const timeElapsed = Date.now();
    const now = new Date(timeElapsed);
    await prisma.metadata.update({
        where: {
            id: folderId,
        },
        data: {
            name: folderName,
            ModifiedAt: now,
        },
    });
    res.redirect('/folders');
};
const folderDelete = async (req, res) => {
    const folderId = req.body.folderId;
    await prisma.metadata.delete({
        where: {
            id: folderId,
        },
    });
    res.redirect('/folders');
};
export default { foldersGet, foldersPost, folderEdit, folderDelete };
