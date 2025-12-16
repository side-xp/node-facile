/**
 * Utility for creating "observable" variables.
 * @module State
 */

/**
 * Represents a function to call when a state value changes.
 */
export type StateChangeCallback<T> = (value: T | undefined, previousValue: T | undefined) => void;

/**
 * Represents a value that can be "watched" and to which callbacks can be attached to be notified when it changes.
 */
export class State<T> {

  /**
   * The current value of this state.
   */
  private _value: T | undefined = undefined;

  /**
   * The list of callbacks registered for this state.
   */
  private _callbacks = new Array<StateChangeCallback<T>>();

  constructor(state?: T) {
    this._value = state;
  }

  /**
   * Gets the value of this state.
   */
  public get value(): T | undefined {
    return this._value;
  }

  /**
   * Sets the value of this state, and invoke all registered callbacks.
   */
  public set value(state: T) {
    // Cancel if the new value is the same as the existing one
    if (this._value === state) {
      return;
    }

    const previous = this._value;
    this._value = state;
    for (const listener of this._callbacks) {
      try {
        listener(this._value, previous);
      }
      catch (error) {
        console.error(error);
        console.warn('Failed to invoke a listener on state change. See previous error for more info.');
      }
    }
  }

  /**
   * Adds a new callback to be invoked when the value of this state changes.
   * @param callback The function to call when this state calue change.
   */
  public onChange(callback: StateChangeCallback<T>) {
    this._callbacks.push(callback);
  }

}

/**
 * Creates a "state", a value able to invoke callbacks when changed.
 * @param value The initial value of the created state.
 * @returns Returns the created state.
 * @example
 * // Create the state
 * const score = facile.state(0):
 * // Attach a callback
 * score.onChange((newScore) => {
 *  console.log('Score updated: ', newScore);
 * });
 * // Change the state value
 * score.value = 100;
 */
export function state<T>(value?: T) {
  return new State(value);
}