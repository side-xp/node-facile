import { describe, expect, it } from 'vitest'
import { capitalize, occurrences, slugify, truncate } from '../src/string'

//#region capitalize()

describe('capitalize()', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('does not affect the rest of the string', () => {
    expect(capitalize('hello world')).toBe('Hello world')
  })

  it('has no effect when the first letter is already uppercase', () => {
    expect(capitalize('Hello')).toBe('Hello')
  })

  it('returns an empty string unchanged', () => {
    expect(capitalize('')).toBe('')
  })

  it('works with a single character', () => {
    expect(capitalize('a')).toBe('A')
  })
})

//#endregion

//#region truncate()

describe('truncate()', () => {
  it('returns the string unchanged when it fits within maxLength', () => {
    expect(truncate('Hi', 8)).toBe('Hi')
  })

  it('returns the string unchanged when it equals maxLength exactly', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })

  it('truncates and appends an ellipsis when the string exceeds maxLength', () => {
    expect(truncate('Hello, World!', 8)).toBe('Hello, …')
  })

  it('the ellipsis counts toward maxLength', () => {
    expect(truncate('Hello, World!', 8).length).toBe(8)
  })

  it('returns only the ellipsis when maxLength is 1', () => {
    expect(truncate('Hello, World!', 1)).toBe('…')
  })

  it('returns an empty string unchanged', () => {
    expect(truncate('', 5)).toBe('')
  })
})

//#endregion

//#region slugify()

describe('slugify()', () => {
  it('replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips accented characters to their base letter', () => {
    expect(slugify('Héllo Wörld')).toBe('hello-world')
    expect(slugify('café résumé')).toBe('cafe-resume')
    expect(slugify('naïve')).toBe('naive')
  })

  it('removes emojis', () => {
    expect(slugify('hello 🌍 world')).toBe('hello-world')
    expect(slugify('hi 👋')).toBe('hi')
  })

  it('replaces special characters with underscores', () => {
    expect(slugify('foo@bar')).toBe('foo_bar')
    expect(slugify('hello!')).toBe('hello')
    expect(slugify('foo-bar')).toBe('foo-bar')
  })

  it('collapses multiple spaces into a single hyphen', () => {
    expect(slugify('foo   bar')).toBe('foo-bar')
  })

  it('collapses consecutive underscores into one', () => {
    expect(slugify('foo@@bar')).toBe('foo_bar')
    expect(slugify('foo!!bar')).toBe('foo_bar')
  })

  it('collapses mixed separators containing a hyphen into a single hyphen', () => {
    expect(slugify('foo @ bar')).toBe('foo-bar')
    expect(slugify('price: $5')).toBe('price-5')
  })

  it('removes leading and trailing separators', () => {
    expect(slugify('  leading')).toBe('leading')
    expect(slugify('trailing  ')).toBe('trailing')
    expect(slugify('  both  ')).toBe('both')
    expect(slugify('!hello!')).toBe('hello')
  })

  it('returns an empty string for separator-only input', () => {
    expect(slugify('---')).toBe('')
    expect(slugify('   ')).toBe('')
    expect(slugify('!!!')).toBe('')
  })

  it('returns an empty string unchanged', () => {
    expect(slugify('')).toBe('')
  })

  it('preserves numbers', () => {
    expect(slugify('version 2')).toBe('version-2')
    expect(slugify('v2.0')).toBe('v2_0')
  })
})

//#endregion

//#region occurrences()

describe('occurrences()', () => {
  it('counts occurrences of a substring', () => {
    expect(occurrences('banana', 'a')).toBe(3)
    expect(occurrences('banana', 'an')).toBe(2)
  })

  it('returns 0 when the pattern is not found', () => {
    expect(occurrences('hello', 'xyz')).toBe(0)
  })

  it('counts non-overlapping occurrences', () => {
    expect(occurrences('aaa', 'aa')).toBe(1)
  })

  it('returns 0 for an empty pattern', () => {
    expect(occurrences('hello', '')).toBe(0)
  })

  it('returns 0 when searching an empty string', () => {
    expect(occurrences('', 'a')).toBe(0)
  })

  it('counts occurrences using a regular expression', () => {
    expect(occurrences('test', /t/)).toBe(2)
  })

  it('adds the global flag automatically when not present', () => {
    expect(occurrences('banana', /a/)).toBe(3)
  })

  it('respects flags on the provided regex', () => {
    expect(occurrences('Hello hello', /hello/i)).toBe(2)
  })

  it('counts full word matches with word boundaries', () => {
    expect(occurrences('cat catfish scat', /\bcat\b/)).toBe(1)
  })
})

//#endregion
