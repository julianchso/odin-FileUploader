import { createNewFile } from './filePrisma.js';
const fileUploadPost = (req, res) => {
    if (!req.file) {
        return res.status(400).send('no file to upload');
    }
    const userId = res.locals.currentUser.id;
    const { originalname, mimetype, size } = req.file;
    const parentFolderId = req.body.parentFolderId || null;
    // create row in prisma database
    createNewFile(originalname, mimetype, userId, parentFolderId, size);
    res.redirect(`/folders/${parentFolderId ?? ''}`);
};
export { fileUploadPost };
