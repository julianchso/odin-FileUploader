import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { configDotenv } from 'dotenv';
import type { Database } from '../../../../types/database.d.ts';

// configDotenv();

let storageClient: SupabaseClient | undefined;

if (import.meta.env.PROJECT_URL && import.meta.env.SUPABASE_KEY) {
  storageClient = createClient<Database>(
    import.meta.env.PROJECT_URL,
    import.meta.env.SUPABASE_ANON_KEY!
  );
  console.log(`storage client: ${storageClient}`);
}

export default storageClient;
