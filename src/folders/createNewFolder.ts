const openModalButtons = document.querySelectorAll<HTMLButtonElement>('[data-open-modal]');
const closeModalButtons = document.querySelectorAll<HTMLButtonElement>('[data-close-modal]');

openModalButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.openModal;
    const modal = document.getElementById(modalId!) as HTMLDialogElement | null;
    modal?.showModal();
  });
});

closeModalButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.closeModal;
    const modal = document.getElementById(modalId!) as HTMLDialogElement | null;
    modal?.close();
  });
});
