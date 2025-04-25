<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function signUp() {
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password
    });
    if (err) {
      error = err.message;
    } else {
      // Skicka användaren vidare till en "Check your inbox"-sida
      goto('/auth/confirm');
    }
  }
</script>

<h1>Skapa konto</h1>
{#if error}<p style="color:red">{error}</p>{/if}
<label>
  E-post
  <input type="email" bind:value={email} />
</label>
<label>
  Lösenord
  <input type="password" bind:value={password} />
</label>
<button on:click={signUp}>Registrera</button>
