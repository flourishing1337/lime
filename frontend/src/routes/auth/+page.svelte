<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    // Redirect to login page when this route is accessed directly
    goto('/auth/login');
  });
</script>

<div>
  <p>Redirecting to login...</p>
</div>

