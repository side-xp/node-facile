/**
 * Returns a random integer between 0 and 1 (inclusive).
 * @overload
 * @returns Either `0` or `1`.
 * @example
 * random() // 0 or 1
 */
export function random(): number

/**
 * Returns a random integer between `0` and `max` (inclusive).
 * If `max` is negative, this function returns a random integer between `max` and `0`, both inclusive.
 * @param max The upper bound if positive, lower bound if negative.
 * @returns A random integer in the range `[0 ; max]` or `[max ; 0]`.
 * @example
 * random(3)   // 0, 1, 2, or 3
 * random(-3)  // -3, -2, -1, or 0
 */
export function random(max: number): number

/**
 * Returns a random integer between `min` and `max` (inclusive).
 * If `min` is greater than `max`, the values are swapped automatically.
 * @param min The lower bound (inclusive).
 * @param max The upper bound (inclusive).
 * @returns A random integer in the range `[min, max]`.
 * @example
 * random(1, 6)   // dice roll: 1, 2, 3, 4, 5, or 6
 * random(-5, 5)  // anywhere from -5 to 5
 * random(5, 1)   // same as random(1, 5) — bounds are swapped
 */
export function random(min: number, max: number): number

export function random(minOrMax?: number, max?: number): number {
  // If the function is used without argument, return either 0 or 1
  if (minOrMax === undefined) {
    return Math.floor(Math.random() * 2)
  }

  // If max is not defined, return a random value between [0 ; minOrMax] if the value is positive, or [minOrMax ; 0] if
  // the value is negative
  if (max === undefined) {
    const lowerBound = minOrMax >= 0 ? 0 : minOrMax
    const upperBound = minOrMax >= 0 ? minOrMax : 0
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
  }

  // Make sure that lowerBound is actually the minimum value, and upperBound is the maximum value
  const lowerBound = minOrMax <= max ? minOrMax : max
  const upperBound = minOrMax <= max ? max : minOrMax
  // Return a random value between [min ; max]
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
}
