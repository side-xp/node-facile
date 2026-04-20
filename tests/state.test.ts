import { describe, expect, it, vi } from 'vitest'
import { State, state } from '../src/state'

describe('state()', () => {
  it('returns a State instance', () => {
    expect(state(0)).toBeInstanceOf(State)
  })

  it('sets the initial value', () => {
    expect(state(42).value).toBe(42)
  })
})

describe('State', () => {
  describe('value', () => {
    it('returns the current value', () => {
      const s = state('hello')
      expect(s.value).toBe('hello')
    })

    it('updates the value when set', () => {
      const s = state(0)
      s.value = 10
      expect(s.value).toBe(10)
    })

    it('works with objects', () => {
      const s = state({ name: 'Alice' })
      s.value = { name: 'Bob' }
      expect(s.value).toEqual({ name: 'Bob' })
    })
  })

  describe('watch()', () => {
    it('calls the callback when the value changes', () => {
      const s = state(0)
      const callback = vi.fn()
      s.watch(callback)
      s.value = 1
      expect(callback).toHaveBeenCalledOnce()
    })

    it('passes the new and old values to the callback', () => {
      const s = state(0)
      const callback = vi.fn()
      s.watch(callback)
      s.value = 5
      expect(callback).toHaveBeenCalledWith(5, 0)
    })

    it('does not call the callback when the value is set to the same value', () => {
      const s = state(0)
      const callback = vi.fn()
      s.watch(callback)
      s.value = 0
      expect(callback).not.toHaveBeenCalled()
    })

    it('calls multiple watchers when the value changes', () => {
      const s = state(0)
      const a = vi.fn()
      const b = vi.fn()
      s.watch(a)
      s.watch(b)
      s.value = 1
      expect(a).toHaveBeenCalledOnce()
      expect(b).toHaveBeenCalledOnce()
    })

    it('does not call the callback immediately by default', () => {
      const s = state(0)
      const callback = vi.fn()
      s.watch(callback)
      expect(callback).not.toHaveBeenCalled()
    })

    it('calls the callback immediately when init is true', () => {
      const s = state(42)
      const callback = vi.fn()
      s.watch(callback, true)
      expect(callback).toHaveBeenCalledOnce()
    })

    it('passes the current value as both arguments when init fires', () => {
      const s = state(42)
      const callback = vi.fn()
      s.watch(callback, true)
      expect(callback).toHaveBeenCalledWith(42, 42)
    })
  })

  describe('unwatch()', () => {
    it('stops the callback from being called after unwatch', () => {
      const s = state(0)
      const callback = vi.fn()
      s.watch(callback)
      s.unwatch(callback)
      s.value = 1
      expect(callback).not.toHaveBeenCalled()
    })

    it('does not affect other watchers', () => {
      const s = state(0)
      const a = vi.fn()
      const b = vi.fn()
      s.watch(a)
      s.watch(b)
      s.unwatch(a)
      s.value = 1
      expect(a).not.toHaveBeenCalled()
      expect(b).toHaveBeenCalledOnce()
    })

    it('does nothing when the callback was never registered', () => {
      const s = state(0)
      expect(() => s.unwatch(vi.fn())).not.toThrow()
    })
  })
})
