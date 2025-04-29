<script>
  export let error;
  export let status;
</script>

<main style="text-align: center; padding: 5rem;">
  <h1>💥 Ett fel inträffade</h1>
  <p>Status: {status}</p>
  <p>Fel: {typeof error === 'string' ? error : error?.message}</p>
  <a
    href="/"
    style="margin-top: 2rem; display: inline-block; padding: 1rem 2rem; background: #3498db; color: white; border-radius: 50px; text-decoration: none;"
    >Tillbaka till startsidan</a
  >
</main>
