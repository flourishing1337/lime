import { supabase } from '$lib/supabase';

export async function load() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching products:', error);
    return {
      products: []
    };
  }

  return {
    products: products || []
  };
}

