// src/routes/products/+page.js
import { supabase } from '$lib/supabaseClient';

export async function load({ url }) {
  // Läs av eventuell category‐parameter från URL
  const category = url.searchParams.get('category');

  // Bygg grundfrågan
  let query = supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  // Om en kategori är vald, filtrera
  if (category) {
    query = query.eq('category_id', category);
  }

  // Hämta produkter
  const { data: products, error: prodError } = await query;
  if (prodError) {
    console.error('Error fetching products:', prodError);
    return { products: [], categories: [], selected: category };
  }

  // Hämta alla kategorier för dropdown
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  if (catError) {
    console.error('Error fetching categories:', catError);
  }

  return {
    products,
    categories: categories || [],
    selected: category
  };
}
