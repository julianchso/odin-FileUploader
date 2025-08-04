import prisma from '../database/prismaClient.js';
const foldersGet = async (req, res, next) => {
    let user = req.session.passport?.user;
    res.render('folders', {
        title: 'Home',
        user: user,
    });
};
const foldersPost = async (req, res, next) => {
    const userId = req.user?.id;
    const folderName = req.body.newFolderName;
    let parentFolderId;
    if (req.params.id) {
        parentFolderId = req.params.id;
    }
    if (userId && req.isAuthenticated()) {
        createFolder(folderName, userId);
    }
    next();
    res.redirect('/folders/{:id}');
};
const createFolder = async (name, userId) => {
    return prisma.metadata.create({
        data: {
            name: name,
            type: 'FOLDER',
            userId: userId,
        },
    });
};
export { foldersGet, foldersPost };
