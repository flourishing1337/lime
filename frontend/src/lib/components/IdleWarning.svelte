<script>
  import { fade } from 'svelte/transition';

  export let onStayActive;
  export let onTimeout;
  export let countdown = 60;

  let secondsLeft = countdown;
  let countdownTimer;

  function stayActive() {
    clearInterval(countdownTimer);
    onStayActive();
  }

  $: if (countdownTimer === undefined) {
    countdownTimer = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        clearInterval(countdownTimer);
        onTimeout();
      }
    }, 1000);
  }
</script>

<div class="overlay" in:fade={{ duration: 400 }} out:fade={{ duration: 300 }}>
  <div class="modal">
    <h2>Är du fortfarande kvar?</h2>
    <p>Du loggas ut automatiskt om {secondsLeft} sekunder.</p>
    <button on:click={stayActive}>Ja, jag är kvar</button>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2); /* lätt vit transparent bakgrund */
    backdrop-filter: blur(6px); /* 🛠️ Här lägger vi till blur */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 4px 20px rgba(0,0,0,0.3);
  }

  button {
    margin-top: 1rem;
    background: #22c55e;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background: #16a34a;
  }
</style>
