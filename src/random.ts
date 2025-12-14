/**
 * Generates either 0 or 1.
 * @returns Returns the generated number.
 */
export function random(): number;

/**
 * Generates a random whole number between 0 and a given value.
 * @param value The value limit (minimum if negative, maximum if positive).
 * @returns Returns the generated whole number.
 */
export function random(value: number): number;

/**
 * Generates a random whole number between given minimum and maximum.
 * @param min The minimum possible value (inclusive).
 * @param max The maximum possible value (exclusive).
 * @returns Returns the generated whole number.
 */
export function random(min: number, max: number): number;

export function random(min?: number, max?: number): number {
  min = Number(min) || undefined;
  max = Number(max) || undefined;

  // If the funciton is used parameterless, will pick 0 or 1 at random
  if (min === undefined && max === undefined) {
    min = 0;
    max = 2;
  }
  // If the function is used with a single param, will generate a number between 0 and that max value
  // Note that if the given value is negative, min will be kept as is, and max will be 0
  else if (min !== undefined && max === undefined) {
    max = Math.max(min, 0);
    min = Math.min(min, max, 0);
  }
  // If min is not defined but max is, behave the same as the previous case
  else if (min === undefined && max !== undefined) {
    min = Math.min(0, max);
    max = Math.max(min, max, 0);
  }

  min = Math.ceil(min || 0);
  max = Math.floor(max || 0);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates a random decimal number between 0 and 1.
 * @returns Returns the generated decimal number.
 */
export function randomDecimal(): number;

/**
 * Generates a random decimal number between 0 and a given value.
 * @param value The value limit (minimum if negative, maximum if positive).
 * @returns Returns the generated decimal number.
 */
export function randomDecimal(value: number): number;

/**
 * Generates a random decimal number between given minimum and maximum.
 * @param min The minimum possible value (inclusive).
 * @param max The maximum possible value (exclusive).
 * @returns Returns the generated decimal number.
 */
export function randomDecimal(min: number, max: number): number;

export function randomDecimal(min?: number, max?: number): number {
  min = Number(min) || undefined;
  max = Number(max) || undefined;

  // If the funciton is used parameterless, will pick 0 or 1 at random
  if (min === undefined && max === undefined) {
    min = 0;
    max = 2;
  }
  // If the function is used with a single param, will generate a number between 0 and that max value
  // Note that if the given value is negative, min will be kept as is, and max will be 0
  else if (min !== undefined && max === undefined) {
    max = Math.max(min, 0);
    min = Math.min(min, max, 0);
  }
  // If min is not defined but max is, behave the same as the previous case
  else if (min === undefined && max !== undefined) {
    min = Math.min(0, max);
    max = Math.max(min, max, 0);
  }

  min = min || 0;
  max = max || 0;
  return Math.random() * (max - min) + min;
}