<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let email = '';
  let password = '';
  let error = '';

  async function handleLogin() {
    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        error = data?.detail || 'Felaktiga inloggningsuppgifter.';
        return;
      }

      const data = await res.json();

      // 🛑 Vi tar inte längre emot och sätter JWT på frontend
      // Vi låter backend (eller server) hantera cookies/token

      const redirectTo = $page.url.searchParams.get('redirectTo') || '/admin/notes';
      goto(redirectTo);
    } catch (e) {
      console.error('Login error:', e);
      error = 'Något gick fel vid inloggning.';
    }
  }
</script>

<main>
  <h1>Logga in</h1>

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleLogin}>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} required />
    </div>

    <div>
      <label for="password">Lösenord</label>
      <input id="password" type="password" bind:value={password} required />
    </div>

    <button type="submit">Logga in</button>
  </form>
</main>
