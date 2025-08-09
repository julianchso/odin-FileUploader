const deleteFolderModal: HTMLDialogElement | null = document.querySelector('.deleteFolderModal');
const deleteFolderModalOpenBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(
  '.deleteFolderModalOpenBtn'
);
const form: HTMLFormElement | null = document.querySelector('#deleteFolderForm');

deleteFolderModalOpenBtns?.forEach((button: HTMLButtonElement) => {
  const deleteMessage: HTMLElement | null = document.querySelector('#deleteMessage');
  button.addEventListener('click', () => {
    const folderId = button.dataset.id;
    const folderName = button.dataset.name;
    if (form) {
      form.action = `/folder/${folderId}?_method=DELETE`;
      form.folderId.value = folderId;
    }

    if (deleteMessage) {
      deleteMessage.textContent = `Are you sure you want to delete ${folderName}? You cannot undo this action.`;
    }

    deleteFolderModal?.showModal();
  });
});
