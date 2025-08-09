import { createFolder, getFolderById, getFolderTree } from './folderHelpers.js';
import prisma from '../database/prismaClient.js';
const foldersGet = async (req, res) => {
    const user = req.session.passport?.user;
    const userId = req.user?.id;
    const folders = await getFolderTree(userId);
    const folderId = req.params.folderId;
    if (req.params.folderId) {
        await getFolderById(req.params.folderId);
    }
    res.render('folders', {
        title: 'Home',
        user: user,
        folders: folders,
        parentFolderId: folderId,
    });
};
const foldersPost = async (req, res, next) => {
    const userId = req.user?.id;
    const folderName = req.body.newFolderName;
    let parentFolderId;
    if (req.body.parentFolderId) {
        parentFolderId = req.body.parentFolderId;
    }
    else {
        parentFolderId = null;
    }
    if (userId && req.isAuthenticated()) {
        createFolder(folderName, userId, parentFolderId);
    }
    next();
    res.redirect(`/folders/${parentFolderId}`);
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
export default { foldersGet, foldersPost, folderDelete };
