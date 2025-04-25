<main>
  <div class="container">
    <header>
      <a href="/" class="back-link">← Back to Home</a>
      <h1>Our Products</h1>
    </header>

    <div class="products-container">
      {#if products.length === 0}
        <p class="no-products">No products found.</p>
      {:else}
        <ul class="products-list">
          {#each products as p}
            <li class="product-item">
              <h2>{p.name}</h2>
              <p class="description">{p.description}</p>
              <div class="product-details">
                <span class="price">{p.price} SEK</span>
                <span class="stock">In stock: {p.stock_quantity}</span>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    background-color: #f9fafb;
    padding: 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-block;
    color: #4b5563;
    text-decoration: none;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #111827;
  }

  h1 {
    font-size: 2rem;
    color: #111827;
  }

  .no-products {
    text-align: center;
    color: #6b7280;
    font-size: 1.1rem;
    padding: 2rem;
  }

  .products-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .product-item {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .product-item h2 {
    color: #111827;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #4b5563;
    margin-bottom: 1rem;
  }

  .product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .price {
    font-weight: 600;
    color: #10b981;
  }

  .stock {
    color: #6b7280;
    font-size: 0.875rem;
  }
</style>

<script>
  export let data;
  let { products = [] } = data;
</script>
