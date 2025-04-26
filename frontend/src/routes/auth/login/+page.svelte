<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function signIn() {
    error = '';
    loading = true;

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    loading = false;

    if (err) {
      error = err.message;
    }
    /*  
      Vi gör INGEN manual redirect här.  
      hooks.client.js fångar eventet SIGNED_IN, sparar cookien via
      /auth/callback och skickar användaren till startsidan.
    */
  }
</script>

<svelte:head><title>Logga in</title></svelte:head>

<h1>Logga in</h1>

{#if error}
  <p style="color:red;margin:.5em 0;">✖ {error}</p>
{/if}

<form on:submit|preventDefault={signIn}>
  <label>
    E-post  
    <input type="email" bind:value={email} placeholder="din@mail.se" required />
  </label>

  <label>
    Lösenord  
    <input type="password" bind:value={password} placeholder="lösenord" required />
  </label>

  <button disabled={loading}>
    {#if loading}Loggar in…{:else}Logga in{/if}
  </button>
</form>

<p style="margin-top:1em;">
  <a href="/auth/reset">Glömt lösenordet?</a>
</p>

<style>
  label { display:block; margin:.6em 0; }
  input { width:100%; padding:.5em; }
  button { padding:.7em 1.2em; margin-top:.6em; }
</style>
