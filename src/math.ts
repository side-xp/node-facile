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

/**
 * Remaps a given value from a range to another range.
 * Note that if the input value is out of range, the remapped value will also be out of range.
 * @param value The value to remap.
 * @param fromMin The lower bound of the value's current range.
 * @param fromMax The upper bound of the value's current range.
 * @param toMin The lower bound of the value's target range.
 * @param toMax The upper bound of the value's target range.
 * @returns Returns the remapped value.
 * @example
 * console.log(facile.remap(5, 0, 10, 100, 200)) // Outputs 150
 * console.log(facile.remap(0, -10, 10, -100, 100)) // Outputs 0
 * console.log(facile.remap(-10, -10, 10, -100, 100)) // Outputs -100
 * console.log(facile.remap(10, -10, 10, -100, 100)) // Outputs 100
 * console.log(facile.remap(0, -10, 10, 100, 200)) // Outputs 150
 */
export function remap(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
  return fromMax - fromMin > 0
    ? (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin
    : 0;
}

/**
 * Remaps a given value from a range to a range between 0 and 1.
 * This function will clamp the output value between 0 and 1.
 * @param value The value to remap.
 * @param min The lower bound of the value's current range.
 * @param max The upper bound of the value's current range.
 * @returns Returns the remapped value, clamped between 0 and 1.
 */
export function ratio(value: number, min: number, max: number): number {
  return clamp(remap(value, min, max, 0, 1), 0, 1);
}

/**
 * Remaps a given value from a range to a range between 0 and 100.
 * Note that if the input value is out of range, the remapped value will also be out of range.
 * @param value The value to remap.
 * @param min The lower bound of the value's current range.
 * @param max The upper bound of the value's current range.
 * @returns Returns the remapped value.
 */
export function percents(value: number, min: number, max: number): number {
  return remap(value, min, max, 0, 100);
}