/**
 * Math utility functions.
 * @module Math
 */

/**
 * Rounds a number to a given number of decimal places.
 * @param value The number to round.
 * @param decimals The number of decimal places to round to. Defaults to `0`.
 * @returns The rounded number.
 * @example
 * roundTo(3.14159)     // 3 (rounds to integer by default)
 * roundTo(3.14159, 2)  // 3.14
 * roundTo(3.14159, 4)  // 3.1416
 * roundTo(1234.5, -2)  // 1200 (negative decimals round to tens, hundreds, etc.)
 */
export function roundTo(value: number, decimals = 0): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

/**
 * Clamps a number between a minimum and maximum value.
 * If `value` is below `min`, returns `min`. If above `max`, returns `max`. Otherwise returns `value` unchanged.
 * @param value The number to clamp.
 * @param min The lower bound.
 * @param max The upper bound.
 * @returns The clamped value.
 * @example
 * clamp(5, 0, 10)       // 5 (within range, unchanged)
 * clamp(-3, 0, 10)      // 0 (below min)
 * clamp(15, 0, 10)      // 10 (above max)
 * clamp(0.5, 0, 1)      // 0.5
 * clamp(-0.5, 0, 1)     // 0
 * clamp(1.5, 0, 1)      // 1
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
