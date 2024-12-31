import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('SUPABASE_URL or SUPABASE_KEY is not set');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey); 