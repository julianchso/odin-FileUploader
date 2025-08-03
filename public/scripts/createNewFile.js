const newFileModal = document.querySelector('#newFileModal');
const newFileModalOpen = document.querySelector('#newFileModalOpenBtn');
const newFileModalClose = document.querySelector('#newFileModalCloseBtn');
newFileModalOpen?.addEventListener('click', () => {
    console.log('newFileModalOpen');
    newFileModal?.showModal();
});
newFileModalClose?.addEventListener('click', () => {
    newFileModal?.close();
});
export {};
