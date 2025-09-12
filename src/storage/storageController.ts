import storageClient from '../database/supabaseClient.js';

const uploadFile = async (file: string, bucketName: string, filePath: string) => {
  if (!storageClient) {
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await storageClient.storage
    .from(bucketName)
    .upload(filePath, file, { upsert: false });

  if (error) {
    console.log(error);
    throw new Error('file not uploaded');
  } else {
    console.log('file uploaded successfully', data);
  }
};

export { uploadFile };
