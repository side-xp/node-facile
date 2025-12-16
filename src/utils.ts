/**
 * Miscellaneous functions for conversions, checks and common operations.
 * @module Utilities
 */

/**
 * Converts a value into a number.
 * @param value The value to convert.
 * @returns Returns the converted value, or 0 if the value is not valid.
 * @example
 * console.log(facile.toNumber(12)); // Outputs 12
 * console.log(facile.toNumber(12.34)); // Outputs 12.34
 * console.log(facile.toNumber('12,34')); // Outputs 12.34
 * console.log(facile.toNumber('12')); // Outputs 12
 * console.log(facile.toNumber('12ABC')); // Outputs 12
 * console.log(facile.toNumber('ABC')); // Outputs 0
 * console.log(facile.toNumber(true)); // Outputs 1
 * console.log(facile.toNumber(undefined)); // Outputs 0
 * console.log(facile.toNumber(null)); // Outputs 0
 */
export function toNumber(value: any): number {
  if (typeof value === 'string') {
    value = value.replaceAll(',', '.');
  }
  return Number(value) || 0;
}

/**
 * Checks if a given value is a number.
 * @param value The value to check.
 * @returns Returns true if the given value is a number.
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number';
}

/**
 * Checks if a given value is a string.
 * @param value The value to check.
 * @returns Returns true if the given value is a string.
 */
export function isString(value: any): boolean {
  return typeof value === 'string';
}

/**
 * Checks if a given value is a boolean.
 * @param value The value to check.
 * @returns Returns true if the given value is a boolean.
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a given string is invalid or empty.
 * @param text The string to check.
 * @returns Returns true if the given string is not valid or empty.
 */
export function isEmpty(text: string | undefined | null): boolean {
  if (!text) {
    return true;
  }
  return !text.trim();
}