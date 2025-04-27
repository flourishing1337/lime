<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { isLoading } from '$lib/stores/loading';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

  let currentUrl = '';

  // Reagera på sidbyten
  $: if (currentUrl !== $page.url.pathname) {
    isLoading.set(true);

    setTimeout(() => {
      isLoading.set(false);
    }, 500); // Ger en kort laddningseffekt, kan anpassas
  }

  // Startvärde
  onMount(() => {
    currentUrl = $page.url.pathname;
  });
</script>

<main>
  {#if $isLoading}
    <LoadingSpinner fullscreen={true} size={60} />
  {/if}

  <slot />
</main>
