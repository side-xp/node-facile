/**
 * General-purpose utility functions.
 * @module Utils
 */

//#region Conversion

/**
 * Converts a value to a number, treating commas as decimal separators.
 * @param value The value to convert.
 * @returns The numeric value, or `NaN` if the conversion fails.
 * @example
 * toNumber(12)       // 12
 * toNumber('3.14')   // 3.14
 * toNumber('3,14')   // 3.14
 * toNumber('abc')    // NaN
 */
export function toNumber(value: unknown): number {
  if (typeof value === 'string') {
    return Number(value.replace(',', '.'))
  }
  return Number(value)
}

//#endregion

//#region Validation

/**
 * Checks whether a value is a valid number.
 * Unlike `typeof`, this returns `false` for `NaN`.
 * @param value The value to check.
 * @returns `true` if the value is a number and not `NaN`, `false` otherwise.
 * @example
 * isNumber(12)     // true
 * isNumber(3.14)   // true
 * isNumber(NaN)    // false
 * isNumber('12')   // false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * Checks whether a value is a string.
 * @param value The value to check.
 * @returns `true` if the value is a string, `false` otherwise.
 * @example
 * isString('hello')   // true
 * isString('')        // true
 * isString(42)        // false
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Checks whether a value is a boolean.
 * @param value The value to check.
 * @returns `true` if the value is a boolean, `false` otherwise.
 * @example
 * isBoolean(true)    // true
 * isBoolean(false)   // true
 * isBoolean(0)       // false
 * isBoolean('true')  // false
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * Checks whether a value is empty.
 * Returns `true` for `null`, `undefined`, or a string containing only whitespace.
 * @param value The value to check.
 * @returns `true` if the value is empty, `false` otherwise.
 * @example
 * isEmpty(null)        // true
 * isEmpty(undefined)   // true
 * isEmpty('')          // true
 * isEmpty('   ')       // true
 * isEmpty('hello')     // false
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  return false
}

//#endregion
