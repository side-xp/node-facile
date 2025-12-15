/**
 * Features related to random calculations.
 * @module Random
 */

/**
 * Generates either 0 or 1.
 * @returns Returns the generated number.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN - Math.random()}
 * @example
 * const randomValue = facile.random();
 * console.log(randomValue);
 */
export function random(): number;

/**
 * Generates a random whole number between 0 and a given value.
 * @param value The value limit (minimum if negative, maximum if positive).
 * @returns Returns the generated whole number.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN - Math.random()}
 * @example
 * const randomValue = facile.random(10);
 * console.log(randomValue);
 */
export function random(value: number): number;

/**
 * Generates a random whole number between given minimum and maximum.
 * @param min The minimum possible value (inclusive).
 * @param max The maximum possible value (exclusive).
 * @returns Returns the generated whole number.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN - Math.random()}
 * @example
 * const randomValue = facile.random(10, 20 + 1);
 * console.log(randomValue);
 */
export function random(min: number, max: number): number;

export function random(min?: number, max?: number): number {
  min = Number(min) || undefined;
  max = Number(max) || undefined;

  // If the funciton is used parameterless, will pick 0 or 1 at random
  if (min === undefined && max === undefined) {
    min = 0;
    max = 2;
  }
  // If the function is used with a single param, will generate a number between 0 and that max value
  // Note that if the given value is negative, min will be kept as is, and max will be 0
  else if (min !== undefined && max === undefined) {
    max = Math.max(min, 0);
    min = Math.min(min, max, 0);
  }
  // If min is not defined but max is, behave the same as the previous case
  else if (min === undefined && max !== undefined) {
    min = Math.min(0, max);
    max = Math.max(min, max, 0);
  }

  min = Math.ceil(min || 0);
  max = Math.floor(max || 0);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates a random decimal number between 0 and 1.
 * @returns Returns the generated decimal number.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN - Math.random()}
 * @example
 * const randomValue = facile.randomDecimal();
 * console.log(randomValue);
 */
export function randomDecimal(): number;

/**
 * Generates a random decimal number between 0 and a given value.
 * @param value The value limit (minimum if negative, maximum if positive).
 * @returns Returns the generated decimal number.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN - Math.random()}
 * @example
 * const randomValue = facile.randomDecimal(10);
 * console.log(randomValue);
 */
export function randomDecimal(value: number): number;

/**
 * Generates a random decimal number between given minimum and maximum.
 * @param min The minimum possible value (inclusive).
 * @param max The maximum possible value (exclusive).
 * @returns Returns the generated decimal number.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN - Math.random()}
 * @example
 * const randomValue = facile.randomDecimal(10, 20);
 * console.log(randomValue);
 */
export function randomDecimal(min: number, max: number): number;

export function randomDecimal(min?: number, max?: number): number {
  min = Number(min) || undefined;
  max = Number(max) || undefined;

  // If the funciton is used parameterless, will pick 0 or 1 at random
  if (min === undefined && max === undefined) {
    min = 0;
    max = 2;
  }
  // If the function is used with a single param, will generate a number between 0 and that max value
  // Note that if the given value is negative, min will be kept as is, and max will be 0
  else if (min !== undefined && max === undefined) {
    max = Math.max(min, 0);
    min = Math.min(min, max, 0);
  }
  // If min is not defined but max is, behave the same as the previous case
  else if (min === undefined && max !== undefined) {
    min = Math.min(0, max);
    max = Math.max(min, max, 0);
  }

  min = min || 0;
  max = max || 0;
  return Math.random() * (max - min) + min;
}

/**
 * Evaluates a given chance value at random on a range.
 * @param threshold The chance amount from 0.
 * @param max The maximum random value.
 * @returns Returns true if the chance value is lower or equal to a random value.
 * @example <caption>Evaluate 75% chance to attack</caption>
 * const willAttack = chance(75, 100);
 * @example <caption>Evaluate 1/3 chance to miss</caption>
 * const willMiss = chance(1, 3);
 */
export function chance(threshold: number, max = 1): boolean {
  max = Math.abs(max);
  const randomValue = randomDecimal(0, max);
  return threshold <= randomValue;
}

/**
 * Picks an item at random from a collection.
 * @param array The collection from which the item will be picked.
 * @returns Returns the picked item or null if the collection is empty.
 * @example
 * const arr = [ 'A', 'B', 'C' ];
 * const randomItem = facile.pick(arr);
 * console.log(randomItem);
 */
export function pick<T>(array: readonly T[]): T | null;

/**
 * Picks an item at random from a collection.
 * @param set The collection from which the item will be picked.
 * @returns Returns the picked item or null if the collection is empty.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set|MDN - Set}
 * @example
 * const collection = new Set();
 * collection.add('A');
 * collection.add('B');
 * collection.add('C');
 * const randomItem = facile.pick(collection);
 * console.log(randomItem);
 */
export function pick<T>(set: Set<T>): T | null;

/**
 * Picks an item at random from a collection.
 * @param map The collection from which the item will be picked.
 * @returns Returns the picked item or null if the collection is empty.
 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map|MDN - Map}
 * @example
 * const collection = new Map();
 * collection.set(1, 'A');
 * collection.set(2, 'B');
 * collection.set(3, 'C');
 * const randomValue = facile.pick(collection);
 * console.log(randomValue);
 */
export function pick<K, V>(map: Map<K, V>): V | null;

export function pick<T>(collection: Iterable<T>): T | null {
  const items = collection instanceof Map
    ? Array.from(collection.values())
    : Array.from(collection);

  if (items.length <= 0) {
    return null;
  }

  const randomIndex = random(items.length);
  return items[randomIndex];
}

/**
 * Shuffles the items of an array in-place (modifing the source array).
 * @param array The collection to shuffle.
 * @example
 * const arr = [ 'A', 'B', 'C' ];
 * facile.shuffle(arr);
 * console.log(arr);
 */
export function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}