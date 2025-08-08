const deleteFolderModal = document.querySelector('.deleteFolderModal');
const deleteFolderModalOpenBtn = document.querySelector('.deleteFolderModalOpenBtn');
deleteFolderModalOpenBtn?.addEventListener('click', () => {
    console.log('delete folder modal');
    deleteFolderModal?.showModal();
});
export {};
