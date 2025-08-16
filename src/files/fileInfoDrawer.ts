// https://github.com/columk1/file-uploader/blob/9d61314fd1643b03f677871f6e5da58d4be99128/src/javascript/publicFolder.js#L28

const openFileDrawer: HTMLElement | null = document.querySelector('#open-file-drawer');
const openDrawerBtns: NodeListOf<HTMLButtonElement> | null =
  document.querySelectorAll('.open-drawer');

openDrawerBtns.forEach((btn) => {
  console.log('open drawer');
  return;
  // btn.addEventListener('click', () => {
  //   if (openFileDrawer) {
  //     openFileDrawer.show();
  //   }
  // });
});
// name, type, size, created, modified
