import formatDate from '../utils/formatDateUtils.js';
const drawer = document.querySelector('.drawer-overview');
const openDrawerBtns = document.querySelectorAll('.open-drawer-btn');
const drawerContent = document.querySelector('.drawer-content');
openDrawerBtns.forEach((openButton) => {
    openButton.addEventListener('click', (e) => {
        drawer.open = true;
        const fileInfoClass = e.currentTarget.nextElementSibling;
        console.log(fileInfoClass);
        let fileInfo = fileInfoClass?.dataset.fileInfo;
        if (fileInfo) {
            const parsed = JSON.parse(fileInfo);
            displayFileInfo(parsed);
            console.log(parsed);
        }
    });
});
const displayFileInfo = (info) => {
    const name = document.createElement('div');
    const nameLabel = document.createElement('span');
    const nameValue = document.createElement('span');
    nameLabel.textContent = 'Name: ';
    nameValue.textContent = info.name;
    name.append(nameLabel, nameValue);
    const size = document.createElement('div');
    const sizeLabel = document.createElement('span');
    const sizeValue = document.createElement('span');
    sizeLabel.textContent = 'Size: ';
    sizeValue.textContent = info.size.toString();
    size.append(sizeLabel, sizeValue);
    const type = document.createElement('div');
    const typeLabel = document.createElement('span');
    const typeValue = document.createElement('span');
    typeLabel.textContent = 'File Type: ';
    typeValue.textContent = info.type;
    type.append(typeLabel, typeValue);
    const createdAtTime = formatDate(info.createdAt);
    const createdAt = document.createElement('div');
    const createdAtLabel = document.createElement('span');
    const createdAtValue = document.createElement('span');
    createdAtLabel.textContent = 'Created at: ';
    createdAtValue.textContent = createdAtTime.toString();
    createdAt.append(createdAtLabel, createdAtValue);
    const modifiedAtTime = formatDate(info.modifiedAt);
    const modifiedAt = document.createElement('div');
    const modifiedAtLabel = document.createElement('span');
    const modifiedAtValue = document.createElement('span');
    modifiedAtLabel.textContent = 'Modified at: ';
    modifiedAtValue.textContent = modifiedAtTime.toString();
    modifiedAt.append(modifiedAtLabel, modifiedAtValue);
    if (drawerContent && drawer) {
        drawerContent.innerHTML = '';
        drawerContent.append(name);
        drawerContent.append(size);
        drawerContent.append(type);
        drawerContent.append(createdAt);
        drawerContent.append(modifiedAt);
    }
};
