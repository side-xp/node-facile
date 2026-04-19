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

/**
 * Linearly interpolates between two numbers.
 * @param from The start value (returned when `t` is `0`).
 * @param to The end value (returned when `t` is `1`).
 * @param t The interpolation factor.
 * @param clampT Whether to clamp `t` to the range `[0, 1]`. Defaults to `true`.
 * @returns The interpolated value.
 * @example
 * lerp(0, 10, 0.5)      // 5
 * lerp(0, 10, 0)        // 0
 * lerp(0, 10, 1)        // 10
 * lerp(0, 10, 2)        // 10 (t is clamped by default)
 * lerp(0, 10, 2, false) // 20 (t is not clamped)
 */
export function lerp(from: number, to: number, t: number, clampT = true): number {
  const factor = clampT ? clamp(t, 0, 1) : t
  return from + (to - from) * factor
}

/**
 * Returns the sum of all numbers in an array. Returns `0` for an empty array.
 * @param numbers The array of numbers to sum.
 * @returns The sum of all numbers.
 * @example
 * sum([1, 2, 3])  // 6
 * sum([])         // 0
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0)
}

/**
 * Returns the average (arithmetic mean) of all numbers in an array.
 * Returns `NaN` for an empty array.
 * @param numbers The array of numbers to average.
 * @returns The average value, or `NaN` if the array is empty.
 * @example
 * average([1, 2, 3])  // 2
 * average([5])        // 5
 * average([])         // NaN
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return NaN
  return sum(numbers) / numbers.length
}
