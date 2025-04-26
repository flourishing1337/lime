// frontend/src/routes/auth/login/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
  const token = cookies.get('auth_token');
  if (token) {
    // Om redan inloggad, gå till antingen redirectTo eller till /admin/notes
    const to = url.searchParams.get('redirectTo') || '/admin/notes';
    throw redirect(302, to);
  }
}
