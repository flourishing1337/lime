<script>
  import { cart, clearCart } from '$lib/stores/cart';
  import { session } from '$lib/stores/session';
  import { supabase } from '$lib/supabaseClient';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;
  let userSession = data.session;

  // Cart items & total
  let items = [];
  onMount(() => {
    items = get(cart);
  });
  $: total = items.reduce((sum,i) => sum + i.price * i.quantity, 0);

  // Gäst-form
  let name = '', email = '', address1 = '', city = '', postal = '';
  let loading = false, error = '';

  async function placeOrder() {
    error = '';
    if (!items.length) {
      error = 'Varukorgen är tom';
      return;
    }
    // Guest validation
    if (!userSession && (!name||!email||!address1||!city||!postal)) {
      error = 'Fyll i alla fält';
      return;
    }

    loading = true;
    // 1) Skapa order
    const payload = {
      total_amount: total,
      status: 'pending'
    };
    if (userSession) {
      payload.customer_id = userSession.user.id;
    } else {
      payload.guest_name    = name;
      payload.guest_email   = email;
      payload.guest_address = { address1, city, postal };
    }

    const { data: orders, error: oErr } = await supabase
      .from('orders')
      .insert(payload)
      .select('id')
      .single();

    if (oErr) {
      error = oErr.message;
      loading = false;
      return;
    }

    const orderId = orders.id;

    // 2) Skapa order_items
    const inserts = items.map(i => ({
      order_id:   orderId,
      product_id: i.id,
      quantity:   i.quantity,
      unit_price: i.price
    }));
    const { error: iErr } = await supabase
      .from('order_items')
      .insert(inserts);

    if (iErr) {
      error = iErr.message;
      loading = false;
      return;
    }

    // 3) Klart! Rensa cart & goto
    clearCart();
    goto(`/order-confirmed/${orderId}`);
  }
</script>

<main>
  <h1>Checkout</h1>

  {#if error}
    <p style="color:red">{error}</p>
  {/if}

  <h2>Din varukorg</h2>
  <ul>
    {#each items as i}
      <li>{i.name} × {i.quantity} – {(i.price*i.quantity).toFixed(2)} SEK</li>
    {/each}
  </ul>
  <p><strong>Totalt:</strong> {total.toFixed(2)} SEK</p>

  {#if userSession}
    <p>Du är inloggad som <strong>{userSession.user.email}</strong>.</p>
  {:else}
    <h2>Gästköp</h2>
    <label>Fullständigt namn <input bind:value={name} /></label>
    <label>E-post <input type="email" bind:value={email} /></label>
    <label>Adress <input bind:value={address1} /></label>
    <label>Stad <input bind:value={city} /></label>
    <label>Postnr <input bind:value={postal} /></label>
  {/if}

  <button on:click={placeOrder} disabled={loading}>
    {#if loading}Skickar order…{:else}Slutför köp{/if}
  </button>
</main>

<style>
  main { max-width:600px; margin:2rem auto; padding:0 1rem; }
  label { display:block; margin:0.5rem 0; }
  input { width:100%; padding:0.4rem; }
  button { margin-top:1rem; padding:0.7rem 1.2rem; background:#10b981; color:white; border:none; border-radius:4px; }
  button:disabled { opacity:0.6; }
</style>
