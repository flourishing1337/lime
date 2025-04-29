const API_BASE = process.env.VITE_API_BASE || 'http://api:8000';

export async function load({ fetch }) {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const healthy = await res.json();

    return { healthy };
  } catch (e) {
    console.error('[LAYOUT load error]', e);
    throw error(500, 'Layout load failed');
  }
}
