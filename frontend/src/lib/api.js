import toast from 'svelte-french-toast';
import { goto } from '$app/navigation';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function apiFetch(url, options = {}, { showToast = true, customMessages = {}, timeoutMs = 10000 } = {}) {
  let toastId;
  let timeoutToastId;

  const loadingMessage = customMessages.loading || 'Laddar...';
  const successMessage = customMessages.success || 'Klart!';
  const errorMessage = customMessages.error || 'Något gick fel!';

  if (showToast) {
    toastId = toast.loading(loadingMessage);
  }

  const timeoutTimer = setTimeout(() => {
    timeoutToastId = toast('Detta tar ovanligt lång tid...', {
      style: {
        background: '#fbbf24',
        color: '#000',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '1rem'
      },
      duration: 4000
    });
  }, timeoutMs);

  try {
    options.headers = {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    };

    const res = await fetch(`${API_BASE}${url}`, options);

    clearTimeout(timeoutTimer);

    if (res.status === 401) {
      if (showToast && toastId) {
        toast.error('Behöver logga in igen', { id: toastId });
      }
      goto('/auth/login');
      return;
    }

    if (!res.ok) {
      const errorText = await res.text();
      if (showToast && toastId) {
        toast.error(`${errorMessage} (${errorText || res.status})`, { id: toastId });
      }
      return res;
    }

    if (showToast && toastId) {
      toast.success(successMessage, { id: toastId });
    }

    return res;

  } catch (error) {
    console.error('apiFetch fatal error:', error);
    clearTimeout(timeoutTimer);
    if (showToast && toastId) {
      toast.error(`Nätverksfel: ${error.message}`, { id: toastId });
    }
    goto('/offline');
    throw error;
  }
}
