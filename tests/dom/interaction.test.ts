import { afterEach, assert, beforeEach, describe, expect, it, vi } from 'vitest'
import { getElement } from '../../src/dom'
import { ask, askNumber, confirm, onChange, onClick, say } from '../../src/interaction'

//#region Init

beforeEach(() => {
  document.body.innerHTML = `
    <button id="btn">Click Me</button>
    <input id="text-input" type="text" />
    <input id="checkbox" type="checkbox" />
    <input id="radio" type="radio" />
    <select id="select">
      <option value="a">A</option>
      <option value="b">B</option>
    </select>
    <textarea id="textarea"></textarea>
  `
})

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

//#endregion

//#region onClick()

describe('onClick()', () => {
  it('calls the callback when a given element is clicked', () => {
    const el = getElement<HTMLElement>('button')
    assert(el !== null)
    const callback = vi.fn()
    onClick(el, callback)
    el.click()
    expect(callback).toHaveBeenCalledOnce()
  })

  it('calls the callback when the first matching element by tag name is clicked', () => {
    const el = getElement<HTMLElement>('button')
    assert(el !== null)
    const callback = vi.fn()
    onClick('button', callback)
    el.click()
    expect(callback).toHaveBeenCalledOnce()
  })

  it('calls the callback when the first matching element by CSS selector is clicked', () => {
    const el = getElement<HTMLElement>('#btn')
    assert(el !== null)
    const callback = vi.fn()
    onClick('#btn', callback)
    el.click()
    expect(callback).toHaveBeenCalledOnce()
  })

  it('passes the MouseEvent to the callback', () => {
    const el = getElement<HTMLElement>('button')
    assert(el !== null)
    const callback = vi.fn()
    onClick(el, callback)
    el.click()
    expect(callback).toHaveBeenCalledWith(expect.any(MouseEvent))
  })

  it('does nothing when no element matches', () => {
    expect(() => onClick('#nonexistent', vi.fn())).not.toThrow()
  })
})

//#endregion

//#region onChange()

describe('onChange()', () => {
  it('calls the callback when a given element value changes', () => {
    const el = getElement<HTMLInputElement>('#text-input')
    assert(el !== null)
    const callback = vi.fn()
    onChange(el, callback)
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledOnce()
  })

  it('calls the callback when the first matching element by tag name changes', () => {
    const el = getElement<HTMLInputElement>('input')
    assert(el !== null)
    const callback = vi.fn()
    onChange('input', callback)
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledOnce()
  })

  it('calls the callback when the first matching element by CSS selector changes', () => {
    const el = getElement<HTMLInputElement>('#text-input')
    assert(el !== null)
    const callback = vi.fn()
    onChange('#text-input', callback)
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledOnce()
  })

  it('passes the string value for a text input', () => {
    const el = getElement<HTMLInputElement>('#text-input')
    assert(el !== null)
    const callback = vi.fn()
    onChange(el, callback)
    el.value = 'hello'
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledWith('hello', expect.any(Event))
  })

  it('passes the string value for a select', () => {
    const el = getElement<HTMLSelectElement>('#select')
    assert(el !== null)
    const callback = vi.fn()
    onChange(el, callback)
    el.value = 'b'
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledWith('b', expect.any(Event))
  })

  it('passes the string value for a textarea', () => {
    const el = getElement<HTMLTextAreaElement>('#textarea')
    assert(el !== null)
    const callback = vi.fn()
    onChange(el, callback)
    el.value = 'hello'
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledWith('hello', expect.any(Event))
  })

  it('passes a boolean for a checkbox', () => {
    const el = getElement<HTMLInputElement>('#checkbox')
    assert(el !== null)
    const callback = vi.fn()
    onChange(el, callback)
    el.checked = true
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledWith(true, expect.any(Event))
  })

  it('passes a boolean for a radio button', () => {
    const el = getElement<HTMLInputElement>('#radio')
    assert(el !== null)
    const callback = vi.fn()
    onChange(el, callback)
    el.checked = true
    el.dispatchEvent(new Event('change'))
    expect(callback).toHaveBeenCalledWith(true, expect.any(Event))
  })

  it('does nothing when no element matches', () => {
    expect(() => onChange('#nonexistent', vi.fn())).not.toThrow()
  })
})

//#endregion

//#region Prompts

describe('ask()', () => {
  it('returns the user input', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('hello')
    expect(ask('Enter text')).toBe('hello')
  })

  it('trims the input', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('  hello  ')
    expect(ask('Enter text')).toBe('hello')
  })

  it('returns null when the user cancels', () => {
    vi.spyOn(window, 'prompt').mockReturnValue(null)
    expect(ask('Enter text')).toBeNull()
  })

  it('passes the message to the prompt', () => {
    const spy = vi.spyOn(window, 'prompt').mockReturnValue(null)
    ask('Enter your name')
    expect(spy).toHaveBeenCalledWith('Enter your name', undefined)
  })

  it('passes the default value to the prompt', () => {
    const spy = vi.spyOn(window, 'prompt').mockReturnValue(null)
    ask('Enter your name', 'Alice')
    expect(spy).toHaveBeenCalledWith('Enter your name', 'Alice')
  })
})

describe('askNumber()', () => {
  it('returns the parsed integer', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('42')
    expect(askNumber('Enter a number')).toBe(42)
  })

  it('returns the parsed decimal when allowed', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('3.14')
    expect(askNumber('Enter a number', true)).toBe(3.14)
  })

  it('accepts commas as decimal separators', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('3,14')
    expect(askNumber('Enter a number', true)).toBe(3.14)
  })

  it('truncates decimals when not allowed', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('3.14')
    expect(askNumber('Enter a number')).toBe(3)
  })

  it('returns null for non-numeric input', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('abc')
    expect(askNumber('Enter a number')).toBeNull()
  })

  it('returns null when the user cancels', () => {
    vi.spyOn(window, 'prompt').mockReturnValue(null)
    expect(askNumber('Enter a number')).toBeNull()
  })
})

describe('say()', () => {
  it('calls window.alert with the message', () => {
    const spy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    say('Hello!')
    expect(spy).toHaveBeenCalledWith('Hello!')
  })
})

describe('confirm()', () => {
  it('returns true when the user confirms', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    expect(confirm('Are you sure?')).toBe(true)
  })

  it('returns false when the user cancels', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    expect(confirm('Are you sure?')).toBe(false)
  })

  it('calls window.confirm with the message', () => {
    const spy = vi.spyOn(window, 'confirm').mockReturnValue(false)
    confirm('Are you sure?')
    expect(spy).toHaveBeenCalledWith('Are you sure?')
  })
})

//#endregion
