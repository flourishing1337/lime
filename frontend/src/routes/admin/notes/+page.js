// frontend/src/routes/admin/notes/+page.js
/** 
 * Laddar alla noter från din FastAPI-backend. 
 * Byter till absolut URL så att du inte råkar träffa Vite-dev-serverns HTML.
 */
export async function load({ fetch }) {
  // Hårdkoda din backend-URL under utveckling:
  const res = await fetch('http://localhost:8000/admin/notes', {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error(`Kunde inte hämta noter: ${res.status}`);
  }

  const notes = await res.json();
  return { notes };
}
