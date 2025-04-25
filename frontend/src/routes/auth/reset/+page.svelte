<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  let email = '';
  let message = '';
  let error = '';
  let loading = false;

  async function resetPassword() {
    error = '';
    message = '';
    loading = true;
    const { data, error: err } = await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'http://localhost:5173/auth/update-password'});
    loading = false;
    if (err) {
      error = err.message;
    } else {
      message = 'Mejl skickat! Kolla din inkorg för länken.';
    }
  }
</script>

<h1>Återställ lösenord</h1>

{#if error}
  <p style="color:red">{error}</p>
{:else if message}
  <p style="color:green">{message}</p>
{/if}

<label>
  Din e-post  
  <input type="email" bind:value={email} placeholder="din@mail.se" />
</label>

<button on:click={resetPassword} disabled={loading}>
  {#if loading}Skickar…{:else}Skicka återställningsmail{/if}
</button>

<p style="margin-top:1em;">
  <a href="/auth/login">← Tillbaka till inloggning</a>
</p>

<style>
  label { display: block; margin: 0.5em 0; }
  input { width: 100%; padding: 0.5em; }
  button { padding: 0.7em 1.2em; margin-top: 0.5em; }
</style>
