// https://github.com/columk1/file-uploader/blob/9d61314fd1643b03f677871f6e5da58d4be99128/src/javascript/publicFolder.js#L28

const openFileDrawer: HTMLElement | null = document.querySelector('#open-file-drawer');
const drawer = document.querySelector<HTMLElement | (null & { open: boolean })>('.drawer-overview');
const openDrawerBtns = document.querySelectorAll<HTMLElement>('.open-drawer-btn');

openDrawerBtns.forEach((openButton) => {
  openButton.addEventListener('click', () => {
    (drawer as any).open = true;
  });
});

openDrawerBtns.forEach((btn) => {
  return;
  // btn.addEventListener('click', () => {
  //   if (openFileDrawer) {
  //     openFileDrawer.show();
  //   }
  // });
});
