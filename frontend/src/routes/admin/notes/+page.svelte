<script>
  import { onMount } from 'svelte';
  import { apiFetch } from '$lib/api';
  import { goto } from '$app/navigation';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

  let notes = [];
  let error = '';
  let loading = true;

  onMount(async () => {
    try {
      const res = await apiFetch('http://localhost:8000/admin/notes');

      if (!res || !res.ok) {
        error = 'Kunde inte hämta notes.';
        console.error('Fel vid hämtning av notes:', res?.status);
        return;
      }

      notes = await res.json();
    } catch (err) {
      console.error('Något gick fel vid apiFetch:', err);
      error = 'Ett oväntat fel inträffade.';
    } finally {
      loading = false;
    }
  });
</script>

<main>
  <h1>Admin Notes</h1>

  {#if loading}
    <LoadingSpinner size={60} fullscreen={true} />
  {:else if error}
    <p style="color: red;">{error}</p>
  {:else if notes.length}
    <ul>
      {#each notes as note}
        <li><strong>{note.title}:</strong> {note.content}</li>
      {/each}
    </ul>
  {:else}
    <p>Inga notes hittades.</p>
  {/if}
</main>
