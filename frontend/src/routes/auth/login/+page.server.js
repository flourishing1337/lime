import { redirect } from '@sveltejs/kit';

export const prerender = false;

export function load({ cookies, url }) {
  const token = cookies.get('auth_token');

  if (token) {
    // Om användaren redan är inloggad, skicka dem till rätt plats direkt
    const to = url.searchParams.get('redirectTo') || '/admin/notes';
    throw redirect(302, to);
  }

  // Om inte inloggad, visa login-sidan
  return {
    redirectTo: url.searchParams.get('redirectTo') || null
  };
}
