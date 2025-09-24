import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';
import type { Database } from '../../../../types/database.d.ts';

configDotenv();

let storageClient: SupabaseClient | undefined;

if (process.env.PROJECT_URL && process.env.SUPABASE_KEY) {
  storageClient = createClient<Database>(process.env.PROJECT_URL, process.env.SUPABASE_ANON_KEY!);
  console.log(`storage client: ${storageClient}`);
}

export default storageClient;
