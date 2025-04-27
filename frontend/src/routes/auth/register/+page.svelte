<script>
  import { jwt } from '$lib/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function handleRegister() {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        error = data?.detail || 'Registreringen misslyckades.';
        return;
      }

      const data = await res.json();
      jwt.set(data.access_token); // ✅ Spara token direkt

      goto('/admin/notes'); // 🚀 Redirecta till admin efter lyckad registrering
    } catch (e) {
      console.error('Register error:', e);
      error = 'Något gick fel vid registrering.';
    }
  }
</script>

<main>
  <h1>Registrera dig</h1>

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleRegister}>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required />
    </div>

    <div>
      <label for="password">Lösenord</label>
      <input id="password" type="password" bind:value={password} required />
    </div>

    <button type="submit">Registrera</button>
  </form>
</main>
