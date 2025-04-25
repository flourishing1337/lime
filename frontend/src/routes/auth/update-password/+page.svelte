<script>
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  export let data;

  let { access_token } = data;
  let newPassword = '';
  let error = '';
  let success = '';
  let loading = false;

  async function updatePassword() {
    error = '';
    success = '';
    if (!newPassword) return error = 'Fyll i ett nytt lösenord';
    loading = true;

    const { error: err } = await supabase.auth.updateUser(
      { password: newPassword },
      { accessToken: access_token }
    );

    loading = false;
    if (err) {
      error = err.message;
    } else {
      success = 'Lösenordet har uppdaterats! Du kan nu logga in.';
      setTimeout(() => goto('/auth/login'), 1500);
    }
  }
</script>

<svelte:head>
  <title>Byt lösenord</title>
</svelte:head>

<main>
  <h1>Välj ett nytt lösenord</h1>

  {#if error}
    <p style="color:red">{error}</p>
  {/if}

  {#if success}
    <p style="color:green">{success}</p>
  {/if}

  <label>
    Nytt lösenord
    <input type="password" bind:value={newPassword} />
  </label>
  <button on:click={updatePassword} disabled={loading}>
    {#if loading}Uppdaterar…{:else}Byt lösenord{/if}
  </button>
</main>

<style>
  main { max-width: 400px; margin: 2rem auto; }
  label { display: block; margin: 1rem 0; }
  input { width: 100%; padding: 0.5rem; }
  button { padding: 0.5rem 1rem; }
</style>
