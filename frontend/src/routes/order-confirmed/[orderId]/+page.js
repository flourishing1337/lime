// frontend/src/routes/order-confirmed/[orderId]/+page.js
import { supabase } from '$lib/supabaseClient';

export const prerender = false;


/** 
 * Denna load körs server‐side (SSR) och hämtar order + items i en go.
 * Om något går fel så kastas ett fel och SvelteKit visar en 500.
 */
export async function load({ params }) {
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      id,
      total_amount,
      status,
      order_items (
        quantity,
        unit_price,
        products ( name )
      )
    `)
    .eq('id', params.orderId)
    .single();

  if (error) {
    throw new Error(`Kunde inte hämta order: ${error.message}`);
  }

  return { order };
}
