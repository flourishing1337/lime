// frontend/src/routes/products/[id]/+page.js
import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', params.id)
    .single();

  if (error) {
    throw error;
  }
  return { product };
}
