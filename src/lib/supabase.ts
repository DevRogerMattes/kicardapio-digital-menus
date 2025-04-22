
import { createClient } from '@supabase/supabase-js';

// Fallback values for development, should be replaced with actual values
const DEFAULT_SUPABASE_URL = 'https://your-project-url.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'your-anon-key';

// Get values from environment variables or use defaults
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Utility function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== DEFAULT_SUPABASE_URL && supabaseAnonKey !== DEFAULT_SUPABASE_ANON_KEY;
};
