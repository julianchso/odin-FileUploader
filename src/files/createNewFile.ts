const newFileModal: HTMLDialogElement | null = document.querySelector('#newFileModal');
const newFileModalOpen: HTMLElement | null = document.querySelector('#newFileModalOpenBtn');
const newFileModalClose: HTMLElement | null = document.querySelector('#newFileModalCloseBtn');

newFileModalOpen?.addEventListener('click', () => {
  console.log('newFileModalOpen');
  newFileModal?.showModal();
});

newFileModalClose?.addEventListener('click', () => {
  newFileModal?.close();
});
