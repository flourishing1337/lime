import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';

export async function POST({ request, cookies }) {
  const { session } = await request.json();

  if (!session) {
    return json({ error: 'Invalid session' }, { status: 400 });
  }

  const payload = { user: session.user };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  cookies.set('auth_token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true i produktion
    maxAge: 60 * 60 * 24 * 7
  });

  return json({ success: true });
}
