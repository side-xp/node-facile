import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getElement } from '../../src/dom'

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
