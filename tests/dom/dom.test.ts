import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getAllElements, getElement } from '../../src/dom'

beforeEach(() => {
  document.body.innerHTML = `
    <div id="container">
      <p class="text">First</p>
      <p class="text">Second</p>
      <input type="text" />
    </div>
  `
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('getElement()', () => {
  it('finds an element by tag name', () => {
    expect(getElement('div')).not.toBeNull()
  })

  it('finds an element by id selector', () => {
    expect(getElement('#container')).not.toBeNull()
  })

  it('finds an element by class selector', () => {
    expect(getElement('.text')).not.toBeNull()
  })

  it('returns only the first matching element', () => {
    const el = getElement('.text')
    expect(el?.textContent).toBe('First')
  })

  it('returns null when no element matches', () => {
    expect(getElement('#nonexistent')).toBeNull()
    expect(getElement('span')).toBeNull()
  })

  it('returns the correct element type for a tag name', () => {
    expect(getElement('input')).toBeInstanceOf(HTMLInputElement)
  })
})

describe('getAllElements()', () => {
  it('finds all elements by tag name', () => {
    expect(getAllElements('p')).toHaveLength(2)
  })

  it('finds all elements by class selector', () => {
    expect(getAllElements('.text')).toHaveLength(2)
  })

  it('returns all matching elements, not just the first', () => {
    const els = getAllElements('.text')
    expect(els[0].textContent).toBe('First')
    expect(els[1].textContent).toBe('Second')
  })

  it('returns an empty array when no element matches', () => {
    expect(getAllElements('span')).toEqual([])
    expect(getAllElements('.nonexistent')).toEqual([])
  })

  it('returns the correct element types for a tag name', () => {
    for (const el of getAllElements('p')) {
      expect(el).toBeInstanceOf(HTMLParagraphElement)
    }
  })
})
