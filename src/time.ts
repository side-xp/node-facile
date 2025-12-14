/**
 * This script contains features related to time, date and timers.
 * @module Time
 */

/**
 * Repsesents a callback used for a timer.
 */
export type TimerCallback = () => void;

/**
 * Groups the name given to a timer and its unique identifier.
 */
interface TimerId {
  name?: string;
  id: number;
  isTimeout: boolean;
}

/**
 * The list of all the timers started from this utility.
 */
const activeTimers = new Array<TimerId>();

/**
 * Repeats a given function by a given time interval (in milliseconds).
 * @param ms The time interval, in milliseconds.
 * @param callback The function to repeat.
 * @returns Returns a unique identifier for the created timer, so you can stop it using {@link stop|stop()}.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/setInterval|MDN - Window.setInterval()}
 */
export function doEvery(ms: number, callback: TimerCallback): number;

/**
 * Repeats a given function by a given time interval (in milliseconds).
 * @param ms The time interval, in milliseconds.
 * @param name The time of the timer to create, so you can identify it easily.
 * @param callback The function to repeat.
 * @returns Returns a unique identifier for the created timer, so you can stop it using {@link stop|stop()}, by name or by this id.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/setInterval|MDN - Window.setInterval()}
 */
export function doEvery(ms: number, name: string, callback: TimerCallback): number;

export function doEvery(ms: number, name: string | TimerCallback, callback?: TimerCallback): number {
  ms = Math.abs(Math.floor(ms));
  if (ms <= 0) {
    console.warn('Failed to create timer: the interval must not be equal to 0.');
    return -1;
  }

  if (typeof name === 'function') {
    callback = name;
    name = '';
  }

  const timerId: TimerId = {
    name: name || undefined,
    id: setInterval(callback as TimerHandler, ms),
    isTimeout: false
  };

  activeTimers.push(timerId);
  return timerId.id;
}

/**
 * Calls a given function after a given delay (in milliseconds).
 * @param ms The delay, in milliseconds.
 * @param callback The function to call.
 * @returns Returns a unique identifier for the created timer, so you can stop it using {@link stop|stop()}.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/setTimeout|MDN - Window.setTimeout()}
 */
export function doAfter(ms: number, callback: TimerCallback): number;

/**
 * Calls a given function after a given delay (in milliseconds).
 * @param ms The delay, in milliseconds.
 * @param name The time of the timer to create, so you can identify it easily.
 * @param callback The function to call.
 * @returns Returns a unique identifier for the created timer, so you can stop it using {@link stop|stop()}, by name or by that id.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/setTimeout|MDN - Window.setTimeout()}
 */
export function doAfter(ms: number, name: string, callback: TimerCallback): number;

export function doAfter(ms: number, name: string | TimerCallback, callback?: TimerCallback): number {
  // Fix ms param
  ms = Math.abs(Math.floor(ms));
  if (ms <= 0) {
    console.warn('Failed to create timer: the delay must not be equal to 0.');
    return -1;
  }

  // Fix name and callback params
  if (typeof name === 'function') {
    callback = name;
    name = '';
  }

  // Create the timer
  const id = setTimeout(() => {
    try {
      (callback as Function)();
    }
    finally {
      // Remove the timer from the active timers list
      const index = activeTimers.findIndex(i => i.id === id);
      if (index >= 0) {
        activeTimers.splice(index, 1);
      }
    }
  }, ms);

  // Create active timer entry
  activeTimers.push({
    name: name || undefined,
    id,
    isTimeout: true
  });

  return id;
}

/**
 * Stops a named timer.
 * @param name The name of the timer to stop.
 * @returns Returns true if the named timer has been stopped successfully, or false if it doesn't exist or was already stopped.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/clearInterval|MDN - Window.clearInterval()}
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/clearTimeout|MDN - Window.clearTimeout()}
 */
export function stop(name: string): boolean;

/**
 * Stops a timer.
 * @param id The unique identifier of the timer.
 * @returns Returns true if the named timer has been stopped successfully, or false if it doesn't exist or was already stopped.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/clearInterval|MDN - Window.clearInterval()}
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/clearTimeout|MDN - Window.clearTimeout()}
 */
export function stop(id: number): boolean
export function stop(id: string|number): boolean {
  // Try find timer in active timers list
  let index = typeof id === 'string'
    ? activeTimers.findIndex(i => i.name === id)
    : activeTimers.findIndex(i => i.id === id);

  // Cancel if timer doesn't exist
  if (index < 0) {
    console.warn(`Failed to stop a timer: No timer found for id "${id}".`);
    return false;
  }

  // Stop the timer
  if (activeTimers[index].isTimeout) {
    clearTimeout(activeTimers[index].id);
  }
  else {
    clearInterval(activeTimers[index].id);
  }
  // Remove the timer from active timers list
  activeTimers.splice(index, 1);
  return true;
}