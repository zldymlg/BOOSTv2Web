import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ljlidhwudeguxkyqqzup.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqbGlkaHd1ZGVndXhreXFxenVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MjQwOTMsImV4cCI6MjA1NzQwMDA5M30.autvENXRb_3MMSzukn_X03UHdnGXjw8LTTvcZUS01yo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
