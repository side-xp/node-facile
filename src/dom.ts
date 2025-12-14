// This script contains features related to DOM and UI manipulations.

/**
 * Gets the first element in the page that match the given CSS selectors.
 * @param selectors The CSS selectors to match.
 * @returns Returns the found element or null.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/querySelector|MDN - Document.querySelector()}
 */
export function getElement<E extends Element>(selectors: string): E | null;

/**
 * Gets the first element in the page with the given tag.
 * @param tagName The tag name of the element to get.
 * @returns Returns the found element or null.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/querySelector|MDN - Document.querySelector()}
 */
export function getElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] | null;

export function getElement(selectors: string): Element | null {
  const element = document.querySelector(selectors);
  if (!element) {
    console.warn(`No element found for selectors ${selectors}`);
  }
  return element;
}

/**
 * Gets all the elements in the page that match the given CSS selectors.
 * @param selectors The CSS selectors to match.
 * @returns Returns the list of the found elements, or an empty list if no element match the given selectors.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll|MDN - Document.querySelectorAll()}
 */
export function getAllElements<E extends Element>(selectors: string): NodeListOf<E>;

/**
 * Gets all the elements in the page with the given tag.
 * @param tagName The tag name of the elements to get.
 * @returns Returns the list of the found elements, or an empty list if no element match the given tag name.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll|MDN - Document.querySelectorAll()}
 */
export function getAllElements<K extends keyof HTMLElementTagNameMap>(tagName: K): NodeListOf<HTMLElementTagNameMap[K]>;

export function getAllElements(selectors: string): NodeListOf<Element> {
  const elements = document.querySelectorAll(selectors);
  return elements;
}

/**
 * Gets the first element in the page that match the given CSS selector, and overwrite its text node if it exists.
 * Note that this will overwrite the entire content of the element.
 * @param selectors The CSS selectors to match.
 * @param text The text to write in the element.
 * @returns Returns the found element or null.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText|MDN - HTMLElement.innerText}
 */
export function writeText<E extends HTMLElement>(selectors: string, text: string): E | null;

/**
 * Overwrites the text node of a given element.
 * Note that this will overwrite the entire content of the element.
 * @param element The element of which to override the text node content.
 * @param text The text to write in the element.
 * @returns Returns the given element itself.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText|MDN - HTMLElement.innerText}
 */
export function writeText<E extends HTMLElement>(element: HTMLElement, text: string): HTMLElement;

/**
 * Gets the first element in the page that match the given tag name, and overwrite its text node if it exists.
 * Note that this will overwrite the entire content of the element.
 * @param tagName The tag name to match.
 * @param text The text to write in the element.
 * @returns Returns the found element or null.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText|MDN - HTMLElement.innerText}
 */
export function writeText<K extends keyof HTMLElementTagNameMap>(tagName: K, text: string): HTMLElementTagNameMap[K] | null;

export function writeText(selectors: string|HTMLElement, text: string): HTMLElement | null {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);

  if (element) {
    element.innerText = text;
  }
  return element;
}

/**
 * Gets the first element in the page that match the given CSS selector, and overwrite its HTML content if it exists.
 * Note that this will overwrite the entire content of the element.
 * @param selectors The CSS selectors to match, or the HTML Element itself.
 * @param html The HTML code to set in the element.
 * @returns Returns the found element or null.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerHTML|MDN - HTMLElement.innerHTML}
 */
export function writeHTML<E extends HTMLElement>(selectors: string, html: string): E | null;

/**
 * Overwrites the HTML content of a given element.
 * Note that this will overwrite the entire content of the element.
 * @param element The element of which to override the HTML content.
 * @param html The HTML code to set in the element.
 * @returns Returns the given element itself.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerHTML|MDN - HTMLElement.innerHTML}
 */
export function writeHTML<E extends HTMLElement>(element: HTMLElement, html: string): HTMLElement;

/**
 * Gets the first element in the page that match the given tag name, and overwrite its HTML content if it exists.
 * Note that this will overwrite the entire content of the element.
 * @param tagName The tag name to match.
 * @param html The HTML code to set in the element.
 * @returns Returns the found element or null.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerHTML|MDN - HTMLElement.innerHTML}
 */
export function writeHTML<K extends keyof HTMLElementTagNameMap>(tagName: K, html: string): HTMLElementTagNameMap[K] | null;

export function writeHTML(selectors: string|HTMLElement, html: string): HTMLElement | null {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);

  if (element) {
    element.innerHTML = html;
  }
  return element;
}

/**
 * Gets the first element in the page that match the given CSS selector, and gets the content of its text node.
 * @param selectors The CSS selectors to match.
 * @returns Returns the content of the found element's text node, or null if the element doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText|MDN - HTMLElement.innerText}
 */
export function readText<E extends HTMLElement>(selectors: string): string | null;

/**
 * Gets the content of the text node of the given element.
 * @param element The element to read.
 * @returns Returns the content of the found element's text node, or null if the element doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText|MDN - HTMLElement.innerText}
 */
export function readText<E extends HTMLElement>(element: HTMLElement): string | null;

/**
 * Gets the first element in the page that match the given tag name, and gets the content of its text node.
 * @param tagName The tag name of the element to read.
 * @returns Returns the content of the found element's text node, or null if the element doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText|MDN - HTMLElement.innerText}
 */
export function readText<K extends keyof HTMLElementTagNameMap>(tagName: K): string | null;

export function readText(selectors: string|HTMLElement): string | null {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);
  return element ? element.innerText : null;
}

/**
 * Gets the first element in the page that match the given CSS selector, and gets its HTML content.
 * @param selectors The CSS selectors to match.
 * @returns Returns the HTML content of the found element, or null if the element doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerHTML|MDN - HTMLElement.innerHTML}
 */
export function readHTML<E extends HTMLElement>(selectors: string): string | null;

/**
 * Gets HTML content of the given element.
 * @param element The element to read.
 * @returns Returns the HTML content of the given element, or null if the element doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerHTML|MDN - HTMLElement.innerHTML}
 */
export function readHTML<E extends HTMLElement>(element: HTMLElement): string | null;

/**
 * Gets the first element in the page that match the given tag name, and gets its HTML content.
 * @param tagName The tag name of the element to read.
 * @returns Returns the HTML content of the found element, or null if the element doesn't exist.
 * @see {@link https://developer.mozilla.org/docs/Web/API/HTMLElement/innerHTML|MDN - HTMLElement.innerHTML}
 */
export function readHTML<K extends keyof HTMLElementTagNameMap>(tagName: K): string | null;

export function readHTML(selectors: string|HTMLElement): string | null {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);
  return element ? element.innerHTML : null;
}

/**
 * Gets the first element in the page that match the given CSS selector, and make it visible in the page.
 * @param selectors The CSS selectors to match.
 * @returns Returns true if the element has been found and is now visible.
 */
export function show<E extends HTMLElement>(selectors: string): boolean;

/**
 * Makes a given element visible in the page.
 * @param element The element to show.
 * @returns Returns true if the element is now visible.
 */
export function show<E extends HTMLElement>(element: HTMLElement): boolean;

/**
 * Gets the first element in the page that match the given tag name, and make it visible in the page.
 * @param tagName The tag name to match.
 * @returns Returns true if the element has been found and is now visible.
 */
export function show<K extends keyof HTMLElementTagNameMap>(tagName: K): boolean;

export function show(selectors: string|HTMLElement): boolean {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);

  if (!element) {
    return false;
  }

  element.style.visibility = 'visible';
  element.style.display = 'block';
  return true;
}

/**
 * Gets the first element in the page that match the given CSS selector, and make it hidden in the page.
 * @param selectors The CSS selectors to match.
 * @param useSpace By default, this function will apply the style "display: none" to hide the element. If this option is enabled, this
 * function will apply the style "visibility: hidden" instead, hiding the element but letting it occupy some space.
 * @returns Returns true if the element has been found and is now hidden.
 */
export function hide<E extends HTMLElement>(selectors: string, useSpace?: boolean): boolean;

/**
 * Makes a given element hidden in the page.
 * @param element The element to hide.
 * @param useSpace By default, this function will apply the style "display: none" to hide the element. If this option is enabled, this
 * function will apply the style "visibility: hidden" instead, hiding the element but letting it occupy some space.
 * @returns Returns true if the element is now hidden.
 */
export function hide<E extends HTMLElement>(element: HTMLElement, useSpace?: boolean): boolean;

/**
 * Gets the first element in the page that match the given tag name, and make it hidden in the page.
 * @param tagName The tag name to match.
 * @param useSpace By default, this function will apply the style "display: none" to hide the element. If this option is enabled, this
 * function will apply the style "visibility: hidden" instead, hiding the element but letting it occupy some space.
 * @returns Returns true if the element has been found and is now hidden.
 */
export function hide<K extends keyof HTMLElementTagNameMap>(tagName: K, useSpace?: boolean): boolean;

export function hide(selectors: string|HTMLElement, useSpace = false): boolean {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);

  if (!element) {
    return false;
  }

  if (useSpace) {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
  }
  else {
    element.style.display = 'none';
  }
  return true;
}

/**
 * Gets the first element in the page that match the given CSS selector, and will hide it if it's visible or show it if it's hidden.
 * @param selectors The CSS selectors to match.
 * @param useSpace By default, this function will apply the style "display: none" to hide the element. If this option is enabled, this
 * function will apply the style "visibility: hidden" instead, hiding the element but letting it occupy some space.
 * @returns Returns true if the element's visibility has changed successfully.
 */
export function toggle<E extends HTMLElement>(selectors: string, useSpace?: boolean): boolean;

/**
 * Hides the given element it if it's visible or show it if it's hidden.
 * @param element The element to toggle.
 * @param useSpace By default, this function will apply the style "display: none" to hide the element. If this option is enabled, this
 * function will apply the style "visibility: hidden" instead, hiding the element but letting it occupy some space.
 * @returns Returns true if the element's visibility has changed successfully.
 */
export function toggle<E extends HTMLElement>(element: HTMLElement, useSpace?: boolean): boolean;

/**
 * Gets the first element in the page that match the given tag name, and will hide it if it's visible or show it if it's hidden.
 * @param tagName The tag name to match.
 * @param useSpace By default, this function will apply the style "display: none" to hide the element. If this option is enabled, this
 * function will apply the style "visibility: hidden" instead, hiding the element but letting it occupy some space.
 * @returns Returns true if the element's visibility has changed successfully.
 */
export function toggle<K extends keyof HTMLElementTagNameMap>(tagName: K, useSpace?: boolean): boolean;

export function toggle(selectors: string|HTMLElement, useSpace = false): boolean {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);

  if (!element) {
    return false;
  }

  // If the element is hidden, show it
  if (element.style.visibility === 'hidden' || element.style.display === 'none') {
    show(element);
  }
  // Else, hide the element
  else {
    hide(element, useSpace);
  }
  return true;
}

/**
 * Creates a new element of the given tag, and insert it into the selected parent element.
 * @param tagName The tag name of the element to create.
 * @param parentSelectors The CSS selectors to match to identify the parent element.
 * @param index The position at which the new element should be placed in its parent element's hierarchy.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/createElement|MDN - Document.createElement()}
 */
export function addElement<K extends keyof HTMLElementTagNameMap, E extends HTMLElement>(tagName: K, parentSelectors?: string, index?: number): HTMLElementTagNameMap[K];

/**
 * Creates a new element of the given tag, and insert it into the given parent element.
 * @param tagName The tag name of the element to create.
 * @param parentElement The parent element.
 * @param index The position at which the new element should be placed in its parent element's hierarchy.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/createElement|MDN - Document.createElement()}
 */
export function addElement<K extends keyof HTMLElementTagNameMap>(tagName: K, parentElement?: HTMLElement, index?: number): HTMLElementTagNameMap[K];

/**
 * Creates a new element of the given tag, and insert it into the first parent element with the given tag name.
 * @param childTagName The tag name of the element to create.
 * @param parentTagName The tag name of the parent element.
 * @param index The position at which the new element should be placed in its parent element's hierarchy.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Document/createElement|MDN - Document.createElement()}
 */
export function addElement<K extends keyof HTMLElementTagNameMap, KP extends keyof HTMLElementTagNameMap>(childTagName: K, parentTagName?: KP, index?: number): HTMLElementTagNameMap[K];

export function addElement<K extends keyof HTMLElementTagNameMap>(tagName: K, parentSelectors?: string|HTMLElement, index?: number): HTMLElementTagNameMap[K] {
  let parent: Node|null = null;
  // Query parent element if applicable
  if (parentSelectors) {
    parent = parentSelectors instanceof HTMLElement
        ? parentSelectors
        : getElement<HTMLElement>(parentSelectors);
  }
  // Use document as parent by default
  if (!parent) {
    parent = document;
  }

  // Fix index, clamp it between 0 and parent's child count
  index = Number(index) || parent.childNodes.length;
  index = Math.min(Math.max(index, 0), parent.childNodes.length);

  // Create the new element
  const newChild = document.createElement(tagName);
  // Append the element if it's supposed to be placed at the end
  if (index >= parent.childNodes.length) {
    parent.appendChild(newChild);
  }
  // Else, insert the new element at expected position
  else {
    parent.insertBefore(newChild, parent.childNodes[index]);
  }
  return newChild;
}

/**
 * Gets the first element in the page that match the given CSS selectors, and removes all its child elements.
 * @param selectors The CSS selectors to match.
 * @returns Returns true if the selected element exists and has been cleared successfully.
 * @see {@link http://developer.mozilla.org/docs/Web/API/Node/removeChild|MDN - Node.removeChild()}
 */
export function clear<E extends HTMLElement>(selectors: string): boolean;

/**
 * Removes all the child elements of a given one.
 * @param element The element of which to clear the hierarchy.
 * @returns Returns true if the selected element exists and has been cleared successfully.
 * @see {@link http://developer.mozilla.org/docs/Web/API/Node/removeChild|MDN - Node.removeChild()}
 */
export function clear<E extends HTMLElement>(element: HTMLElement): boolean;

/**
 * Gets the first element in the page that match the given tag name, and removes all its child elements.
 * @param tagName The tag name to match.
 * @returns Returns true if the selected element exists and has been cleared successfully.
 * @see {@link http://developer.mozilla.org/docs/Web/API/Node/removeChild|MDN - Node.removeChild()}
 */
export function clear<K extends keyof HTMLElementTagNameMap>(tagName: K): boolean;

export function clear(selectors: string|HTMLElement): boolean {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);

  if (!element) {
    return false;
  }

  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
  return true;
}