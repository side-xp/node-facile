/**
 * Utilities for interacting with the DOM.
 * @module DOM
 */

/**
 * Returns the first element matching the given tag name, or `null` if none exists.
 * @param tag The HTML tag name to search for.
 * @returns Returns the found element, or `null`.
 * @example
 * // HTML
 * <button>Click Me!</button>
 * // JS
 * const myButton = facile.getElement('button');
 */
export function getElement<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K] | null

/**
 * Returns the first element matching the given CSS selector, or `null` if none exists.
 * @template T The expected element type. Uses `Element` by default.
 * @param selector A CSS selector string.
 * @returns Returns the found element, or `null`.
 * @example
 * // HTML
 * <button id="my-button">Click Me!</button>
 * // JS
 * const myButton = facile.getElement('#my-button');
 */
export function getElement<T extends Element = Element>(selector: string): T | null

export function getElement<T extends Element = Element>(selector: string): T | null {
  return document.querySelector(selector)
}
