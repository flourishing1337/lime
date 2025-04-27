import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { jwt } from '$lib/stores/auth';

export async function apiFetch(url, options = {}) {
  const token = get(jwt); // Hämta från store

  if (!token) {
    console.warn('Ingen token hittades, skickar till login...');
    goto('/login');
    return;
  }

  options.headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, options);

  if (res.status === 401) {
    console.warn('Token ogiltig eller utgången, skickar till login...');
    goto('/login');
    return;
  }

  return res;
}
