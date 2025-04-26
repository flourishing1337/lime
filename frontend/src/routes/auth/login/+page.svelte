<script>
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';

let email = '', password = '', error = '';

async function signIn() {
  const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });

  if (err) {
    error = err.message;
    return;
  }

  // Skicka sessionen till din server
  await fetch('/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ session: data.session })
  });

  goto('/');
}
</script>

<form on:submit|preventDefault={signIn}>
  <input type="email" bind:value={email} placeholder="E-post" required/>
  <input type="password" bind:value={password} placeholder="Lösenord" required/>
  <button type="submit">Logga in</button>
  {#if error}<p>{error}</p>{/if}
</form>
