<script>
  import { session } from '$lib/stores/session.js';
  import { supabase } from '$lib/supabaseClient';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  export let data;
  let userSession = data.session;

  // Form-fält för gäst
  let name = '', email = '', address1 = '', city = '', postal = '';

  async function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.length) return alert('Varukorgen är tom');

    const payload = {
      items: cart,
      total_amount: cart.reduce((sum, i) => sum + i.price*i.quantity, 0)
    };

    if (userSession) {
      payload.customer_id = userSession.user.id;
    } else {
      if (!email || !name) return alert('Fyll i namn & e-post');
      payload.guest_email   = email;
      payload.guest_name    = name;
      payload.guest_address = { address1, city, postal };
    }

    const { data: order, error } = await supabase
      .from('orders')
      .insert(payload)
      .single();

    if (error) return console.error(error);
    localStorage.removeItem('cart');
    goto(`/order-confirmed/${order.id}`);
  }
</script>

{#if userSession}
  <p>Hej {userSession.user.email}, slutför ditt köp.</p>
{:else}
  <h2>Gästköp</h2>
  <label>Fullständigt namn<input bind:value={name} /></label>
  <label>E-post<input type="email" bind:value={email} /></label>
  <label>Adress<input bind:value={address1} /></label>
  <label>Stad<input bind:value={city} /></label>
  <label>Postnr<input bind:value={postal} /></label>
  <button on:click={placeOrder}>Slutför som gäst</button>
{/if}

<button on:click={placeOrder}>Slutför som inloggad</button>
