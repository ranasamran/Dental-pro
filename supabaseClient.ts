import { createClient } from '@supabase/supabase-js';

// NOTE: In a real environment, these would be process.env.REACT_APP_SUPABASE_URL 
// and process.env.REACT_APP_SUPABASE_ANON_KEY.
// Since we are in a demo environment without specific keys, we will allow the app 
// to fallback to mock data services if these are missing or invalid.

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
