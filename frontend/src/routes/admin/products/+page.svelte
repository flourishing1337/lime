<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let loading = true;
  let products = [];

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    user = data.session?.user;

    if (!user) {
      // Vänta om session inte är laddad ännu
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          user = session.user;
          checkAdmin();
        } else {
          goto('/auth/login');
        }
      });
    } else {
      checkAdmin();
    }
  });

  async function checkAdmin() {
    if (user.app_metadata?.role !== 'admin') {
      goto('/auth/login');
    } else {
      await loadProducts();
    }
  }

  async function loadProducts() {
    const { data: fetchedProducts } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    products = fetchedProducts || [];
    loading = false;
  }
</script>

<h1>Admin – Produkter</h1>

{#if loading}
  <p>Laddar produkter...</p>
{:else}
  {#if products.length === 0}
    <p>Inga produkter hittades.</p>
  {:else}
    <ul>
      {#each products as product}
        <li>{product.name} – {product.price} SEK</li>
      {/each}
    </ul>
  {/if}
{/if}
