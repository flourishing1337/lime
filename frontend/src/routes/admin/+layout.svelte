<script>
  // Du kan plocka in user-store här och kolla auth, 
  // men vi hoppar auth-guard tills vidare
</script>

<style>
  .sidebar {
    width: 200px;
    background: #f5f5f5;
    padding: 1rem;
  }
  .sidebar a {
    display: block;
    margin: .5rem 0;
    color: #333;
    text-decoration: none;
  }
  .content {
    padding: 1rem;
    flex: 1;
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
  </aside>
  <main class="content">
    <slot />
  </main>
</div>
