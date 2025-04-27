<script>
  import { goto } from '$app/navigation';
  import toast from 'svelte-french-toast';

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
        toast.error(data?.detail || 'Registreringen misslyckades.');
        return;
      }

      const data = await res.json();

      toast.success('Registrering lyckades!');

      setTimeout(() => {
        goto('/admin/notes');
      }, 1500);
    } catch (e) {
      console.error('Register error:', e);
      toast.error('Något gick fel vid registrering.');
    }
  }
</script>

<main>
  <h1>Registrera dig</h1>

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
