// src/lib/stores/session.js
import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export const session = writable(null);

// Initiera session vid uppstart
supabase.auth.getSession().then(({ data: { session: s } }) => {
  session.set(s);
});

// Lyssna på ändringar (login/logout)
supabase.auth.onAuthStateChange((_event, s) => {
  session.set(s);
});
