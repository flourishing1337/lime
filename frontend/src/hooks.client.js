// hooks.client.js
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';

supabase.auth.onAuthStateChange((event, session) => {
  fetch('/auth/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, session })
  }).then(() => {
    if (event === 'SIGNED_IN') goto('/');
    if (event === 'SIGNED_OUT') goto('/auth/login');
  });
});
