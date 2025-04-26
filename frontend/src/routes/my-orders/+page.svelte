<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let user = null;
  let loading = true;
  let orders = [];

  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    user = data.session?.user;

    if (!user) {
      // Vänta på authStateChange om session ännu inte är laddad
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          user = session.user;
          loadOrders();
        } else {
          goto('/auth/login');
        }
      });
    } else {
      loadOrders();
    }
  });

  async function loadOrders() {
    const { data: fetchedOrders } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', user.id);

    orders = fetchedOrders || [];
    loading = false;
  }
</script>

<h1>Mina Ordrar</h1>

{#if loading}
  <p>Laddar ordrar...</p>
{:else}
  {#if orders.length === 0}
    <p>Inga ordrar hittades.</p>
  {:else}
    <ul>
      {#each orders as order}
        <li>Order #{order.id} – Totalt: {order.total_amount} SEK</li>
      {/each}
    </ul>
  {/if}
{/if}
