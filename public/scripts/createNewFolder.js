const newFolderModalOpen = document.querySelector('#newFolderModalOpenBtn');
const newFolderModalClose = document.querySelector('#newFolderModalCloseBtn');
newFolderModalOpen?.addEventListener('click', () => {
    if (newFolderModalOpen == null)
        throw new Error("couldn't find element with id 'newFolderModalOpen'");
    console.log('open modal');
    // newFolderModal.showModal();
});
newFolderModalClose?.addEventListener('click', () => {
    console.log('close modal');
    // newFolderModal.showModal();
});
export {};
