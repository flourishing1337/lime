<script>
  import { supabase } from '$lib/supabaseClient';
  import { session } from '$lib/stores/session';
  import { goto } from '$app/navigation';
  let email = '';
  let password = '';
  let error = '';      // Feltext
  let loading = false; // Laddningsstate
  let success = '';    // Vid lyckad inloggning

  async function signIn() {
    error = '';
    success = '';
    loading = true;
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    loading = false;
    if (err) {
      error = err.message;       // Visa felmeddelandet
    } else {
      session.set(data.session);
      success = 'Inloggning lyckades! Omdirigerar…';
      // Vänta en kort stund så användaren ser meddelandet
      setTimeout(() => goto('/'), 1000);
    }
  }
</script>

<h1>Logga in</h1>

{#if error}
  <p style="color: red; margin: 0.5em 0;">✖ {error}</p>
{/if}

{#if success}
  <p style="color: green; margin: 0.5em 0;">✔ {success}</p>
{/if}

<label>
  E-post  
  <input type="email" bind:value={email} placeholder="din@mail.se" />
</label>

<label>
  Lösenord  
  <input type="password" bind:value={password} placeholder="lösenord" />
</label>

<button
  on:click={signIn}
  disabled={loading}
>
  {#if loading}Loggar in…{:else}Logga in{/if}
</button>

<p style="margin-top:1em;">
  <a href="/auth/reset">Glömt lösenordet?</a>
</p>

<style>
  label { display: block; margin: 0.5em 0; }
  input { width: 100%; padding: 0.5em; }
  button { padding: 0.7em 1.2em; margin-top: 0.5em; }
</style>
