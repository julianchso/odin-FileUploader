import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';
import { Database } from '../database.types.js';

configDotenv();

let storageClient: SupabaseClient | undefined;

if (process.env.PROJECT_URL && process.env.SUPABASE_KEY) {
  storageClient = createClient<Database>(process.env.PROJECT_URL, process.env.SUPABASE_KEY);
  console.log(`storage client: ${storageClient}`);
}

export default storageClient;
