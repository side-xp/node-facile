/**
 * Utility functions for working with objects.
 * @module Object
 */

/**
 * Returns a deep clone of the given object. The clone is fully independent — modifying it
 * will not affect the original.
 * @param obj The object to clone.
 * @returns A deep clone of the object.
 * @example
 * const original = { name: 'Alice', scores: [1, 2, 3] }
 * const clone = copy(original)
 * clone.scores.push(4)
 * console.log(original.scores) // [1, 2, 3] — unchanged
 */
export function copy<T>(obj: T): T {
  return structuredClone(obj)
}

/**
 * Merges the properties of `source` into `target` and returns the result as a new object.
 * By default, properties present in `source` but not in `target` are added to the result. When `strict` is `true`,
 * only properties that already exist in `target` are updated, and no new properties are added.
 * @param target The base object.
 * @param source The object whose properties are merged into `target`.
 * @param strict When `true`, only existing properties of `target` are updated. Defaults to `false`.
 * @returns A new object with the merged properties.
 * @example
 * merge({ a: 1, b: 2 }, { b: 99, c: 3 })              // { a: 1, b: 99, c: 3 }
 * merge({ a: 1, b: 2 }, { b: 99, c: 3 }, true)        // { a: 1, b: 99 }
 */
export function merge<T extends object>(
  target: T,
  source: Partial<T> & Record<string, unknown>,
  strict?: false,
): T & Record<string, unknown>

/**
 * Merges the properties of `source` into `target` and returns the result as a new object.
 * Only properties that already exist in `target` are updated — no new properties are added.
 * @param target The base object.
 * @param source The object whose properties are merged into `target`.
 * @param strict Must be `true` to restrict merging to existing properties only.
 * @returns A new object with only the existing properties of `target` updated.
 * @example
 * merge({ a: 1, b: 2 }, { b: 99, c: 3 }, true)  // { a: 1, b: 99 }
 */
export function merge<T extends object>(target: T, source: Partial<T>, strict: true): T

export function merge<T extends object>(target: T, source: Partial<T> & Record<string, unknown>, strict = false): T {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (!strict || key in target) {
      ;(result as Record<string, unknown>)[key] = source[key]
    }
  }
  return result
}

/**
 * Returns a new object containing only the specified properties of the given object.
 * @param obj The source object.
 * @param keys The property names to include.
 * @returns A new object with only the selected properties.
 * @example
 * select({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // { a: 1, c: 3 }
 */
export function select<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    result[key] = obj[key]
  }
  return result
}

/**
 * Returns a new object with the specified properties removed.
 * @param obj The source object.
 * @param keys The property names to exclude.
 * @returns A new object without the omitted properties.
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b'])  // { a: 1, c: 3 }
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}
