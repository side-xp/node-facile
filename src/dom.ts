/**
 * Utilities for interacting with the DOM.
 * @module DOM
 */

// Guard for Node context
if (typeof window === 'undefined') {
  throw new Error('facile:dom.ts - DOM utilities require a browser environment.')
}

//#region getElement()

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

//#endregion

//#region getAllElements()

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

//#endregion

//#region write()

/**
 * Sets the text content of the given element.
 * @param element The target element.
 * @param text The text to write.
 * @example
 * // HTML
 * <p id="message"></p>
 * // JS
 * const el = facile.getElement('#message');
 * facile.write(el, 'Hello!');
 */
export function write(element: HTMLElement, text: string): void

/**
 * Sets the text content of the first element matching the given tag name.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @param text The text to write.
 * @example
 * // HTML
 * <p></p>
 * // JS
 * facile.write('p', 'Hello!');
 */
export function write<K extends keyof HTMLElementTagNameMap>(tag: K, text: string): void

/**
 * Sets the text content of the first element matching the given CSS selector.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @param text The text to write.
 * @example
 * // HTML
 * <p id="message"></p>
 * // JS
 * facile.write('#message', 'Hello!');
 */
export function write(selector: string, text: string): void

export function write(target: HTMLElement | string, text: string): void {
  if (typeof target === 'string') {
    const el = getElement<HTMLElement>(target)
    if (el) el.innerText = text
  } else {
    target.innerText = text
  }
}

//#endregion

//#region writeHTML()

/**
 * Sets the HTML content of the given element.
 * @param element The target element.
 * @param html The HTML string to write.
 * @example
 * // HTML
 * <div id="container"></div>
 * // JS
 * const el = facile.getElement('#container');
 * facile.writeHTML(el, '<p>Hello!</p>');
 */
export function writeHTML(element: HTMLElement, html: string): void

/**
 * Sets the HTML content of the first element matching the given tag name.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @param html The HTML string to write.
 * @example
 * // HTML
 * <div></div>
 * // JS
 * facile.writeHTML('div', '<p>Hello!</p>');
 */
export function writeHTML<K extends keyof HTMLElementTagNameMap>(tag: K, html: string): void

/**
 * Sets the HTML content of the first element matching the given CSS selector.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @param html The HTML string to write.
 * @example
 * // HTML
 * <div id="container"></div>
 * // JS
 * facile.writeHTML('#container', '<p>Hello!</p>');
 */
export function writeHTML(selector: string, html: string): void

export function writeHTML(target: HTMLElement | string, html: string): void {
  if (typeof target === 'string') {
    const el = getElement<HTMLElement>(target)
    if (el) el.innerHTML = html
  } else {
    target.innerHTML = html
  }
}

//#endregion

//#region show()

/**
 * Makes the given element visible by removing the `hidden` attribute.
 * @param element The target element.
 * @example
 * // HTML
 * <p id="message" hidden>Hello!</p>
 * // JS
 * const el = facile.getElement('#message');
 * facile.show(el);
 */
export function show(element: HTMLElement): void

/**
 * Makes the first element matching the given tag name visible by removing the `hidden` attribute.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @example
 * // HTML
 * <p hidden>Hello!</p>
 * // JS
 * facile.show('p');
 */
export function show<K extends keyof HTMLElementTagNameMap>(tag: K): void

/**
 * Makes the first element matching the given CSS selector visible by removing the `hidden` attribute.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @example
 * // HTML
 * <p id="message" hidden>Hello!</p>
 * // JS
 * facile.show('#message');
 */
export function show(selector: string): void

export function show(target: HTMLElement | string): void {
  if (typeof target === 'string') {
    const el = getElement<HTMLElement>(target)
    if (el) el.hidden = false
  } else {
    target.hidden = false
  }
}

//#endregion

//#region hide()

/**
 * Hides the given element by setting the `hidden` attribute.
 * @param element The target element.
 * @example
 * // HTML
 * <p id="message">Hello!</p>
 * // JS
 * const el = facile.getElement('#message');
 * facile.hide(el);
 */
export function hide(element: HTMLElement): void

/**
 * Hides the first element matching the given tag name by setting the `hidden` attribute.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @example
 * // HTML
 * <p>Hello!</p>
 * // JS
 * facile.hide('p');
 */
export function hide<K extends keyof HTMLElementTagNameMap>(tag: K): void

/**
 * Hides the first element matching the given CSS selector by setting the `hidden` attribute.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @example
 * // HTML
 * <p id="message">Hello!</p>
 * // JS
 * facile.hide('#message');
 */
export function hide(selector: string): void

export function hide(target: HTMLElement | string): void {
  if (typeof target === 'string') {
    const el = getElement<HTMLElement>(target)
    if (el) el.hidden = true
  } else {
    target.hidden = true
  }
}

//#endregion

//#region toggle()

/**
 * Toggles the visibility of the given element: hides it if visible, shows it if hidden.
 * @param element The target element.
 * @example
 * // HTML
 * <p id="message">Hello!</p>
 * // JS
 * const el = facile.getElement('#message');
 * facile.toggle(el); // hides it
 * facile.toggle(el); // shows it
 */
export function toggle(element: HTMLElement): void
/**
 * Toggles the visibility of the first element matching the given tag name.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @example
 * // HTML
 * <p>Hello!</p>
 * // JS
 * facile.toggle('p'); // hides it
 * facile.toggle('p'); // shows it
 */
export function toggle<K extends keyof HTMLElementTagNameMap>(tag: K): void
/**
 * Toggles the visibility of the first element matching the given CSS selector.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @example
 * // HTML
 * <p id="message">Hello!</p>
 * // JS
 * facile.toggle('#message'); // hides it
 * facile.toggle('#message'); // shows it
 */
export function toggle(selector: string): void
export function toggle(target: HTMLElement | string): void {
  if (typeof target === 'string') {
    const el = getElement<HTMLElement>(target)
    if (el) el.hidden ? show(el) : hide(el)
  } else {
    target.hidden ? show(target) : hide(target)
  }
}

//#endregion

//#region addElement()

/**
 * Creates a new element and appends it to `document.body`.
 * @param tag The HTML tag name of the element to create.
 * @returns Returns the created element.
 * @example
 * const p = facile.addElement('p');
 */
export function addElement<K extends keyof HTMLElementTagNameMap>(tag: K): HTMLElementTagNameMap[K]

/**
 * Creates a new element and inserts it into the given parent element.
 * The `index` defines the position among the parent's children, and is clamped to the valid range
 * `[0, parent.children.length]`. Defaults to appending at the end.
 * @param tag The HTML tag name of the element to create.
 * @param parent The parent element to insert into.
 * @param index The position among the parent's children. Defaults to the end.
 * @returns Returns the created element.
 * @example
 * // HTML
 * <div id="container"></div>
 * // JS
 * const el = facile.getElement('#container');
 * const p = facile.addElement('p', el);
 */
export function addElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  parent: HTMLElement,
  index?: number,
): HTMLElementTagNameMap[K]

/**
 * Creates a new element and inserts it into the first element matching the given tag name.
 * Falls back to `document.body` if no matching element is found.
 * The `index` defines the position among the parent's children, and is clamped to the valid range
 * `[0, parent.children.length]`. Defaults to appending at the end.
 * @param tag The HTML tag name of the element to create.
 * @param parentTag The HTML tag name of the parent element to insert into.
 * @param index The position among the parent's children. Defaults to the end.
 * @returns Returns the created element.
 * @example
 * // HTML
 * <div></div>
 * // JS
 * const p = facile.addElement('p', 'div');
 */
export function addElement<K extends keyof HTMLElementTagNameMap, P extends keyof HTMLElementTagNameMap>(
  tag: K,
  parentTag: P,
  index?: number,
): HTMLElementTagNameMap[K]

/**
 * Creates a new element and inserts it into the first element matching the given CSS selector.
 * Falls back to `document.body` if no matching element is found.
 * The `index` defines the position among the parent's children, and is clamped to the valid range
 * `[0, parent.children.length]`. Defaults to appending at the end.
 * @param tag The HTML tag name of the element to create.
 * @param selector A CSS selector string for the parent element.
 * @param index The position among the parent's children. Defaults to the end.
 * @returns Returns the created element.
 * @example
 * // HTML
 * <div id="container"></div>
 * // JS
 * const p = facile.addElement('p', '#container');
 */
export function addElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  selector: string,
  index?: number,
): HTMLElementTagNameMap[K]

export function addElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  parent?: HTMLElement | string,
  index?: number,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)

  let parentEl: HTMLElement
  if (typeof parent === 'string') {
    parentEl = getElement<HTMLElement>(parent) ?? document.body
  } else {
    parentEl = parent ?? document.body
  }

  const childCount = parentEl.children.length
  // If the index is undefined, use the last available index in the parent
  const insertAt = index === undefined ? childCount : Math.max(0, Math.min(index, childCount))
  const insertBefore = parentEl.children[insertAt] ?? null
  parentEl.insertBefore(el, insertBefore)

  return el
}

//#endregion

//#region empty()

/**
 * Removes all child nodes from the given element.
 * @param element The target element.
 * @example
 * // HTML
 * <div id="container"><p>Hello!</p></div>
 * // JS
 * const el = facile.getElement('#container');
 * facile.empty(el);
 */
export function empty(element: HTMLElement): void

/**
 * Removes all child nodes from the first element matching the given tag name.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @example
 * // HTML
 * <div><p>Hello!</p></div>
 * // JS
 * facile.empty('div');
 */
export function empty<K extends keyof HTMLElementTagNameMap>(tag: K): void

/**
 * Removes all child nodes from the first element matching the given CSS selector.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @example
 * // HTML
 * <div id="container"><p>Hello!</p></div>
 * // JS
 * facile.empty('#container');
 */
export function empty(selector: string): void

export function empty(target: HTMLElement | string): void {
  const el = typeof target === 'string' ? getElement<HTMLElement>(target) : target
  if (el) {
    while (el.lastChild) el.removeChild(el.lastChild)
  }
}

//#endregion
