import { describe, expect, it } from "vitest";
import { random, randomDecimal } from "../src/random";

const ITERATIONS = 1000;

describe("random()", () => {
	it("returns 0 or 1 with no arguments", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = random();
			expect(result === 0 || result === 1).toBe(true);
		}
	});

	it("returns an integer in [0, max] for a positive max", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = random(5);
			expect(Number.isInteger(result)).toBe(true);
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThanOrEqual(5);
		}
	});

	it("returns an integer in [min, 0] for a negative max", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = random(-5);
			expect(Number.isInteger(result)).toBe(true);
			expect(result).toBeGreaterThanOrEqual(-5);
			expect(result).toBeLessThanOrEqual(0);
		}
	});

	it("returns an integer in [min, max]", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = random(1, 6);
			expect(Number.isInteger(result)).toBe(true);
			expect(result).toBeGreaterThanOrEqual(1);
			expect(result).toBeLessThanOrEqual(6);
		}
	});

	it("swaps bounds when min > max", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = random(6, 1);
			expect(result).toBeGreaterThanOrEqual(1);
			expect(result).toBeLessThanOrEqual(6);
		}
	});

	it("always returns 0 when max is 0", () => {
		expect(random(0)).toBe(0);
	});

	it("always returns n when min === max", () => {
		expect(random(4, 4)).toBe(4);
	});
});

describe("randomDecimal()", () => {
	it("returns a float in [0, 1) with no arguments", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = randomDecimal();
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThan(1);
		}
	});

	it("returns a float in [0, max) for a positive max", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = randomDecimal(5);
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThan(5);
		}
	});

	it("returns a float in [min, 0) for a negative max", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = randomDecimal(-5);
			expect(result).toBeGreaterThanOrEqual(-5);
			expect(result).toBeLessThanOrEqual(0);
		}
	});

	it("returns a float in [min, max)", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = randomDecimal(1, 6);
			expect(result).toBeGreaterThanOrEqual(1);
			expect(result).toBeLessThan(6);
		}
	});

	it("swaps bounds when min > max", () => {
		for (let i = 0; i < ITERATIONS; i++) {
			const result = randomDecimal(6, 1);
			expect(result).toBeGreaterThanOrEqual(1);
			expect(result).toBeLessThan(6);
		}
	});

	it("always returns 0 when max is 0", () => {
		expect(randomDecimal(0)).toBe(0);
	});

	it("result is never an integer (statistically)", () => {
		const results = Array.from({ length: ITERATIONS }, () =>
			randomDecimal(1, 6),
		);
		expect(results.some((r) => !Number.isInteger(r))).toBe(true);
	});
});
