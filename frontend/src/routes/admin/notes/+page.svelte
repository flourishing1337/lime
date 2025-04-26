<script>
  export let data;
  let notes = data.notes || [];
  let title = '';
  let content = '';
  let error = '';
  let loading = false;

  async function saveNote() {
    if (!title.trim() || !content.trim()) {
      error = 'Både titel och text måste fyllas i';
      return;
    }
    loading = true;
    error = '';
    try {
      const res = await fetch('/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      // Hämta om listan
      const reload = await fetch('/admin/notes');
      const json = await reload.json();
      notes = json.notes;
      // Nollställ formulär
      title = '';
      content = '';
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<style>
  .note-list { margin-bottom: 2rem; }
  .note { padding: .5rem; border-bottom: 1px solid #eee; }
  .note-title { font-weight: bold; }
  textarea { width: 100%; height: 150px; }
  input, textarea, button { margin-top: .5rem; display: block; }
</style>

<h1>Admin Notes</h1>

{#if error}
  <p style="color: red;">⚠️ {error}</p>
{/if}

<section class="note-list">
  {#each notes as n}
    <div class="note">
      <div class="note-title">{n[1]}</div>
      <div class="note-content">{n[2]}</div>
      <div style="font-size:.8rem; color:#666;">Skapad: {new Date(n[3]).toLocaleString()}</div>
    </div>
  {:else}
    <p>Inga anteckningar ännu.</p>
  {/each}
</section>

<section class="note-editor">
  <h2>Skapa / uppdatera anteckning</h2>
  <label>
    Titel
    <input type="text" bind:value={title} placeholder="Första Checklista" />
  </label>
  <label>
    Innehåll
    <textarea bind:value={content} placeholder="Skriv din anteckning här..."></textarea>
  </label>
  <button on:click={saveNote} disabled={loading}>
    {#if loading}Sparar…{:else}Spara{/if}
  </button>
</section>
