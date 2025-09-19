import storageClient from '../database/supabaseClient.js';
import fs from 'fs';
import { promises as fsp } from 'fs';

const uploadFile = async (
  bucket: string,
  storagePath: string,
  localPath: string,
  mimetype: string
) => {
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }

  const fileBuffer = fs.readFileSync(localPath);

  const { data, error } = await storageClient.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, { contentType: mimetype, upsert: false });

  if (error) {
    console.error('Supabase upload error:', error);
    throw error;
  } else {
    fs.unlinkSync(localPath);
    console.log('file uploaded successfully', data);
  }
};

const downloadFile = async (bucket: string, storagePath: string, filename: string) => {
  console.log('supabase download');
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }
  const { data, error } = await storageClient.storage.from(bucket).download(storagePath);

  if (error) {
    throw error;
  }

  const url = URL.createObjectURL(data);

  // Create temporary <a> link
  const a = document.createElement('a');
  a.href = url;
  a.download = filename; // suggested filename
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);

  // const buffer = Buffer.from(await data.arrayBuffer());
  // await fsp.writeFile(downloadPath, buffer);
  // console.log(`File downloaded to ${downloadPath}`);
};

const deleteEntitySupa = async (bucket: string, storagePath: string) => {
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await storageClient.storage.from(bucket).remove([storagePath]);
  console.log(storagePath);

  if (error) {
    console.log(error);
    throw new Error('file not deleted)');
  } else {
    console.log('file deleted successfully', data);
    return data;
  }
};

export { uploadFile, downloadFile, deleteEntitySupa };
