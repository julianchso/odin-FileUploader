import storageClient from '../database/supabaseClient.js';
import fs from 'fs';

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

const downloadFile = async () => {};

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

const listItems = async (bucket: string, userId: string) => {
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }
  const list = await storageClient.storage.from(bucket).list(`${userId}`, { limit: 100 });

  console.log(list);
  return list;
};

export { uploadFile, downloadFile, listItems, deleteEntitySupa };
