let activityListeners = [];

export function startActivityDetection(callback) {
  const events = ['mousemove', 'click', 'keydown'];

  function handler() {
    callback();
  }

  events.forEach(event => {
    window.addEventListener(event, handler);
    activityListeners.push({ event, handler });
  });
}

export function stopActivityDetection() {
  activityListeners.forEach(({ event, handler }) => {
    window.removeEventListener(event, handler);
  });
  activityListeners = [];
}
