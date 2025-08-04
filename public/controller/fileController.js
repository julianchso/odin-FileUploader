const fileUpload = (req, res) => {
    if (req.file) {
        res.redirect('/');
    }
};
export { fileUpload };
