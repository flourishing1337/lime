// src/routes/checkout/+page.js
import { session } from '$lib/stores/session.js';
import { get } from 'svelte/store';

export function load() {
  return {
    session: get(session)
  };
}
