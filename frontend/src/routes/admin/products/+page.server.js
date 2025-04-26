import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const { data: products, error } = await locals.supabase
    .from('products')
    .select('id, name, price, stock_quantity')
    .order('created_at', { ascending: false });

  if (error) throw fail(500, { message: error.message });
  return { products };
}

/* ----------  SvelteKit form actions  ---------- */
export const actions = {
  add: async ({ request, locals }) => {
    const f = await request.formData();
    const { error } = await locals.supabase.from('products').insert({
      name: f.get('name'),
      description: f.get('description'),
      price: parseFloat(f.get('price')),
      stock_quantity: parseInt(f.get('stock'))
    });
    if (error) return fail(400, { message: error.message });
    throw redirect(303, '/admin/products');
  },

  update: async ({ request, locals }) => {
    const f = await request.formData();
    const { error } = await locals.supabase
      .from('products')
      .update({
        name: f.get('name'),
        price: parseFloat(f.get('price')),
        stock_quantity: parseInt(f.get('stock'))
      })
      .eq('id', f.get('id'));
    if (error) return fail(400, { message: error.message });
    throw redirect(303, '/admin/products');
  },

  delete: async ({ request, locals }) => {
    const id = (await request.formData()).get('id');
    const { error } = await locals.supabase.from('products').delete().eq('id', id);
    if (error) return fail(400, { message: error.message });
    throw redirect(303, '/admin/products');
  }
};
