/**
 * Saves data locally.
 * @param key The key for retrieving the saved data.
 * @param data The data to save.
 * @returns Returns true if the data has been saved successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/localStorage|MDN - Window.localStorage}
 * @see {@link https://developer.mozilla.org/docs/Web/API/Storage/setItem|MDN - Storage.setItem}
 * @example
 * const playerState = {
 *  name: 'MagicPoney',
 *  score: 12500
 * }
 * facile.save('player', playerState);
 */
export function save<T>(key: string, data: T): boolean {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

/**
 * Loads local data.
 * @param key The key of the saved data.
 * @param defaultValue If defined and the key doesn't exist, this value will be returned instead of null.
 * @returns Returns the loaded data, or null if it the key doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/localStorage|MDN - Window.localStorage}
 * @see {@link https://developer.mozilla.org/docs/Web/API/Storage/getItem|MDN - Storage.getItem}
 * @example
 * const playerState = facile.load('player', {
 *  name: '',
 *  score: 0
 * });
 * console.log(playerState);
 */
export function load<T>(key: string, defaultValue?: T): T | null {
  const item = localStorage.getItem(key);
  if (item === null && defaultValue !== undefined) {
    return defaultValue;
  }
  return JSON.parse(item as string);
}

/**
 * Clears local data.
 * @param key The key of the saved data. If not defined, clears all the saved data.
 * @returns Returns true if the key was valid and the data has been cleared successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/localStorage|MDN - Window.localStorage}
 * @see {@link https://developer.mozilla.org/docs/Web/API/Storage/removeItem|MDN - Storage.removeItem}
 * @example
 * facile.clear('player');
 */
export function clear(key?: string) {
  // Clear the entire local storage if no key given
  if (!key) {
    localStorage.clear();
    return true;
  }

  // Remvove the named data if it exists
  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
}