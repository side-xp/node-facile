import { afterEach, describe, expect, it } from 'vitest'
import { clearSave, editSave, hasSave, listSaves, load, save } from '../../src/save'

afterEach(() => {
  localStorage.clear()
})

//#region save()

describe('save()', () => {
  it('returns true when the data is saved successfully', () => {
    expect(save('key', 'value')).toBe(true)
  })

  it('saves a string value', () => {
    save('key', 'hello')
    expect(localStorage.getItem('key')).toBe('"hello"')
  })

  it('saves a number value', () => {
    save('key', 42)
    expect(localStorage.getItem('key')).toBe('42')
  })

  it('saves an object as JSON', () => {
    save('player', { name: 'Alice', score: 100 })
    expect(localStorage.getItem('player')).toBe('{"name":"Alice","score":100}')
  })

  it('overwrites an existing entry', () => {
    save('key', 'first')
    save('key', 'second')
    expect(localStorage.getItem('key')).toBe('"second"')
  })
})

//#endregion

//#region load()

describe('load()', () => {
  it('returns the saved value', () => {
    save('key', 'hello')
    expect(load('key')).toBe('hello')
  })

  it('returns a saved object', () => {
    save('player', { name: 'Alice', score: 100 })
    expect(load('player')).toEqual({ name: 'Alice', score: 100 })
  })

  it('returns null when the key does not exist', () => {
    expect(load('nonexistent')).toBeNull()
  })

  it('returns the default value when the key does not exist', () => {
    expect(load('nonexistent', 0)).toBe(0)
  })

  it('does not return the default value when the key exists', () => {
    save('key', 42)
    expect(load('key', 0)).toBe(42)
  })
})

//#endregion

//#region hasSave()

describe('hasSave()', () => {
  it('returns true when the key exists', () => {
    save('key', 'value')
    expect(hasSave('key')).toBe(true)
  })

  it('returns false when the key does not exist', () => {
    expect(hasSave('nonexistent')).toBe(false)
  })

  it('returns false after the key has been cleared', () => {
    save('key', 'value')
    clearSave('key')
    expect(hasSave('key')).toBe(false)
  })
})

//#endregion

//#region editSave()

describe('editSave()', () => {
  it('updates the saved value using the updater function', () => {
    save('score', 10)
    editSave<number>('score', (n) => n + 5)
    expect(load('score')).toBe(15)
  })

  it('works with objects', () => {
    save('player', { name: 'Alice', score: 100 })
    editSave<{ name: string; score: number }>('player', (p) => ({ ...p, score: p.score + 50 }))
    expect(load('player')).toEqual({ name: 'Alice', score: 150 })
  })

  it('returns true when the update succeeds', () => {
    save('key', 'value')
    expect(editSave<string>('key', (v) => v.toUpperCase())).toBe(true)
  })

  it('returns false when the key does not exist', () => {
    expect(editSave('nonexistent', (v) => v)).toBe(false)
  })

  it('does not create a new entry when the key does not exist', () => {
    editSave('nonexistent', (v) => v)
    expect(hasSave('nonexistent')).toBe(false)
  })
})

//#endregion

//#region listSaves()

describe('listSaves()', () => {
  it('returns an empty array when nothing is saved', () => {
    expect(listSaves()).toEqual([])
  })

  it('returns the keys of all saved entries', () => {
    save('player', 'Alice')
    save('settings', { volume: 0.8 })
    expect(listSaves().toSorted()).toEqual(['player', 'settings'])
  })

  it('reflects keys removed by clearSave()', () => {
    save('a', 1)
    save('b', 2)
    clearSave('a')
    expect(listSaves()).toEqual(['b'])
  })
})

//#endregion

//#region clearSave()

describe('clearSave()', () => {
  it('removes the entry for the given key', () => {
    save('key', 'value')
    clearSave('key')
    expect(localStorage.getItem('key')).toBeNull()
  })

  it('returns true when the key exists and is removed', () => {
    save('key', 'value')
    expect(clearSave('key')).toBe(true)
  })

  it('returns false when the key does not exist', () => {
    expect(clearSave('nonexistent')).toBe(false)
  })

  it('clears all entries when called without a key', () => {
    save('a', 1)
    save('b', 2)
    clearSave()
    expect(listSaves()).toEqual([])
  })

  it('returns true when clearing all entries', () => {
    expect(clearSave()).toBe(true)
  })
})

//#endregion
