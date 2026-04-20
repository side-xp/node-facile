import { describe, expect, it } from 'vitest'
import { isBoolean, isEmpty, isNumber, isString, toNumber } from '../src/utils'

describe('toNumber()', () => {
  it('returns a number unchanged', () => {
    expect(toNumber(42)).toBe(42)
    expect(toNumber(3.14)).toBe(3.14)
    expect(toNumber(0)).toBe(0)
  })

  it('converts a numeric string', () => {
    expect(toNumber('42')).toBe(42)
    expect(toNumber('3.14')).toBe(3.14)
  })

  it('converts a comma-separated decimal string', () => {
    expect(toNumber('3,14')).toBe(3.14)
    expect(toNumber('1,5')).toBe(1.5)
  })

  it('returns NaN for non-numeric strings', () => {
    expect(toNumber('abc')).toBeNaN()
    expect(toNumber('')).not.toBeNaN()
  })

  it('converts booleans', () => {
    expect(toNumber(true)).toBe(1)
    expect(toNumber(false)).toBe(0)
  })

  it('returns NaN for undefined', () => {
    expect(toNumber(undefined)).toBeNaN()
  })
})

describe('isNumber()', () => {
  it('returns true for integers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(42)).toBe(true)
    expect(isNumber(-7)).toBe(true)
  })

  it('returns true for floats', () => {
    expect(isNumber(3.14)).toBe(true)
  })

  it('returns true for Infinity', () => {
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
  })

  it('returns false for NaN', () => {
    expect(isNumber(NaN)).toBe(false)
  })

  it('returns false for non-number types', () => {
    expect(isNumber('42')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(true)).toBe(false)
  })
})

describe('isString()', () => {
  it('returns true for strings', () => {
    expect(isString('hello')).toBe(true)
    expect(isString('')).toBe(true)
  })

  it('returns false for non-string types', () => {
    expect(isString(42)).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
  })
})

describe('isBoolean()', () => {
  it('returns true for booleans', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('returns false for non-boolean types', () => {
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
  })
})

describe('isEmpty()', () => {
  it('returns true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it('returns true for an empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('returns true for a whitespace-only string', () => {
    expect(isEmpty('   ')).toBe(true)
    expect(isEmpty('\t\n')).toBe(true)
  })

  it('returns false for a non-empty string', () => {
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty('  hello  ')).toBe(false)
  })

  it('returns false for non-string values', () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })
})
