// src/routes/auth/update-password/+page.js
export function load({ url }) {
  // plocka ut access_token från query
  const access_token = url.searchParams.get('access_token');
  return { access_token };
}
