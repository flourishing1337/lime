// frontend/src/hooks.client.js
// Inga fler globala redirect-onMount här – vi hanterar auth per route istället.

export async function handle({ event, resolve }) {
  // Här kan du i framtiden lägga in t.ex. loggning eller supabase-listeners,
  // men för nu bara pass-through:
  return resolve(event);
}
