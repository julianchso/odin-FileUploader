const deleteFolderModal = document.querySelector('.deleteFolderModal');
const deleteFolderModalOpenBtns = document.querySelectorAll('.deleteFolderModalOpenBtn');
deleteFolderModalOpenBtns?.forEach((button) => {
    const deleteMessage = document.querySelector('#deleteMessage');
    button.addEventListener('click', () => {
        const folderId = button.dataset.id;
        const folderName = button.dataset.name;
        if (deleteMessage) {
            deleteMessage.textContent = `Are you sure you want to delete ${folderName}? You cannot undo this action.`;
        }
        deleteFolderModal?.showModal();
    });
});
export {};
