import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { doAfter, doEvery, Timer, wait } from '../src/time'

describe('Timer', () => {
  it('does not start automatically', () => {
    const timer = new Timer(1000, vi.fn())
    expect(timer.isRunning).toBe(false)
  })

  it('defaults to non-looping', () => {
    expect(new Timer(1000, vi.fn()).loops).toBe(false)
  })

  it('reports loops correctly when specified', () => {
    expect(new Timer(1000, vi.fn(), true).loops).toBe(true)
    expect(new Timer(1000, vi.fn(), false).loops).toBe(false)
  })
})

describe('doEvery()', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns a looping timer', () => {
    const timer = doEvery(1000, vi.fn())
    expect(timer.loops).toBe(true)
    timer.stop()
  })

  it('is running immediately after creation', () => {
    const timer = doEvery(1000, vi.fn())
    expect(timer.isRunning).toBe(true)
    timer.stop()
  })

  it('does not call the callback before the first interval', () => {
    const callback = vi.fn()
    const timer = doEvery(1000, callback)
    vi.advanceTimersByTime(999)
    expect(callback).not.toHaveBeenCalled()
    timer.stop()
  })

  it('calls the callback repeatedly at the given interval', () => {
    const callback = vi.fn()
    const timer = doEvery(1000, callback)
    vi.advanceTimersByTime(3000)
    expect(callback).toHaveBeenCalledTimes(3)
    timer.stop()
  })

  it('stops calling the callback after stop()', () => {
    const callback = vi.fn()
    const timer = doEvery(1000, callback)
    vi.advanceTimersByTime(2000)
    timer.stop()
    vi.advanceTimersByTime(2000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('isRunning is false after stop()', () => {
    const timer = doEvery(1000, vi.fn())
    timer.stop()
    expect(timer.isRunning).toBe(false)
  })

  it('resets the interval on restart()', () => {
    const callback = vi.fn()
    const timer = doEvery(1000, callback)
    vi.advanceTimersByTime(800)
    timer.restart()
    vi.advanceTimersByTime(800)
    expect(callback).not.toHaveBeenCalled()
    timer.stop()
  })

  it('resumes calling the callback after restart()', () => {
    const callback = vi.fn()
    const timer = doEvery(1000, callback)
    timer.stop()
    timer.restart()
    vi.advanceTimersByTime(2000)
    expect(callback).toHaveBeenCalledTimes(2)
    timer.stop()
  })
})

describe('doAfter()', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns a non-looping timer', () => {
    const timer = doAfter(1000, vi.fn())
    expect(timer.loops).toBe(false)
    timer.stop()
  })

  it('is running immediately after creation', () => {
    const timer = doAfter(1000, vi.fn())
    expect(timer.isRunning).toBe(true)
    timer.stop()
  })

  it('does not call the callback before the delay', () => {
    const callback = vi.fn()
    const timer = doAfter(1000, callback)
    vi.advanceTimersByTime(999)
    expect(callback).not.toHaveBeenCalled()
    timer.stop()
  })

  it('calls the callback once after the delay', () => {
    const callback = vi.fn()
    doAfter(1000, callback)
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call the callback more than once', () => {
    const callback = vi.fn()
    doAfter(1000, callback)
    vi.advanceTimersByTime(5000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('isRunning becomes false after the callback fires', () => {
    const timer = doAfter(1000, vi.fn())
    vi.advanceTimersByTime(1000)
    expect(timer.isRunning).toBe(false)
  })

  it('stop() prevents the callback from firing', () => {
    const callback = vi.fn()
    const timer = doAfter(1000, callback)
    timer.stop()
    vi.advanceTimersByTime(2000)
    expect(callback).not.toHaveBeenCalled()
  })

  it('isRunning is false after stop()', () => {
    const timer = doAfter(1000, vi.fn())
    timer.stop()
    expect(timer.isRunning).toBe(false)
  })
})

describe('wait()', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('does not resolve before the delay', async () => {
    const resolved = vi.fn()
    wait(1000).then(resolved)
    await vi.advanceTimersByTimeAsync(999)
    expect(resolved).not.toHaveBeenCalled()
  })

  it('resolves after the delay', async () => {
    const resolved = vi.fn()
    wait(1000).then(resolved)
    await vi.advanceTimersByTimeAsync(1000)
    expect(resolved).toHaveBeenCalledOnce()
  })

  it('resolves only once', async () => {
    const resolved = vi.fn()
    wait(1000).then(resolved)
    await vi.advanceTimersByTimeAsync(5000)
    expect(resolved).toHaveBeenCalledOnce()
  })
})
