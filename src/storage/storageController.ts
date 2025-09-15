import storageClient from '../database/supabaseClient.js';
import fs from 'fs';
import mime from 'mime-types';

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
  // const fileName = filePath.split('/').pop()!;

  const { data, error } = await storageClient.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, { contentType: mimetype, upsert: false });

  if (error) {
    console.log(error);
    throw new Error('file not uploaded');
  } else {
    console.log('file uploaded successfully', data);
  }
};

const deleteEntitySupa = async (file: string, bucket: string, filePath: string) => {
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }

  return await storageClient.storage.from(bucket).remove([file, filePath]);
};

export { uploadFile, deleteEntitySupa };
