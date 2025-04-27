import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url }) {
  const token = cookies.get('auth_token');

  if (!token) {
    // Ingen token -> redirect till login
    const redirectTo = url.pathname;
    throw redirect(302, `/auth/login?redirectTo=${redirectTo}`);
  }

  // Om token finns: släpp in användaren
  return {};
}
