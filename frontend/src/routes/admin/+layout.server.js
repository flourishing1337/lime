// frontend/src/routes/admin/+layout.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
  const token = cookies.get('auth_token');
  if (!token) {
    // Skicka vidare till login, med tillbaka-URL
    const next = encodeURIComponent(url.pathname);
    throw redirect(302, `/auth/login?redirectTo=${next}`);
  }
}
