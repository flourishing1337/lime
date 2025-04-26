// src/routes/+layout.server.js

/** Gör session globalt tillgänglig som data.session */
export async function load({ locals }) {
  return {
    session: locals.session ?? null
  };
}
