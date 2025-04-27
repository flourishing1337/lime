<script>
  import { page } from '$app/stores';
</script>

<main>
  <h1>Välkommen</h1>

  {#if $page.url.pathname.includes('/login')}
    <p>Har du inget konto? <a href="/auth/register">Registrera dig här</a></p>
  {:else if $page.url.pathname.includes('/register')}
    <p>Har du redan ett konto? <a href="/auth/login">Logga in här</a></p>
  {/if}

  <slot />
</main>
