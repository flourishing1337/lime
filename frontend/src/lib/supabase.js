import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Replace these with your actual Supabase URL and anon key
// You can find these in your Supabase dashboard under Settings > API
export const supabase = createClient(
  // Replace with your Supabase project URL
  'https://rlctcvthqqjfooercyic.supabase.co',
  // Replace with your actual anon key (the current one is a placeholder)
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsY3RjdnRocXFqZm9vZXJjeWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODg1NjksImV4cCI6MjA2MTE2NDU2OX0.MqVyKtJD1HkMyZy3N0EeywhpgSgW4gqnBMGAWxlzsVg'
)

