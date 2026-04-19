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

/**
 * Returns all elements matching the given tag name, or an empty array if none exist.
 * @param tag The HTML tag name to search for.
 * @returns Returns an array of all found elements, or an empty array.
 * @example
 * // HTML
 * <p>First</p>
 * <p>Second</p>
 * // JS
 * const paragraphs = facile.getAllElements('p');
 */
export function getAllElements<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K][]

/**
 * Returns all elements matching the given CSS selector, or an empty array if none exist.
 * @template T The expected element type. Uses `Element` by default.
 * @param selector A CSS selector string.
 * @returns Returns an array of all found elements, or an empty array.
 * @example
 * // HTML
 * <p class="text">First</p>
 * <p class="text">Second</p>
 * // JS
 * const paragraphs = facile.getAllElements('.text');
 */
export function getAllElements<T extends Element = Element>(selector: string): T[]

export function getAllElements<T extends Element = Element>(selector: string): T[] {
  return Array.from(document.querySelectorAll(selector))
}
