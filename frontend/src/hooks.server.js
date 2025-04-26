// src/hooks.server.js
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function handle({ event, resolve }) {
  // Skapa Supabase-instans med env-variabler
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  });

  // Plocka session
  const {
    data: { session }
  } = await event.locals.supabase.auth.getSession();

  event.locals.session = session;
  return resolve(event);
}
