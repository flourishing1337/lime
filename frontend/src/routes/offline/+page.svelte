<script>
  import { goto } from '$app/navigation';

  function handleRetry() {
    location.reload(); // 🛠️ Ladda om sidan för att försöka igen
  }
</script>

<main style="text-align: center; padding: 2rem;">
  <h1>Offline</h1>
  <p>Vi kan inte nå servern just nu. Det kan vara ett tillfälligt problem.</p>

  <button on:click={handleRetry} style="margin: 1rem; padding: 0.75rem 1.5rem; font-size: 1.1rem; background-color: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer;">
    Försök igen
  </button>

  <p style="margin-top: 2rem;">Hjälp oss gärna att förbättra plattformen!</p>
  <p style="font-size: 0.95rem; color: #666;">
    Eftersom vi är en ny techplattform som strävar efter att bygga ett robust och pålitligt system, uppskattar vi om du rapporterar eventuella buggar eller problem du stöter på.
  </p>

  <a href="mailto:support@limeplatform.com?subject=Bugg%20rapporterad%20från%20offline-sida&body=Hej%20teamet%2C%20jag%20ville%20rapportera%20en%20bugg%20som%20jag%20stötte%20på..." 
     style="display: inline-block; margin-top: 1rem; color: #3498db; text-decoration: underline;">
    Rapportera en bugg via email
  </a>
</main>
