# Lime Frontend

🚀 Frontend för Lime-plattformen – byggd med [SvelteKit](https://kit.svelte.dev/) och [Vite](https://vitejs.dev/).

---

## Lokalt utvecklingsläge

```bash
# Gå till frontend-mappen
cd frontend

# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
Frontend körs som standard på: http://localhost:5173

Miljövariabler
Skapa en .env-fil i /frontend/ med:

bash
Copy code
VITE_API_BASE=http://localhost:8000
VITE_API_BASE används för att ange backend-URL.

Deployment
Frontend deployas på Vercel.

Se till att lägga till miljövariabeln VITE_API_BASE i Vercel under "Environment Variables".

Projektstruktur
Mapp	Beskrivning
/src/routes	Sidor och routes
/src/lib	Komponenter, stores och utils
/public	Statisk publik data
Funktioner
✅ Quest-board och admin-nyheter
✅ Real-time admin-chatt
✅ Global loading indicators och toasts
✅ Idle timeout och sessionhantering

Tech Stack
SvelteKit

Vite

TailwindCSS (planerat)

Svelte French Toast (toasts)

Svelte NProgress (planerat för progress-bar)

Byggt med ❤️ av Lime-teamet 2025.