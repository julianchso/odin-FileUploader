const newFolderModal = document.querySelector('#newFolderModal');
const newFolderModalOpen = document.querySelector('#newFolderModalOpenBtn');
const newFolderModalClose = document.querySelector('#newFolderModalCloseBtn');
newFolderModalOpen?.addEventListener('click', () => {
    newFolderModal?.showModal();
});
newFolderModalClose?.addEventListener('click', () => {
    newFolderModal?.close();
});
export {};
