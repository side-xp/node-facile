/**
 * Utilities for reactive state management.
 * @module State
 */

/**
 * Represents a callback invoked when a state value changes.
 * @param newValue The new value after the change.
 * @param oldValue The previous value before the change.
 */
export type WatchCallback<T> = (newValue: T, oldValue: T) => void

/**
 * A reactive state variable that notifies registered watchers whenever its value changes.
 * @example
 * const counter = new State(0)
 * counter.watch((newVal, oldVal) => {
 *   facile.write('#count', `Count: ${newVal}`)
 * })
 * counter.value = 1 // triggers the watcher
 * counter.value     // 1
 */
export class State<T> {
  private _value: T
  private _watchers = new Set<WatchCallback<T>>()

  constructor(initialValue: T) {
    this._value = initialValue
  }

  /**
   * The current value. Setting a new value notifies all watchers if it changed.
   * Does nothing if the new value is the same as the current one.
   */
  get value(): T {
    return this._value
  }

  set value(newValue: T) {
    if (newValue === this._value) {
      return
    }

    const oldValue = this._value
    this._value = newValue
    for (const watcher of this._watchers) {
      watcher(newValue, oldValue)
    }
  }

  /**
   * Registers a callback to be invoked whenever the value changes.
   * @param callback The function to call when the value changes.
   * @param init If `true`, the callback is invoked immediately with the current value. Defaults to `false`.
   */
  watch(callback: WatchCallback<T>, init = false): void {
    this._watchers.add(callback)
    if (init) {
      callback(this._value, this._value)
    }
  }

  /**
   * Removes a previously registered watcher.
   * @param callback The callback to remove.
   */
  unwatch(callback: WatchCallback<T>): void {
    this._watchers.delete(callback)
  }
}

/**
 * Creates a reactive state variable that notifies registered watchers whenever its value changes.
 * @param initialValue The initial value of the state.
 * @returns A new `State` instance.
 * @example
 * const counter = state(0)
 * counter.watch((newVal, oldVal) => {
 *   facile.write('#count', `Count: ${newVal}`)
 * })
 * counter.value = 1 // triggers the watcher
 * counter.value     // 1
 */
export function state<T>(initialValue: T): State<T> {
  return new State(initialValue)
}
