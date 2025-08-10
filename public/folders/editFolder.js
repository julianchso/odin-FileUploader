const editFolderModal = document.querySelector('#editFolderModal');
const editFolderModalOpenBtns = document.querySelectorAll('.editFolderModalOpenBtn');
const form = document.querySelector('#editFolderForm');
const folderIdInput = document.querySelector('#editFolderIdInput');
const folderNameInput = document.querySelector('#editFolderNameInput');
const closeModal = document.querySelector('#editFolderModalCloseBtn');
editFolderModalOpenBtns?.forEach((button) => {
    const editMessage = document.querySelector('#editMessage');
    button.addEventListener('click', () => {
        const folderId = button.dataset.id;
        const folderName = button.dataset.name;
        if (form) {
            form.action = `/folders/${folderId}?_method=PUT`;
            form.value = folderId;
        }
        if (editMessage) {
            editMessage.textContent = 'Rename';
        }
        if (folderIdInput && folderNameInput) {
            folderIdInput.value = folderId;
            folderNameInput.value = folderName;
        }
        editFolderModal?.showModal();
    });
});
closeModal?.addEventListener('click', () => {
    editFolderModal?.close();
});
export {};
