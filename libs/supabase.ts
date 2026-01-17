import { createClient } from '@supabase/supabase-js';
import { Database } from './database';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase };
