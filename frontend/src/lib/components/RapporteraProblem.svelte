<script>
  import { fade, slide } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';

  export let glow = false;
  export let autoGlow = true;
  export let autoGlowDelay = 5000;

  let timerId;

  function stopGlowDueToActivity() {
    if (timerId) {
      clearTimeout(timerId);
    }
    glow = false;
    window.removeEventListener('mousemove', stopGlowDueToActivity);
    window.removeEventListener('click', stopGlowDueToActivity);
    window.removeEventListener('keydown', stopGlowDueToActivity);
  }

  onMount(() => {
    if (autoGlow) {
      timerId = setTimeout(() => {
        glow = true;
      }, autoGlowDelay);

      window.addEventListener('mousemove', stopGlowDueToActivity);
      window.addEventListener('click', stopGlowDueToActivity);
      window.addEventListener('keydown', stopGlowDueToActivity);
    }
  });

  onDestroy(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    window.removeEventListener('mousemove', stopGlowDueToActivity);
    window.removeEventListener('click', stopGlowDueToActivity);
    window.removeEventListener('keydown', stopGlowDueToActivity);
  });
</script>

<a 
  class="support-button {glow ? 'glow' : ''}" 
  href="mailto:support@limeplatform.com?subject=Jag%20vill%20rapportera%20ett%20problem&body=Hej%20teamet%2C%20jag%20vill%20rapportera%20att..."
  in:fade={{ duration: 600 }}
  in:slide={{ delay: 100, duration: 600 }}
>
  Rapportera problem
</a>

<style>
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

  @keyframes pulse-glow {
    0% {
      box-shadow: 0 0 0px rgba(52, 152, 219, 0.7);
    }
    50% {
      box-shadow: 0 0 15px rgba(52, 152, 219, 1);
    }
    100% {
      box-shadow: 0 0 0px rgba(52, 152, 219, 0.7);
    }
  }

  .glow {
    animation: pulse-glow 2s infinite;
  }
</style>
