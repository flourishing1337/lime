/**
 * Server endpoint to handle favicon.ico requests
 * This redirects browsers requesting favicon.ico to the existing favicon.png file
 */
export function GET() {
  // Redirect to the PNG favicon in the static directory
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/favicon.png'
    }
  });
}

