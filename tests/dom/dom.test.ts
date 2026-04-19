import { afterEach, assert, beforeEach, describe, expect, it } from 'vitest'
import { addElement, empty, getAllElements, getElement, hide, show, toggle, write, writeHTML } from '../../src/dom'

//#region Init

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

//#endregion

//#region getElement()

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

//#endregion

//#region getAllElements()

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

//#endregion

//#region write()

describe('write()', () => {
  it('sets the text of a given element', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    write(el, 'Hello!')
    expect(el.innerText).toBe('Hello!')
  })

  it('sets the text of the first matching element by tag name', () => {
    write('p', 'Hello!')
    const el = getElement<HTMLElement>('p')
    assert(el !== null)
    expect(el.innerText).toBe('Hello!')
  })

  it('sets the text of the first matching element by CSS selector', () => {
    write('#container', 'Hello!')
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    expect(el.innerText).toBe('Hello!')
  })

  it('only affects the first matching element', () => {
    const els = getAllElements<HTMLElement>('p')
    els[0].innerText = 'First'
    els[1].innerText = 'Second'
    write('p', 'Hello!')
    expect(els[0].innerText).toBe('Hello!')
    expect(els[1].innerText).toBe('Second')
  })

  it('does nothing when no element matches', () => {
    expect(() => write('#nonexistent', 'Hello!')).not.toThrow()
  })

  it('strips HTML tags and writes plain text', () => {
    const el = getElement<HTMLElement>('p')
    assert(el !== null)
    write(el, '<b>bold</b>')
    expect(el.innerText).toBe('<b>bold</b>')
  })
})

//#endregion

//#region writeHTML()

describe('writeHTML()', () => {
  it('sets the HTML content of a given element', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    writeHTML(el, '<span>Hello!</span>')
    expect(el.innerHTML).toBe('<span>Hello!</span>')
  })

  it('sets the HTML content of the first matching element by tag name', () => {
    writeHTML('div', '<span>Hello!</span>')
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    expect(el.innerHTML).toBe('<span>Hello!</span>')
  })

  it('sets the HTML content of the first matching element by CSS selector', () => {
    writeHTML('#container', '<span>Hello!</span>')
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    expect(el.innerHTML).toBe('<span>Hello!</span>')
  })

  it('only affects the first matching element', () => {
    writeHTML('p', '<b>Hello!</b>')
    const els = getAllElements<HTMLElement>('p')
    expect(els[0].innerHTML).toBe('<b>Hello!</b>')
    expect(els[1].innerHTML).toBe('Second')
  })

  it('does nothing when no element matches', () => {
    expect(() => writeHTML('#nonexistent', '<b>Hello!</b>')).not.toThrow()
  })

  it('parses and renders HTML tags', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    writeHTML(el, '<span>Hello!</span>')
    expect(el.querySelector('span')).not.toBeNull()
  })
})

//#endregion

//#region show()

describe('show()', () => {
  it('makes a given element visible', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    el.hidden = true
    show(el)
    expect(el.hidden).toBe(false)
  })

  it('makes the first matching element visible by tag name', () => {
    const el = getElement<HTMLElement>('p')
    assert(el !== null)
    el.hidden = true
    show('p')
    expect(el.hidden).toBe(false)
  })

  it('makes the first matching element visible by CSS selector', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    el.hidden = true
    show('#container')
    expect(el.hidden).toBe(false)
  })

  it('only affects the first matching element', () => {
    const els = getAllElements<HTMLElement>('p')
    els[0].hidden = true
    els[1].hidden = true
    show('p')
    expect(els[0].hidden).toBe(false)
    expect(els[1].hidden).toBe(true)
  })

  it('does nothing when no element matches', () => {
    expect(() => show('#nonexistent')).not.toThrow()
  })

  it('has no effect on an already visible element', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    el.hidden = false
    show(el)
    expect(el.hidden).toBe(false)
  })
})

//#endregion

//#region hide()

describe('hide()', () => {
  it('hides a given element', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    hide(el)
    expect(el.hidden).toBe(true)
  })

  it('hides the first matching element by tag name', () => {
    const el = getElement<HTMLElement>('p')
    assert(el !== null)
    hide('p')
    expect(el.hidden).toBe(true)
  })

  it('hides the first matching element by CSS selector', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    hide('#container')
    expect(el.hidden).toBe(true)
  })

  it('only affects the first matching element', () => {
    const els = getAllElements<HTMLElement>('p')
    hide('p')
    expect(els[0].hidden).toBe(true)
    expect(els[1].hidden).toBe(false)
  })

  it('does nothing when no element matches', () => {
    expect(() => hide('#nonexistent')).not.toThrow()
  })

  it('has no effect on an already hidden element', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    el.hidden = true
    hide(el)
    expect(el.hidden).toBe(true)
  })
})

//#endregion

//#region toggle()

describe('toggle()', () => {
  it('hides a visible element', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    el.hidden = false
    toggle(el)
    expect(el.hidden).toBe(true)
  })

  it('shows a hidden element', () => {
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    el.hidden = true
    toggle(el)
    expect(el.hidden).toBe(false)
  })

  it('toggles the first matching element by tag name', () => {
    const el = getElement<HTMLElement>('p')
    assert(el !== null)
    el.hidden = false
    toggle('p')
    expect(el.hidden).toBe(true)
  })

  it('toggles the first matching element by CSS selector', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    el.hidden = false
    toggle('#container')
    expect(el.hidden).toBe(true)
  })

  it('does nothing when no element matches', () => {
    expect(() => toggle('#nonexistent')).not.toThrow()
  })
})

//#endregion

//#region addElement()

describe('addElement()', () => {
  it('returns the created element', () => {
    const el = addElement('p')
    expect(el).toBeInstanceOf(HTMLParagraphElement)
  })

  it('appends to document.body by default', () => {
    const el = addElement('p')
    expect(document.body.contains(el)).toBe(true)
  })

  it('appends to a given element', () => {
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    const el = addElement('span', parent)
    expect(parent.contains(el)).toBe(true)
  })

  it('appends to the first matching element by tag name', () => {
    const el = addElement('span', 'div')
    const parent = getElement<HTMLElement>('div')
    assert(parent !== null)
    expect(parent.contains(el)).toBe(true)
  })

  it('appends to the first matching element by CSS selector', () => {
    const el = addElement('span', '#container')
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    expect(parent.contains(el)).toBe(true)
  })

  it('falls back to document.body when parent is not found', () => {
    const el = addElement('p', '#nonexistent')
    expect(document.body.contains(el)).toBe(true)
  })

  it('appends at the end by default', () => {
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    const el = addElement('span', parent)
    expect(parent.lastElementChild).toBe(el)
  })

  it('inserts at index 0', () => {
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    const el = addElement('span', parent, 0)
    expect(parent.firstElementChild).toBe(el)
  })

  it('inserts at a mid-range index', () => {
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    const el = addElement('span', parent, 1)
    expect(parent.children[1]).toBe(el)
  })

  it('clamps a negative index to 0', () => {
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    const el = addElement('span', parent, -5)
    expect(parent.firstElementChild).toBe(el)
  })

  it('clamps an out-of-range index to the end', () => {
    const parent = getElement<HTMLElement>('#container')
    assert(parent !== null)
    const el = addElement('span', parent, 999)
    expect(parent.lastElementChild).toBe(el)
  })
})

//#endregion

//#region empty()

describe('empty()', () => {
  it('removes all children from a given element', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    empty(el)
    expect(el.childNodes.length).toBe(0)
  })

  it('removes all children from the first matching element by tag name', () => {
    empty('div')
    const el = getElement<HTMLElement>('div')
    assert(el !== null)
    expect(el.childNodes.length).toBe(0)
  })

  it('removes all children from the first matching element by CSS selector', () => {
    empty('#container')
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    expect(el.childNodes.length).toBe(0)
  })

  it('removes text nodes as well as element nodes', () => {
    const el = getElement<HTMLElement>('#container')
    assert(el !== null)
    el.appendChild(document.createTextNode('hello'))
    empty(el)
    expect(el.childNodes.length).toBe(0)
  })

  it('has no effect on an already empty element', () => {
    const el = addElement('div', document.body)
    empty(el)
    expect(el.childNodes.length).toBe(0)
  })

  it('does nothing when no element matches', () => {
    expect(() => empty('#nonexistent')).not.toThrow()
  })
})

//#endregion
