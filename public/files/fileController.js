const fileUploadPost = (req, res) => {
    // const {originalname: fileName, } = req.file
    console.log(req.file);
    // createNewFile();
    const parentFolderId = req.body.parentFolderId;
    if (req.file) {
        res.redirect(`/folders/${parentFolderId}`);
    }
};
export { fileUploadPost };
