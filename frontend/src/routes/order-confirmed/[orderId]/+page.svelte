<script>
  // data kommer från SSR-load i +page.js
  export let data;
  let { order } = data;
</script>

<svelte:head>
  <title>Orderbekräftelse {order.id}</title>
</svelte:head>

<main>
  <h1>Orderbekräftelse</h1>

  <p>Tack för din order <strong>{order.id}</strong>!</p>
  <p><strong>Status:</strong> {order.status}</p>

  <h2>Orderdetaljer</h2>
  <ul>
    {#each order.order_items as item}
      <li>
        {item.products.name} × {item.quantity} – 
        {(item.unit_price * item.quantity).toFixed(2)} SEK
      </li>
    {/each}
  </ul>

  <p><strong>Totalt:</strong> {order.total_amount.toFixed(2)} SEK</p>
</main>

<style>
  main { max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
  ul { list-style: none; padding: 0; }
</style>
