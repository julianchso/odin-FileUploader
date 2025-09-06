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

const dropdowns: NodeList = document.querySelectorAll('.dropdownBtn');
const dropdownOptions: NodeList = document.querySelectorAll('.dropdown-content');

let dropdownCurrent = 0;
let dropdownAmount = 0;

function openDropdown() {
  if (dropdowns) {
    dropdowns.forEach((dropdownBtn, index) => {
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        (dropdownOptions[index] as HTMLElement).classList.toggle('show');
        dropdownCurrent = index;
        dropdownAmount++;

        // closes other dropdowns if another is open
        if (dropdownAmount > 1) {
          for (let i = 0; i < dropdownOptions.length; i++) {
            const openDropdown = dropdownOptions[i];
            if ((openDropdown as HTMLElement).classList.contains('show') && i !== dropdownCurrent) {
              (openDropdown as HTMLElement).classList.remove('show');
            }
          }
          dropdownAmount = 1;
        }
      });
    });
  }
}

window.addEventListener('click', function (e) {
  // closes dropdown when other areas are clicked
  for (let i = 0; i < dropdownOptions.length; i++) {
    const openDropdown = dropdownOptions[i];
    if ((openDropdown as HTMLElement).classList.contains('show')) {
      (openDropdown as HTMLElement).classList.remove('show');
    }
    dropdownAmount = 0;
  }
});

openDropdown();

const deleteFolderModal: HTMLDialogElement | null = document.querySelector('#deleteFolderModal');
const deleteFolderModalOpenBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(
  '.deleteFolderModalOpenBtn'
);
const formDelete: HTMLFormElement | null = document.querySelector('#deleteFolderForm');
const folderIdInputDelete: HTMLFormElement | null = document.querySelector('#deleteFolderIdInput');
const closeModalDelete: HTMLFormElement | null = document.querySelector(
  '#deleteFolderModalCloseBtn'
);

deleteFolderModalOpenBtns?.forEach((button: HTMLButtonElement) => {
  const deleteMessage: HTMLElement | null = document.querySelector('#deleteMessage');
  button.addEventListener('click', () => {
    const folderId = button.dataset.id;
    const folderName = button.dataset.name;

    if (formDelete) {
      formDelete.action = `/folders/${folderId}?_method=DELETE`;
      formDelete.value = folderId;
    }

    if (deleteMessage) {
      deleteMessage.textContent = `Are you sure you want to delete "${folderName}" and all its content? This action cannot be undone.`;
    }

    if (folderIdInputDelete) {
      folderIdInputDelete.value = folderId;
    }

    deleteFolderModal?.showModal();
  });
});

closeModalDelete?.addEventListener('click', () => {
  deleteFolderModal?.close();
});
