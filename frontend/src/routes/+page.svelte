<script>
  import { goto } from '$app/navigation';

  function goToLogin() {
    goto('/auth/login');
  }
</script>

<main>
  <h1>Lime</h1>
  <button on:click={goToLogin}>
    Logga in
  </button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f9f9f9;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
    color: #333;
  }

  button {
    background-color: #3498db;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 0 0px rgba(52, 152, 219, 0.7);
    animation: pulse-glow 2s infinite;
    transition: background 0.3s;
  }

  button:hover {
    background-color: #2779bd;
  }

  @keyframes pulse-glow {
    0% {
      box-shadow: 0 0 0px rgba(52, 152, 219, 0.7);
    }
    50% {
      box-shadow: 0 0 20px rgba(52, 152, 219, 1);
    }
    100% {
      box-shadow: 0 0 0px rgba(52, 152, 219, 0.7);
    }
  }
</style>
