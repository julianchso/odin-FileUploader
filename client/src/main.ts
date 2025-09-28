// main.ts is to bootstrap your browser app, attach event listeners, and import other modules.

import '../../styles/index.css';
import { downloadFile } from './js/download';

document.addEventListener('DOMContentLoaded', async () => {
  const downloadBtn = document.querySelector<HTMLButtonElement>('#downloadFileBtn');

  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const fileId = btn.dataset.fileId!;
    const userId = btn.dataset.userId!;

    const bucket = 'odin-FileUploader';
    const storagePath = `${userId}/${fileId}`;
    const filename = `${fileId}.pdf`;

    await downloadFile(bucket, storagePath, filename);
  });
});
