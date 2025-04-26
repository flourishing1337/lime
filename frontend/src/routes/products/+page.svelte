<script>
  import { addToCart } from '$lib/stores/cart';
  export let data;
  let { products, categories, selected } = data;

  function filter() {
    const url = new URL(location.href);
    selected ? url.searchParams.set('category', selected) : url.searchParams.delete('category');
    location.href = url.toString();
  }
</script>

<svelte:head><title>Produkter</title></svelte:head>

<main style="max-width:800px;margin:2rem auto;padding:0 1rem;">
  <h1>Produkter</h1>

  <!-- Filter -->
  <div style="margin-bottom:1rem;">
    <label for="category-filter">Kategori:</label>
    <select id="category-filter" bind:value={selected} on:change={filter}>
      <option value=''>Alla kategorier</option>
      {#each categories as c}
        <option value={c.id}>{c.name}</option>
      {/each}
    </select>
  </div>

  <!-- Lista -->
  {#if products.length === 0}
    <p>Inga produkter hittades.</p>
  {:else}
    <ul style="list-style:none;padding:0;">
      {#each products as p}
        <li style="margin:1rem 0;">
          <a
            href={`/products/${p.id}`}
            style="display:flex;text-decoration:none;color:inherit;border:1px solid #ddd;border-radius:4px;overflow:hidden;"
          >
            <img src={p.image_url || '/placeholder.png'} alt={p.name}
                 style="width:120px;height:120px;object-fit:cover;flex-shrink:0;" />
            <div style="padding:1rem;flex:1;">
              <h2 style="margin:0 0 .5rem;">{p.name}</h2>
              <p style="margin:.5rem 0;">{p.description}</p>
              <p style="margin:0;"><strong>Pris:</strong> {p.price.toFixed(2)} SEK</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</main>
