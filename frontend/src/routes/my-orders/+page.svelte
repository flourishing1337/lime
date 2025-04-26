<script>
  import { goto } from '$app/navigation';
  export let data;
  let { orders } = data;
</script>

<svelte:head><title>Mina Ordrar</title></svelte:head>

<main style="max-width:800px;margin:2rem auto;padding:0 1rem;">
  <h1>Mina Ordrar</h1>

  {#if orders.length === 0}
    <p>Du har inga tidigare ordrar.</p>
  {:else}
    <ul style="list-style:none;padding:0;">
      {#each orders as o}
        <li
          on:click={() => goto(`/order-confirmed/${o.id}`)}
          style="
            cursor:pointer;
            padding:1rem;
            margin:0.5rem 0;
            border:1px solid #ddd;
            border-radius:4px;
            display:flex;
            justify-content:space-between;
          "
        >
          <div>
            <strong>Order #{o.id.slice(0,8)}</strong><br/>
            {new Date(o.order_date).toLocaleString()}
          </div>
          <div>
            {o.order_items.length} artikel{ o.order_items.length>1?'er':'' } – {o.total_amount.toFixed(2)} SEK
          </div>
          <div><em>{o.status}</em></div>
        </li>
      {/each}
    </ul>
  {/if}
</main>
