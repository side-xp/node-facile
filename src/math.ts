/**
 * Features related to math operations.
 * @module Maths
 */

/**
 * Clamps a given value between given minimum and maximum.
 * @param value The value to clamp.
 * @param min The minimum possible value (inclusive).
 * @param max The maximum possible value (inclusive).
 * @returns Returns the processed value.
 * @example <caption>Clamp a value between 0 and 100</caption>
 * const value = 120;
 * const clampedValue = facile.clamp(0, 100);
 * console.log(clampedValue)
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}