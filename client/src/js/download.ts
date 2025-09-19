import storageClient from './lib/supabase.js';

const downloadFile = async (bucket: string, storagePath: string, filename: string) => {
  const { data, error } = await storageClient!.storage.from(bucket).download(storagePath);

  if (error) {
    console.error('Download error:', error.message);
    alert('Failed to download file.');
    return;
  }

  // Convert to a blob URL and trigger download
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// const downloadFile = async (bucket: string, storagePath: string, filename: string) => {
//   console.log('supabase download');
//   if (!storageClient) {
//     throw new Error('Supabase client not initialized');
//   }
//   const { data, error } = await storageClient.storage.from(bucket).download(storagePath);

//   if (error) {
//     throw error;
//   }

//   const url = URL.createObjectURL(data);

//   // Create temporary <a> link
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename; // suggested filename
//   document.body.appendChild(a);
//   a.click();
//   a.remove();

//   URL.revokeObjectURL(url);

//   // const buffer = Buffer.from(await data.arrayBuffer());
//   // await fsp.writeFile(downloadPath, buffer);
//   // console.log(`File downloaded to ${downloadPath}`);
// };

// document.querySelector('#downloadFileBtn')?.addEventListener('click', async (e) => {
//   const btn = e.currentTarget as HTMLElement;
//   const fileId = btn.dataset.fileId;
//   const userId = btn.dataset.userId;
//   const bucket = 'odin-FileUploader';
//   const storagePath = `${userId}/${fileId}`;
//   const filename = `${fileId}`;
//   await downloadFile(bucket, storagePath, filename);
// });

const downloadBtn = document.querySelector<HTMLButtonElement>('#downloadFileBtn');
console.log(downloadBtn);

downloadBtn?.addEventListener('click', async (e) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const fileId = btn.dataset.fileId!;
  const userId = btn.dataset.userId!;

  const bucket = 'odin-FileUploader';
  const storagePath = `${userId}/${fileId}`;
  const filename = `${fileId}.pdf`; // Adjust extension as needed

  await downloadFile(bucket, storagePath, filename);
});
