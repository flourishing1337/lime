<script>
  import { logout } from '$lib/auth';
</script>

<style>
  .sidebar {
    width: 200px;
    background: #f5f5f5;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .sidebar a, .sidebar button {
    display: block;
    margin: .5rem 0;
    color: #333;
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }
  .sidebar button:hover, .sidebar a:hover {
    color: #0070f3;
  }
  .content {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
  }
  .container {
    display: flex;
    height: 100vh;
  }
</style>

<div class="container">
  <aside class="sidebar">
    <h2>Admin</h2>
    <a href="/admin/notes">Notes</a>
    <a href="/admin/files">Files</a>
    <a href="/admin/profile">Mitt Konto</a>
    <button on:click={logout}>Logga ut</button>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>
