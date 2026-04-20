import { describe, expect, it } from 'vitest'
import { pick, shuffle, unique } from '../src/collection'

const ITERATIONS = 1000

//#region pick()

describe('pick()', () => {
  describe('array', () => {
    it('returns null for an empty array', () => {
      expect(pick([])).toBeNull()
    })

    it('always returns the only element of a single-item array', () => {
      expect(pick(['A'])).toBe('A')
    })

    it('returns an element belonging to the array', () => {
      const array = ['A', 'B', 'C']
      for (let i = 0; i < ITERATIONS; i++) {
        expect(array).toContain(pick(array))
      }
    })

    it('can return every element of the array (statistically)', () => {
      const array = ['A', 'B', 'C']
      const results = new Set(Array.from({ length: ITERATIONS }, () => pick(array)))
      expect(results.size).toBe(array.length)
    })
  })

  describe('Set', () => {
    it('returns null for an empty Set', () => {
      expect(pick(new Set())).toBeNull()
    })

    it('always returns the only element of a single-item Set', () => {
      expect(pick(new Set(['A']))).toBe('A')
    })

    it('returns an element belonging to the Set', () => {
      const set = new Set(['A', 'B', 'C'])
      for (let i = 0; i < ITERATIONS; i++) {
        expect(set.has(pick(set) as string)).toBe(true)
      }
    })
  })

  describe('Map', () => {
    it('returns null for an empty Map', () => {
      expect(pick(new Map())).toBeNull()
    })

    it('always returns the only value of a single-item Map', () => {
      expect(pick(new Map([[1, 'A']]))).toBe('A')
    })

    it('returns a value belonging to the Map', () => {
      const map = new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
      ])
      const values = Array.from(map.values())
      for (let i = 0; i < ITERATIONS; i++) {
        expect(values).toContain(pick(map))
      }
    })
  })
})

//#endregion

//#region unique()

describe('unique()', () => {
  it('returns a new array with duplicate values removed', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
  })

  it('preserves the order of first occurrences', () => {
    expect(unique(['b', 'a', 'b', 'c', 'a'])).toEqual(['b', 'a', 'c'])
  })

  it('returns the array unchanged when all values are already unique', () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('returns an empty array unchanged', () => {
    expect(unique([])).toEqual([])
  })

  it('works with a single-element array', () => {
    expect(unique([42])).toEqual([42])
  })

  it('works with strings', () => {
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('returns a new array, not the original', () => {
    const original = [1, 2, 3]
    expect(unique(original)).not.toBe(original)
  })
})

//#endregion

//#region shuffle()

describe('shuffle()', () => {
  it('does nothing to an empty array', () => {
    const array: string[] = []
    shuffle(array)
    expect(array).toEqual([])
  })

  it('does nothing to a single-item array', () => {
    const array = ['A']
    shuffle(array)
    expect(array).toEqual(['A'])
  })

  it('mutates the original array', () => {
    const array = ['A', 'B', 'C']
    const ref = array
    shuffle(array)
    expect(array).toBe(ref)
  })

  it('preserves all original elements', () => {
    const array = ['A', 'B', 'C', 'D', 'E']
    const original = [...array]
    shuffle(array)
    expect(array).toHaveLength(original.length)
    expect(array.toSorted()).toEqual(original.toSorted())
  })

  it('produces a different order at least once (statistically)', () => {
    const original = ['A', 'B', 'C', 'D', 'E']
    const results = Array.from({ length: ITERATIONS }, () => {
      const array = [...original]
      shuffle(array)
      return array.join('')
    })
    expect(results.some((r) => r !== original.join(''))).toBe(true)
  })

  it('can produce every position for every element (statistically)', () => {
    const original = ['A', 'B', 'C']
    const positionSets = [new Set<string>(), new Set<string>(), new Set<string>()]
    for (let i = 0; i < ITERATIONS; i++) {
      const array = [...original]
      shuffle(array)
      array.forEach((item, index) => {
        positionSets[index].add(item)
      })
    }
    for (const positions of positionSets) {
      expect(positions.size).toBe(original.length)
    }
  })
})

//#endregion
