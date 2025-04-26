<script>
  import { removeFromCart, updateQuantity } from '$lib/stores/cart';
  export let data;
  let { items, total } = data;
</script>

<h1>Din varukorg</h1>

{#if items.length === 0}
  <p>Varukorgen är tom.</p>
{:else}
  <table>
    <thead>
      <tr><th>Produkt</th><th>Antal</th><th>Pris</th><th></th></tr>
    </thead>
    <tbody>
      {#each items as i}
        <tr>
          <td>{i.name}</td>
          <td>
            <input
              type="number"
              min="1"
              bind:value={i.quantity}
              on:change={() => updateQuantity(i.id, +i.quantity)}
            />
          </td>
          <td>{(i.price * i.quantity).toFixed(2)} SEK</td>
          <td><button on:click={() => removeFromCart(i.id)}>Ta bort</button></td>
        </tr>
      {/each}
    </tbody>
  </table>

  <p><strong>Totalt:</strong> {total.toFixed(2)} SEK</p>
  <a href="/checkout"><button>Gå till kassan</button></a>
{/if}
