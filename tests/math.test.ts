import { describe, expect, it } from 'vitest'
import { clamp, roundTo } from '../src/math'

describe('roundTo()', () => {
  it('rounds to integer by default', () => {
    expect(roundTo(8.34136)).toBe(8)
    expect(roundTo(3.7)).toBe(4)
  })

  it('rounds to the given number of decimal places', () => {
    expect(roundTo(7.18845, 2)).toBe(7.19)
    expect(roundTo(4.19867, 4)).toBe(4.1987)
  })

  it('rounds to tens, hundreds, etc. with negative decimals', () => {
    expect(roundTo(1234.5, -2)).toBe(1200)
    expect(roundTo(1274.5, -2)).toBe(1300)
  })

  it('returns the value unchanged when decimals exceed its precision', () => {
    expect(roundTo(3.14, 5)).toBe(3.14)
  })

  it('handles zero and negative values', () => {
    expect(roundTo(0, 2)).toBe(0)
    expect(roundTo(-6.48216, 2)).toBe(-6.48)
  })

  it('handles integers', () => {
    expect(roundTo(42, 2)).toBe(42)
  })
})

describe('clamp()', () => {
  it('returns value unchanged when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(0.5, 0, 1)).toBe(0.5)
  })

  it('returns min when value is below range', () => {
    expect(clamp(-3, 0, 10)).toBe(0)
    expect(clamp(-0.5, 0, 1)).toBe(0)
  })

  it('returns max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(1.5, 0, 1)).toBe(1)
  })

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0)
  })

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('works with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5)
    expect(clamp(0, -10, -1)).toBe(-1)
    expect(clamp(-15, -10, -1)).toBe(-10)
  })
})
