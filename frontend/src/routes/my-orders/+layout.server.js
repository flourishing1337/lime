// Additional protection for my-orders routes
import { redirect } from '@sveltejs/kit';

export function load({ locals, depends }) {
  depends('supabase:auth'); // Make this route sensitive to auth changes
  
  // If no session, redirect to login
  if (!locals.session) {
    throw redirect(303, '/auth?returnTo=/my-orders');
  }

  // Return the session for use in the route
  return {
    user: locals.session.user
  };
}

