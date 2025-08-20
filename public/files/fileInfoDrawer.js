// https://github.com/columk1/file-uploader/blob/9d61314fd1643b03f677871f6e5da58d4be99128/src/javascript/publicFolder.js#L28
const openFileDrawer = document.querySelector('#open-file-drawer');
const drawer = document.querySelector('.drawer-overview');
const openDrawerBtns = document.querySelectorAll('.open-drawer-btn');
openDrawerBtns.forEach((openButton) => {
    openButton.addEventListener('click', () => {
        drawer.open = true;
    });
});
openDrawerBtns.forEach((btn) => {
    return;
    // btn.addEventListener('click', () => {
    //   if (openFileDrawer) {
    //     openFileDrawer.show();
    //   }
    // });
});
export {};
