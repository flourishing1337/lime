<script>
  export let size = 40;
  export let fullscreen = false;
</script>

<style>
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    z-index: 9999;
  }
</style>

<div class="spinner-container {fullscreen ? 'fullscreen' : ''}">
  <div
    class="spinner"
    style="width: {size}px; height: {size}px; margin: 2rem auto;"
  ></div>
</div>
