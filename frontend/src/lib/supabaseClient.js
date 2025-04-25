import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://rlctcvthqqjfooercyic.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsY3RjdnRocXFqZm9vZXJjeWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODg1NjksImV4cCI6MjA2MTE2NDU2OX0.MqVyKtJD1HkMyZy3N0EeywhpgSgW4gqnBMGAWxlzsVg'
);
