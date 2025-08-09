const fileUpload = (req, res) => {
    if (req.file) {
        res.redirect('/folders');
    }
};
export { fileUpload };
