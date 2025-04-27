<script>
  import { goto } from '$app/navigation';

  function handleLogout() {
    // Tillfällig enkel logout: redirect till login
    goto('/auth/login');
  }
</script>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 200px;
    background: #f5f5f5;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  }

  .sidebar h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #222;
  }

  .sidebar a, .sidebar button {
    display: block;
    margin: 0.5rem 0;
    color: #333;
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    text-align: left;
    transition: color 0.3s;
  }

  .sidebar a:hover, .sidebar button:hover {
    color: #0070f3;
  }

  .content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background: #fafafa;
  }
</style>

<div class="container">
  <aside class="sidebar">
    <h2>Admin</h2>
    <a href="/admin/notes">Notes</a>
    <a href="/admin/files">Files</a>
    <a href="/admin/profile">Mitt Konto</a>
    <button on:click={handleLogout}>Logga ut</button>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>
