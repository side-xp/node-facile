/**
 * Functions for working with arrays and collections.
 * @module Collection
 */

import { random } from './random'

/**
 * Picks an item at random from an array.
 * @param array The array from which the item will be picked.
 * @returns Returns the picked item or null if the array is empty.
 * @example
 * pick(['A', 'B', 'C'])  // "A", "B" or "C"
 */
export function pick<T>(array: readonly T[]): T | null

/**
 * Picks an item at random from a collection.
 * @param set The collection from which the item will be picked.
 * @returns Returns the picked item or null if the collection is empty.
 * @example
 * const collection = new Set()
 * collection.add('A')
 * collection.add('B')
 * collection.add('C')
 * pick(collection)  // "A", "B" or "C"
 */
export function pick<T>(set: Set<T>): T | null

/**
 * Picks an item at random from a collection.
 * @param map The collection from which the item will be picked.
 * @returns Returns the picked item or null if the collection is empty.
 * @example
 * const collection = new Map()
 * collection.set(1, 'A')
 * collection.set(2, 'B')
 * collection.set(3, 'C')
 * pick(collection)  // "A", "B" or "C"
 */
export function pick<K, V>(map: Map<K, V>): V | null

export function pick<T>(collection: Iterable<T>): T | null {
  const items = collection instanceof Map ? Array.from(collection.values()) : Array.from(collection)

  if (items.length <= 0) {
    return null
  }

  const randomIndex = random(items.length - 1)
  return items[randomIndex]
}

/**
 * Shuffles the items of an array in-place (modifing the source array).
 * @param array The array to shuffle.
 * @example
 * const arr = [ 'A', 'B', 'C' ]
 * shuffle(arr) // eg. [ 'C', 'A', 'B' ]
 */
export function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i] as T
    array[i] = array[j] as T
    array[j] = temp
  }
}
