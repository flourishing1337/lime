import toast from 'svelte-french-toast';

const defaultDuration = 3000; // 3 sekunder

export function toastSuccess(message, duration = defaultDuration) {
  toast.success(message, {
    duration,
    style: {
      background: "#22c55e", // Grön
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "1rem"
    }
  });
}

export function toastError(message, duration = defaultDuration) {
  toast.error(message, {
    duration,
    style: {
      background: "#ef4444", // Röd
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "1rem"
    }
  });
}

export function toastInfo(message, duration = defaultDuration) {
  toast(message, {
    duration,
    style: {
      background: "#333", // Grå
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "1rem"
    }
  });
}
