import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const role = locals.session?.user?.app_metadata?.role;
  if (role !== 'admin') throw redirect(303, '/auth/login');
  return { session: locals.session };
}
