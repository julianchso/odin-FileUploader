const newFolderModalOpen: HTMLElement | null = document.querySelector('#newFolderModalOpenBtn');
const newFolderModalClose: HTMLElement | null = document.querySelector('#newFolderModalCloseBtn');

newFolderModalOpen?.addEventListener('click', () => {
  if (newFolderModalOpen == null)
    throw new Error("couldn't find element with id 'newFolderModalOpen'");
  console.log('open modal');
  // newFolderModal.showModal();
});

newFolderModalClose?.addEventListener('click', () => {
  console.log('close modal');
  // newFolderModal.showModal();
});
