// src/routes/my-orders/+page.server.js
import { redirect, error } from '@sveltejs/kit';

export async function load({ locals }) {
  const session = locals.session;
  if (!session) {
    throw redirect(303, '/auth/login');
  }

  // Hämta ordrar för inloggad användare
  const { data: orders, error: err } = await locals.supabase
    .from('orders')
    .select('id, status, total_amount, order_date, order_items(count)')
    .eq('customer_id', session.user.id)
    .order('order_date', { ascending: false });

  if (err) {
    console.error('Fetch orders error:', err);
    throw error(500, 'Kunde inte hämta dina ordrar');
  }

  return { orders };
}
