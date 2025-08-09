const deleteFolderModal: HTMLDialogElement | null = document.querySelector('.deleteFolderModal');
const deleteFolderModalOpenBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(
  '.deleteFolderModalOpenBtn'
);
const form: HTMLFormElement | null = document.querySelector('#deleteFolderForm');
const folderIdInput: HTMLFormElement | null = document.querySelector('#folderIdInput');
const closeModal: HTMLFormElement | null = document.querySelector('#deleteFolderModalCloseBtn');

deleteFolderModalOpenBtns?.forEach((button: HTMLButtonElement) => {
  const deleteMessage: HTMLElement | null = document.querySelector('#deleteMessage');
  button.addEventListener('click', () => {
    const folderId = button.dataset.id;
    const folderName = button.dataset.name;

    if (form) {
      form.action = `/folders/${folderId}?_method=DELETE`;
      form.value = folderId;
    }

    if (deleteMessage) {
      deleteMessage.textContent = `Are you sure you want to delete "${folderName}" and all its content? This action cannot be undone.`;
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
