import { createFolder } from '../helperFunctions/folderHelpers.js';
import { getFolderTree } from '../helperFunctions/folderHelpers.js';
const foldersGet = async (req, res, next) => {
    const user = req.session.passport?.user;
    const userId = req.user?.id;
    const folders = await getFolderTree(userId);
    let folderNames = [];
    folders.forEach((folder) => {
        folderNames.push(folder.name);
    });
    const folderId = req.params.folderId;
    res.render('folders', {
        title: 'Home',
        user: user,
        folders: folders,
        folderNames: folderNames,
        parentFolderId: folderId,
    });
};
const foldersPost = async (req, res, next) => {
    const userId = req.user?.id;
    const folderName = req.body.newFolderName;
    let parentFolderId;
    console.log(`params id foldersPost: ${req.params.folderId}`);
    console.log(`input form foldersPost: ${req.body.parentFolderId}`);
    if (req.params.folderId) {
        parentFolderId = req.params.folderId;
    }
    else {
        parentFolderId = null;
    }
    if (userId && req.isAuthenticated()) {
        createFolder(folderName, userId, parentFolderId);
    }
    next();
    res.redirect('/folders');
};
export { foldersGet, foldersPost };
