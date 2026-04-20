/**
 * Features related to saving/loading data locally.
 * @module Save
 */

// Guard for Node context
if (typeof window === 'undefined') {
  throw new Error('facile:save.ts - Save & localStorage utilities require a browser environment.')
}

/**
 * Saves data locally.
 * @param key The key for retrieving the saved data.
 * @param data The data to save.
 * @returns Returns `true` if the data was saved successfully, `false` if the storage quota was exceeded.
 * @example
 * const playerState = {
 *  name: 'MagicPoney',
 *  score: 12500
 * }
 * facile.save('player', playerState);
 */
export function save<T>(key: string, data: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

/**
 * Loads local data.
 * @param key The key of the saved data.
 * @param defaultValue If defined and the key doesn't exist, this value will be returned instead of `null`.
 * @returns Returns the loaded data, or `null` if it the key doesn't exist.
 * @example
 * const playerState = facile.load('player', {
 *  name: '',
 *  score: 0
 * });
 */
export function load<T>(key: string, defaultValue?: T): T | null {
  const item = localStorage.getItem(key)
  if (item === null) {
    return defaultValue !== undefined ? defaultValue : null
  }
  return JSON.parse(item) as T
}

/**
 * Returns `true` if a save entry exists for the given key, `false` otherwise.
 * @param key The key to check.
 * @returns `true` if the key exists, `false` otherwise.
 * @example
 * if (facile.hasSave('player')) {
 *   const playerState = facile.load('player');
 * }
 */
export function hasSave(key: string): boolean {
  return localStorage.getItem(key) !== null
}

/**
 * Loads the saved data for the given key, applies an updater function to it, and saves the result back.
 * Does nothing if the key doesn't exist.
 * @param key The key of the saved data to update.
 * @param updater A function that receives the current value and returns the updated value.
 * @returns `true` if the data was updated successfully, `false` if the key doesn't exist or saving failed.
 * @example
 * // Increment a saved score by 100
 * facile.editSave('player', (player) => ({ ...player, score: player.score + 100 }));
 */
export function editSave<T>(key: string, updater: (current: T) => T): boolean {
  const current = load<T>(key)
  if (current === null) {
    return false
  }
  return save(key, updater(current))
}

/**
 * Returns the keys of all entries currently saved in local storage.
 * @returns An array of all saved keys.
 * @example
 * facile.save('player', { name: 'Alice' });
 * facile.save('settings', { volume: 0.8 });
 * facile.listSaves(); // ['player', 'settings']
 */
export function listSaves(): string[] {
  return Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i) as string)
}

/**
 * Clears local data.
 * @param key The key of the saved data. If not defined, clears all the saved data.
 * @returns Returns true if the key was valid and the data has been cleared successfully.
 * @example
 * facile.clearSave('player');
 */
export function clearSave(key?: string): boolean {
  // Clear the entire local storage if no key given
  if (!key) {
    localStorage.clear()
    return true
  }

  // Remove the named data if it exists
  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key)
    return true
  }
  return false
}
