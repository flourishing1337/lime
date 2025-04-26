// frontend/src/routes/checkout/+page.js
import { session } from '$lib/stores/session';
import { get } from 'svelte/store';

export function load() {
  return {
    session: get(session)
  };
}
