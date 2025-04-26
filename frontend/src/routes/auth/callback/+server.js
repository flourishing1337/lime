// src/routes/auth/callback/+server.js
import { authCallback } from '@supabase/auth-helpers-sveltekit';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

/*
 *  • GET  : OAuth ?code=…
 *  • POST : onAuthStateChange från hooks.client.js
 *  • Sätter / raderar sb-access-token
 *    secure:false för localhost
 */
const handler = authCallback({
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_ANON_KEY,
  cookieOptions: { secure: false }
});

export const GET  = handler;
export const POST = handler;
