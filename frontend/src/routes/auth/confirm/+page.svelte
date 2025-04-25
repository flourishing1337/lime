<script>
  // Här kan du lägga logik för att visa token-status om du vill
</script>

<svelte:head>
  <title>Bekräfta din e-post</title>
</svelte:head>

<main>
  <h1>Tack för din registrering!</h1>
  <p>
    Vi har skickat ett bekräftelsemejl till dig. 
    Klicka på länken i mejlet för att aktivera ditt konto.
  </p>
  <p>
    Om du inte får något mejl, kontrollera din skräpkorg eller 
    <a href="/auth/signup">försök registrera dig igen</a>.
  </p>
</main>

<style>
  main {
    max-width: 600px;
    margin: 2rem auto;
    text-align: center;
  }
</style>
