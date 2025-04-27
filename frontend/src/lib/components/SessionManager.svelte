<script>
  import { onMount, onDestroy } from 'svelte';
  import { startIdleTimer, stopIdleTimer } from '$lib/utils/idleTimer';
  import { startActivityDetection, stopActivityDetection } from '$lib/utils/activityDetector';
  import IdleWarning from '$lib/components/IdleWarning.svelte';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  const showWarning = writable(false);
  let isWatchingDuringWarning = false;

  function onUserIdle() {
    showWarning.set(true);
    startActivityDetection(autoExtendSession); // Starta lyssna på aktivitet
    isWatchingDuringWarning = true;
  }

  function onTimeout() {
    goto('/auth/login');
  }

  function stayActive() {
    resetSession();
  }

  function autoExtendSession() {
    if (isWatchingDuringWarning) {
      resetSession();
    }
  }

  function resetSession() {
    showWarning.set(false);
    stopActivityDetection();
    startIdleTimer(onUserIdle, 9 * 60 * 1000); // Starta om idleTimer på 9 min
    isWatchingDuringWarning = false;
  }

  onMount(() => {
    startIdleTimer(onUserIdle, 9 * 60 * 1000);
  });

  onDestroy(() => {
    stopIdleTimer();
    stopActivityDetection();
  });
</script>

{#if $showWarning}
  <IdleWarning onStayActive={stayActive} onTimeout={onTimeout} countdown={60} />
{/if}
