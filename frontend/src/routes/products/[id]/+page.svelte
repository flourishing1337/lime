<script>
  import { addToCart } from '$lib/stores/cart';
  export let data;
  let { product } = data;
  let qty = 1;
</script>

<svelte:head><title>{product.name}</title></svelte:head>

<main style="max-width:600px;margin:2rem auto;padding:0 1rem;">
  <a href="/products" style="text-decoration:none;color:#555;">← Tillbaka</a>

  <img src={product.image_url || '/placeholder.png'} alt={product.name}
       style="width:100%;height:auto;object-fit:cover;margin:1rem 0;border-radius:4px;" />

  <h1>{product.name}</h1>
  <p><strong>Pris:</strong> {product.price.toFixed(2)} SEK</p>
  <p>{product.description}</p>

  <label style="display:block;margin:.5rem 0;">
    Antal:
    <input type="number" min="1" bind:value={qty} style="width:4em;margin-left:.5em;" />
  </label>

  <button on:click={() => addToCart(product, +qty)}
          style="background:#10b981;color:white;border:none;padding:.7em 1.2em;border-radius:4px;">
    Lägg {qty} i varukorg
  </button>
</main>
