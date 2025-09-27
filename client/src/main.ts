// main.ts is to bootstrap your browser app, attach event listeners, and import other modules.

import { downloadFile } from './js/download';

const loadFiles = async () => {
  try {
    const res = await fetch('/api'); // <-- goes through Vite proxy
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    console.log('Files:', data);
  } catch (err) {
    console.error(err);
  }
};

loadFiles();

document.addEventListener('DOMContentLoaded', async () => {
  const downloadBtn = document.querySelector<HTMLButtonElement>('#downloadFileBtn');

  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const fileId = btn.dataset.fileId!;
    const userId = btn.dataset.userId!;

    const bucket = 'odin-FileUploader';
    const storagePath = `${userId}/${fileId}`;
    const filename = `${fileId}.pdf`; // Adjust extension as needed

    await downloadFile(bucket, storagePath, filename);
  });
});
