import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('auth_token');
  console.log('[JWT-debug] Token från cookie:', token);

  if (token) {
    try {
      const session = jwt.verify(token, env.JWT_SECRET);
      console.log('[JWT-debug] Session efter verifiering:', session);
      event.locals.user = session.user;
    } catch (e) {
      console.error('[JWT-debug] JWT-verifieringsfel:', e.message);
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
