<script>
  import { onMount } from 'svelte';
  import SessionManager from '$lib/components/SessionManager.svelte';  
  import { page, navigating } from '$app/stores';
  import { isLoading } from '$lib/stores/loading';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { Toaster } from 'svelte-french-toast';

  const appVersion = import.meta.env.VITE_APP_VERSION || "dev";

  let currentUrl = '';

  $: if (currentUrl !== $page.url.pathname) {
    isLoading.set(true);
    setTimeout(() => {
      isLoading.set(false);
    }, 500);
  }

  onMount(() => {
    currentUrl = $page.url.pathname;
  });
</script>

<main>
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        padding: "12px 16px",
        borderRadius: "8px",
        fontSize: "1rem",
        color: "#fff"
      },
      success: {
        style: { background: "#22c55e" }
      },
      error: {
        style: { background: "#ef4444" }
      },
      blank: {
        style: { background: "#333" }
      }
    }}
  />

  <SessionManager /> <!-- 🛡️ Automatiskt session- och inaktivitetskydd -->

  {#if $isLoading}
    <LoadingSpinner fullscreen={true} size={60} />
  {/if}

  <slot />

  <footer class="version-footer">
    Version {appVersion}
  </footer>

  <a 
    class="support-button" 
    href="mailto:support@limeplatform.com?subject=Jag%20vill%20rapportera%20ett%20problem&body=Hej%20teamet%2C%20jag%20vill%20rapportera%20att..."
  >
    Rapportera problem
  </a>
</main>

<style>
  .version-footer {
    text-align: center;
    font-size: 0.8rem;
    color: #666;
    padding: 1rem;
  }
  .support-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #3498db;
    color: white;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    border-radius: 50px;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
    cursor: pointer;
    z-index: 1000;
    text-decoration: none;
    transition: background 0.3s;
  }
  .support-button:hover {
    background-color: #2779bd;
  }
</style>
