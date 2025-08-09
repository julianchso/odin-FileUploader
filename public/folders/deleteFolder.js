const deleteFolderModal = document.querySelector('.deleteFolderModal');
const deleteFolderModalOpenBtns = document.querySelectorAll('.deleteFolderModalOpenBtn');
const form = document.querySelector('#deleteFolderForm');
const folderIdInput = document.querySelector('#folderIdInput');
const closeModal = document.querySelector('#deleteFolderModalCloseBtn');
deleteFolderModalOpenBtns?.forEach((button) => {
    const deleteMessage = document.querySelector('#deleteMessage');
    button.addEventListener('click', () => {
        const folderId = button.dataset.id;
        const folderName = button.dataset.name;
        if (form) {
            form.action = `/folders/${folderId}?_method=DELETE`;
            form.value = folderId;
        }
        if (deleteMessage) {
            deleteMessage.textContent = `Are you sure you want to delete "${folderName}"? This action cannot be undone.`;
        }
        if (folderIdInput) {
            folderIdInput.value = folderId;
        }
        deleteFolderModal?.showModal();
    });
});
closeModal?.addEventListener('click', () => {
    deleteFolderModal?.close();
});
export {};
