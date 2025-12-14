/**
 * This script contains features related to math operations.
 * @module Maths
 */

/**
 * Clamps a given value between given minimum and maximum.
 * @param value The value to clamp.
 * @param min The minimum possible value (inclusive).
 * @param max The maximum possible value (inclusive).
 * @returns Returns the processed value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}