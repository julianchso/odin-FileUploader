const editFolderModal: HTMLDialogElement | null = document.querySelector('#editFolderModal');
const editFolderModalOpenBtns: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll('.editFolderModalOpenBtn');
const form: HTMLFormElement | null = document.querySelector('#editFolderForm');
const folderIdInput: HTMLFormElement | null = document.querySelector('#editFolderIdInput');
const folderNameInput: HTMLFormElement | null = document.querySelector('#editFolderNameInput');
const closeModal: HTMLFormElement | null = document.querySelector('#editFolderModalCloseBtn');

editFolderModalOpenBtns?.forEach((button: HTMLButtonElement) => {
  const editMessage: HTMLElement | null = document.querySelector('#editMessage');

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
