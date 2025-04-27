import { startActivityDetection, stopActivityDetection } from './activityDetector';

let timeoutId;
let timeoutDuration = 10 * 60 * 1000; // Standard 10 minuter (i millisekunder)
let onIdleCallback;

/**
 * Startar idle-timer
 * @param {function} callback - Vad som ska hända när användaren varit inaktiv för länge
 * @param {number} duration - Hur länge innan callback körs (millisekunder)
 */
export function startIdleTimer(callback, duration = timeoutDuration) {
  onIdleCallback = callback;
  timeoutDuration = duration;

  resetTimer();

  startActivityDetection(resetTimer);
}

/**
 * Stoppar idle-timer
 */
export function stopIdleTimer() {
  clearTimeout(timeoutId);
  stopActivityDetection();
}

/**
 * Nollställer timern
 */
function resetTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (onIdleCallback) {
      onIdleCallback();
    }
  }, timeoutDuration);
}
