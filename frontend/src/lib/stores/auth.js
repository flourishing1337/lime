import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

// JWT-token store
export const jwt = writable(localStorage.getItem('jwt') || '');

// Uppdatera localStorage när JWT ändras
jwt.subscribe(value => {
  if (value) {
    localStorage.setItem('jwt', value);
  } else {
    localStorage.removeItem('jwt');
  }
});

/**
 * Loggar ut användaren:
 * - Tömmer JWT-token
 * - Redirectar till login-sidan
 */
export function logout() {
  jwt.set('');        // Nolla token
  goto('/login');     // Skicka till login
}
