// src/hooks.client.js
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';

/**
 * När användaren loggar in, loggar ut eller får ny token
 * skickar vi event + session till /auth/callback (auth-helpers route),
 * som då sparar/ raderar sb-access-token-cookien.
 */
supabase.auth.onAuthStateChange((event, session) => {
  fetch('/auth/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, session })
  }).then(() => {
    // valfri navigation
    if (event === 'SIGNED_IN') goto('/');
    if (event === 'SIGNED_OUT') goto('/auth/login');
  });
});
