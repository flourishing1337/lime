export async function load({ fetch }) {
  try {
    // Example placeholder
    const res = await fetch('http://api:8000/health');
    const healthy = await res.json();

    return { healthy };
  } catch (e) {
    console.error('[LAYOUT load error]', e);
    throw error(500, 'Layout load failed');
  }
}
