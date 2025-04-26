// src/routes/envcheck/+server.js
import { json } from '@sveltejs/kit';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export const GET = async () => {
  return json({
    SUPABASE_URL,
    SUPABASE_ANON_KEY_EXISTS: !!SUPABASE_ANON_KEY
  });
};
