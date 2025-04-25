// src/routes/profile/+page.js
import { session } from '$lib/stores/session';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export function load() {
  const s = get(session);
  if (!s) throw redirect(303, '/auth/login');
  return { user: s.user };
}
