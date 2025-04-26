import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('auth_token');
  console.log('[JWT-debug] Token från cookie:', token); // 1. Kolla token

  if (token) {
    try {
      const session = jwt.verify(token, JWT_SECRET);
      console.log('[JWT-debug] Session efter verifiering:', session); // 2. Kolla sessionen
      event.locals.user = session.user;
    } catch (e) {
      console.error('[JWT-debug] JWT-verifieringsfel:', e.message); // 3. Få exakt JWT-fel
      event.locals.user = null;
      event.cookies.delete('auth_token', { path: '/' });
    }
  } else {
    console.warn('[JWT-debug] Ingen JWT-token hittad i cookie.');
    event.locals.user = null;
  }

  const response = await resolve(event);
  return response;
}
