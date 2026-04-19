/**
 * Utilities for using timers or dealing with delays.
 * @module Time
 */

/**
 * Represents a callback used for a timer.
 */
export type TimerCallback = () => void

/**
 * Represents a timer able to invoke a callback when it triggers.
 */
export class Timer {
  /** Flag enabled if this timer wraps a `setInterval()` call, meaning the callback will repeat. */
  private _loops: boolean
  /** The id provided by the timer API, whether it's provided from `setInterval()` or `setTimeout()`. */
  private _id: ReturnType<typeof setTimeout> | undefined
  /** {@link isRunning} */
  private _isRunning = false
  /** The delay or interval (in milliseconds) of this timer. */
  private _msInterval: number
  /** The function to call when this timer triggers. */
  private _callback: TimerCallback

  /** `true` if this timer triggers on regular interval, `false` if it's a one-shot. */
  public get loops() {
    return this._loops
  }

  /**
   * `true` if this timer is running, `false` if it has been stopped or if it's not looping and has already
   * triggered.
   */
  public get isRunning() {
    return this._isRunning
  }

  /**
   * @param ms The interval of this timer, in milliseconds.
   * @param callback The function to call when this timer triggers.
   * @param loop Should the callback be invoked continuously every given interval?
   */
  public constructor(ms: number, callback: TimerCallback, loop = false) {
    this._loops = loop
    this._msInterval = ms
    this._callback = loop
      ? callback
      : () => {
          callback()
          this._isRunning = false
        }
  }

  /**
   * Restarts this timer.
   */
  public restart() {
    this.stop()

    if (this._loops) {
      this._id = setInterval(this._callback, this._msInterval)
    } else {
      this._id = setTimeout(this._callback, this._msInterval)
    }
    this._isRunning = true
  }

  /**
   * Stops this timer.
   */
  public stop() {
    if (this._isRunning) {
      if (this._loops) {
        clearInterval(this._id)
      } else {
        clearTimeout(this._id)
      }
      this._isRunning = false
    }
  }
}

/**
 * Repeats a function every given interval.
 * @param interval The time interval, in milliseconds.
 * @param callback The function to repeat.
 * @returns Returns the created timer.
 */
export function doEvery(interval: number, callback: TimerCallback): Timer {
  const timer = new Timer(interval, callback, true)
  timer.restart()
  return timer
}

/**
 * Calls a function after a given delay.
 * @param delay The time delay, in milliseconds.
 * @param callback The function to call after the delay.
 * @returns Returns the created timer.
 */
export function doAfter(delay: number, callback: TimerCallback): Timer {
  const timer = new Timer(delay, callback, false)
  timer.restart()
  return timer
}

/**
 * Pauses execution for a given duration.
 * @param ms The duration to wait, in milliseconds.
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
