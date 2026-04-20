import { describe, expect, it } from 'vitest'
import { copy, merge, omit, select } from '../src/object'

//#region copy()

describe('copy()', () => {
  it('returns an object equal to the original', () => {
    const original = { a: 1, b: 2 }
    expect(copy(original)).toEqual(original)
  })

  it('returns a new object, not the original', () => {
    const original = { a: 1 }
    expect(copy(original)).not.toBe(original)
  })

  it('deep clones nested objects', () => {
    const original = { a: { b: 1 } }
    const clone = copy(original)
    clone.a.b = 99
    expect(original.a.b).toBe(1)
  })

  it('deep clones nested arrays', () => {
    const original = { scores: [1, 2, 3] }
    const clone = copy(original)
    clone.scores.push(4)
    expect(original.scores).toEqual([1, 2, 3])
  })

  it('works with arrays', () => {
    const original = [1, 2, 3]
    const clone = copy(original)
    clone.push(4)
    expect(original).toEqual([1, 2, 3])
  })

  it('works with primitive values', () => {
    expect(copy(42)).toBe(42)
    expect(copy('hello')).toBe('hello')
  })
})

//#endregion

//#region merge()

describe('merge()', () => {
  it('returns a new object with properties from both objects', () => {
    expect(merge({ a: 1, b: 2 }, { b: 99, c: 3 })).toEqual({ a: 1, b: 99, c: 3 })
  })

  it('overrides matching properties with values from source', () => {
    expect(merge({ a: 1, b: 2 }, { b: 99 })).toEqual({ a: 1, b: 99 })
  })

  it('adds new properties from source by default', () => {
    const result = merge({ a: 1 }, { b: 2 } as { a?: number; b: number })
    expect(result).toHaveProperty('b', 2)
  })

  it('returns a new object, not the original', () => {
    const target = { a: 1 }
    expect(merge(target, { a: 2 })).not.toBe(target)
  })

  it('does not mutate the target', () => {
    const target = { a: 1, b: 2 }
    merge(target, { b: 99 })
    expect(target).toEqual({ a: 1, b: 2 })
  })

  describe('strict mode', () => {
    it('overrides existing properties', () => {
      expect(merge({ a: 1, b: 2 }, { b: 99 }, true)).toEqual({ a: 1, b: 99 })
    })

    it('does not add new properties from source', () => {
      const result = merge({ a: 1, b: 2 }, { b: 99, c: 3 } as { b?: number; c?: number }, true)
      expect(result).not.toHaveProperty('c')
    })

    it('leaves unmatched target properties unchanged', () => {
      const result = merge({ a: 1, b: 2 }, { c: 3 } as object, true)
      expect(result).toEqual({ a: 1, b: 2 })
    })
  })
})

//#endregion

//#region select()

describe('select()', () => {
  it('returns a new object with only the selected properties', () => {
    expect(select({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
  })

  it('returns a new object, not the original', () => {
    const obj = { a: 1, b: 2 }
    expect(select(obj, ['a'])).not.toBe(obj)
  })

  it('does not include properties not in the keys list', () => {
    const result = select({ a: 1, b: 2, c: 3 }, ['a'])
    expect(result).not.toHaveProperty('b')
    expect(result).not.toHaveProperty('c')
  })

  it('returns an empty object when keys list is empty', () => {
    expect(select({ a: 1, b: 2 }, [])).toEqual({})
  })

  it('works with a single key', () => {
    expect(select({ a: 1, b: 2 }, ['b'])).toEqual({ b: 2 })
  })
})

//#endregion

//#region omit()

describe('omit()', () => {
  it('returns a new object without the omitted properties', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 })
  })

  it('returns a new object, not the original', () => {
    const obj = { a: 1, b: 2 }
    expect(omit(obj, ['a'])).not.toBe(obj)
  })

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    omit(obj, ['b'])
    expect(obj).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('returns a copy of the object when keys list is empty', () => {
    expect(omit({ a: 1, b: 2 }, [])).toEqual({ a: 1, b: 2 })
  })

  it('can omit multiple properties', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 })
  })

  it('returns an empty object when all properties are omitted', () => {
    expect(omit({ a: 1, b: 2 }, ['a', 'b'])).toEqual({})
  })
})

//#endregion
