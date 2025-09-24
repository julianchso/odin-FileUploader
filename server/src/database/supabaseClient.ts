import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { configDotenv } from 'dotenv';
import type { Database } from '../../../types/database.js';

configDotenv();

const { PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!PROJECT_URL) throw new Error('Missing PROJECT_URL in env');
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in env');

const storageClient: SupabaseClient<Database> = createClient<Database>(
  PROJECT_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

export default storageClient;
