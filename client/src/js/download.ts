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

export { downloadFile };
