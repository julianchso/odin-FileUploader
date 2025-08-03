const newFolderModal: HTMLDialogElement | null = document.querySelector('#newFolderModal');
const newFolderModalOpen: HTMLElement | null = document.querySelector('#newFolderModalOpenBtn');
const newFolderModalClose: HTMLElement | null = document.querySelector('#newFolderModalCloseBtn');

newFolderModalOpen?.addEventListener('click', () => {
  newFolderModal?.showModal();
});

newFolderModalClose?.addEventListener('click', () => {
  newFolderModal?.close();
});
