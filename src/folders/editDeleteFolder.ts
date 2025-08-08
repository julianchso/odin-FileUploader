const deleteFolderModal: HTMLDialogElement | null = document.querySelector('.deleteFolderModal');
const deleteFolderModalOpenBtn: HTMLDialogElement | null = document.querySelector(
  '.deleteFolderModalOpenBtn'
);

deleteFolderModalOpenBtn?.addEventListener('click', () => {
  console.log('delete folder modal');
  deleteFolderModal?.showModal();
});
