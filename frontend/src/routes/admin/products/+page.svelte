<script>
  export let data;
  let { products } = data;

  // Edit-state
  let editId   = '';
  let editName = '';
  let editPrice= '';
  let editStock= '';
  function startEdit(p) {
    editId = p.id;
    editName = p.name;
    editPrice = p.price;
    editStock = p.stock_quantity;
  }
</script>

<svelte:head><title>Admin · Produkter</title></svelte:head>

<main style="max-width:800px;margin:2rem auto;padding:0 1rem;">
  <h1>Admin – Produkter</h1>

  <!-- Lägg till produkt -->
  <details open style="margin-bottom:1rem;">
    <summary>Lägg till ny produkt</summary>
    <form method="post" use:enhance>
      <input type="hidden" name="intent" value="add"/>
      <label>Namn <input name="name" required/></label>
      <label>Beskrivning <textarea name="description"></textarea></label>
      <label>Pris <input type="number" step="0.01" name="price" required/></label>
      <label>Lager <input type="number" name="stock" required/></label>
      <button formaction="?/add">Spara</button>
    </form>
  </details>

  <!-- Lista -->
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr><th>Namn</th><th>Pris</th><th>Lager</th><th></th></tr>
    </thead>
    <tbody>
      {#each products as p}
        <tr>
          <td>{p.name}</td>
          <td>{p.price.toFixed(2)}</td>
          <td>{p.stock_quantity}</td>
          <td>
            <button on:click={() => startEdit(p)}>✏️</button>
            <form method="post" style="display:inline;">
              <input type="hidden" name="id" value={p.id}/>
              <button formaction="?/delete" formmethod="post">🗑️</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Edit-modal (enkel) -->
  {#if editId}
    <div style="position:fixed;inset:0;background:#0005;display:flex;align-items:center;justify-content:center;">
      <form method="post" style="background:#fff;padding:1.5rem;border-radius:6px;min-width:300px;">
        <h2>Redigera</h2>
        <input type="hidden" name="id" value={editId}/>
        <label>Namn <input name="name" bind:value={editName} required/></label>
        <label>Pris <input type="number" step="0.01" name="price" bind:value={editPrice} required/></label>
        <label>Lager <input type="number" name="stock" bind:value={editStock} required/></label>
        <button formaction="?/update" style="margin-right:0.5rem;">Spara</button>
        <button type="button" on:click={() => editId=''}>Avbryt</button>
      </form>
    </div>
  {/if}
</main>

<style>
  label { display:block; margin:0.3rem 0; }
  input, textarea { width:100%; padding:0.3rem; }
  table, th, td { border:1px solid #ddd; }
  th, td { padding:0.4rem; text-align:left; }
</style>
