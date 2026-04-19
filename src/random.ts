//#region random()

/**
 * Returns a random integer between 0 and 1 (inclusive).
 * @returns Either `0` or `1`.
 * @example
 * random() // 0 or 1
 */
export function random(): number;

/**
 * Returns a random integer between `0` and `max` (inclusive).
 * If `max` is negative, this function returns a random integer between `max` and `0`, both inclusive.
 * @param max The upper bound if positive, lower bound if negative.
 * @returns A random integer in the range `[0 ; max]` or `[max ; 0]`.
 * @example
 * random(3)   // 0, 1, 2, or 3
 * random(-3)  // -3, -2, -1, or 0
 */
export function random(max: number): number;

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
export function random(min: number, max: number): number;

export function random(minOrMax?: number, max?: number): number {
	// If the function is used without argument, return either 0 or 1
	if (minOrMax === undefined) {
		return Math.floor(Math.random() * 2);
	}

	// If max is not defined, return a random value between [0 ; minOrMax] if the value is positive, or [minOrMax ; 0] if
	// the value is negative
	if (max === undefined) {
		const lowerBound = minOrMax >= 0 ? 0 : minOrMax;
		const upperBound = minOrMax >= 0 ? minOrMax : 0;
		return (
			Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
		);
	}

	// Make sure that lowerBound is actually the minimum value, and upperBound is the maximum value
	const lowerBound = minOrMax <= max ? minOrMax : max;
	const upperBound = minOrMax <= max ? max : minOrMax;
	// Return a random value between [min ; max]
	return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

//#endregion

//#region randomDecimal()

/**
 * Returns a random decimal number between `0` and `1`.
 * @returns A floating-point number in the range `[0, 1)`.
 * @example
 * randomDecimal() // eg. 0.4012
 */
export function randomDecimal(): number;

/**
 * Returns a random decimal number between `0` and `max`.
 * If `max` is negative, this function returns a random decimal between `max` and `0`.
 * @param max The upper bound if positive, lower bound if negative.
 * @returns A floating-point number in the range `[0, max)` or `(max, 0]`.
 * @example
 * randomDecimal(3)   // eg. 2.7182
 * randomDecimal(-3)  // eg. -1.1415
 */
export function randomDecimal(max: number): number;

/**
 * Returns a random decimal number between `min` and `max`.
 * If `min` is greater than `max`, the values are swapped automatically.
 * @param min The lower bound.
 * @param max The upper bound.
 * @returns A floating-point number in the range `[min, max)`.
 * @example
 * randomDecimal(1, 3)   // eg. 2.5318
 * randomDecimal(-3, 3)  // eg. -1.2041
 * randomDecimal(3, 1)   // same as randomDecimal(1, 3)
 */
export function randomDecimal(min: number, max: number): number;

export function randomDecimal(minOrMax?: number, max?: number): number {
	if (minOrMax === undefined) {
		return Math.random();
	}

	if (max === undefined) {
		const lowerBound = minOrMax >= 0 ? 0 : minOrMax;
		const upperBound = minOrMax >= 0 ? minOrMax : 0;
		return Math.random() * (upperBound - lowerBound) + lowerBound;
	}

	const lowerBound = minOrMax <= max ? minOrMax : max;
	const upperBound = minOrMax <= max ? max : minOrMax;
	return Math.random() * (upperBound - lowerBound) + lowerBound;
}

//#endregion

//#region chance()

/**
 * Evaluates a probability and returns `true` or `false` accordingly.
 * @param probability A value between `0` and `1` representing the probability (eg. `0.75` for 75%).
 * @returns `true` if the chance is met, `false` otherwise.
 * @example
 * chance(0.75)   // true 75% of the time
 * chance(0)      // always false
 * chance(1)      // always true
 * chance(-1)     // always false, chance is evaluated between `0` and `1`
 * chance(75)     // always true, values higher than `1` always produce a positive output
 */
export function chance(probability: number): boolean;

/**
 * Evaluates a probability expressed as a fraction and returns `true` or `false` accordingly.
 * @param favorable The number of favorable outcomes.
 * @param total The total number of outcomes.
 * @returns `true` if the chance is met, `false` otherwise.
 * @example
 * chance(1, 3)     // true 1 time out of 3
 * chance(3, 4)     // true 3 times out of 4
 * chance(0.75, 1)  // same as chance(0.75) with a single parameter
 * chance(0, 0)     // always false
 * chance(20, 0)    // always false
 */
export function chance(favorable: number, total: number): boolean;

export function chance(
	probabilityOrFavorable: number,
	total?: number,
): boolean {
	if (total === undefined) {
		return randomDecimal() < probabilityOrFavorable;
	}

	if (total === 0) {
		return false;
	}

	return randomDecimal() < probabilityOrFavorable / total;
}

//#endregion
