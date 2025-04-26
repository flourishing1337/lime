// src/routes/auth/callback/+server.js
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
  const { event, session } = await request.json();

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    cookies.set('sb-access-token', session.access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: false,       // Viktigt: false på localhost
      maxAge: 60 * 60 * 24 * 7
    });
  }

  if (event === 'SIGNED_OUT') {
    cookies.delete('sb-access-token', { path: '/' });
  }

  return json({ success: true });
};
