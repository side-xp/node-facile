/**
 * Features related to user inputs.
 * @module Interactions
 */

import { getElement } from './dom';

/**
 * Represents a field element.
 */
export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Represents the tag name of a field element.
 */
export type FieldElementTag = Pick<HTMLElementTagNameMap, 'input' | 'select' | 'textarea'>;

/**
 * Represents a function to use as callback for a "click" event.
 */
export type ClickCallback = (e?: PointerEvent) => void;

/**
 * Represents a function to use as callback for a "change" event.
 */
export type ChangeCallback = (e?: Event, newValue?: string) => void;

/**
 * Gets the first element in the page that match the given CSS selectors, and add a given callback as "click" event listener.
 * @param selectors The CSS selectors to match.
 * @param callback The function to call when the element is clicked.
 * @returns Returns true if the callback has been registered successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Element/click_event|MDN - Element.click event}
 * @example
 * // HTML
 * <button id="myButton">Click me!</button>
 * // JS
 * facile.onClick('#myButton', () => {
 *  console.log('Button clicked!');
 * });
 */
export function onClick<E extends HTMLElement>(selectors: string, callback: ClickCallback): boolean;

/**
 * Adds a given callback as "click" event listener.
 * @param element The element for which the callback will be registered.
 * @param callback The function to call when the element is clicked.
 * @returns Returns true if the callback has been registered successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Element/click_event|MDN - Element.click event}
 * @example
 * // HTML
 * <button id="myButton">Click me!</button>
 * // JS
 * const myButton = getElement('#myButton');
 * facile.onClick(myButton, () => {
 *  console.log('Button clicked!');
 * });
 */
export function onClick<E extends HTMLElement>(element: E, callback: ClickCallback): boolean;

/**
 * Gets the first element in the page that match the given tag name, and add a given callback as "click" event listener.
 * @param tagName The tag name to match.
 * @param callback The function to call when the element is clicked.
 * @returns Returns true if the callback has been registered successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Element/click_event|MDN - Element.click event}
 * @example
 * // HTML
 * <button>Click me!</button>
 * // JS
 * facile.onClick('button', () => {
 *  console.log('Button clicked!');
 * });
 */
export function onClick<K extends keyof HTMLElementTagNameMap>(tagName: K, callback: ClickCallback): boolean;

export function onClick(selectors: string | HTMLElement, callback: ClickCallback): boolean {
  const element =
    selectors instanceof HTMLElement
      ? selectors
      : getElement<HTMLElement>(selectors);

  if (!element) {
    return false;
  }

  element.addEventListener('click', callback);
  return true;
}

/**
 * Gets the first element in the page that match the given CSS selectors, and add a given callback as "change" event listener.
 * @param selectors The CSS selectors to match.
 * @param callback The function to call when the value of the element changes.
 * @returns Returns true if the callback has been registered successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Element/change_event|MDN - Element.change event}
 * @example
 * // HTML
 * <input id="firstname" type="text" name="firstname"/>
 * // JS
 * facile.onChange('#firstname', (e, newValue) => {
 *  console.log(newValue);
 * });
 */
export function onChange(selectors: string, callback: ChangeCallback): boolean;

/**
 * Adds a given callback as "change" event listener to a given field element.
 * @param element The CSS selectors to match.
 * @param callback The function to call when the value of the element changes.
 * @returns Returns true if the callback has been registered successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Element/change_event|MDN - Element.change event}
 * @example
 * // HTML
 * <input id="firstname" type="text" name="firstname"/>
 * // JS
 * const firstnameField = facile.getElement('#firstname');
 * facile.onChange(firstnameField, (e, newValue) => {
 *  console.log(newValue);
 * });
 */
export function onChange<E extends FieldElement>(element: E, callback: ChangeCallback): boolean;

/**
 * Gets the first element in the page that match the given tag name, and add a given callback as "change" event listener.
 * @param tagName The tag name to match.
 * @param callback The function to call when the value of the element changes.
 * @returns Returns true if the callback has been registered successfully.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Element/change_event|MDN - Element.change event}
 * @example
 * // HTML
 * <input type="text" name="firstname"/>
 * // JS
 * facile.onChange('input', (e, newValue) => {
 *  console.log(newValue);
 * });
 */
export function onChange<K extends FieldElementTag>(tagName: K, callback: ChangeCallback): boolean;

export function onChange(selectors: string | FieldElement, callback: ChangeCallback): boolean {
  const element =
    selectors instanceof HTMLElement
      ? selectors
      : getElement<HTMLElement>(selectors);

  if (!element) {
    return false;
  }
  
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    element.addEventListener('change', (e) => {
      callback(e, (e.target as FieldElement).value);
    });
  return true;
  }

  console.warn(`Failed to listen value change: The element ${selectors} is not a valid field element.`);
  return false;
}

/**
 * Displays a popup with text field inviting the user to type a text.
 * @param message The message to display in the prompt window.
 * @param defaultValue The default value to return if the prompt field is left empty.
 * @returns Returns the answer typed by the user.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/prompt|MDN - Window.prompt()}
 * @example
 * const answer = facile.ask("What's your name?");
 * console.log(answer);
 */
export function ask(message: string, defaultValue?: string): string | null {
  const answer = prompt(message, defaultValue);
  return answer;
}

/**
 * Displays a popup with text field inviting the user to type a text, and converts the value into a number.
 * @param message The message to display in the prompt window.
 * @param allowDecimals By default, only whole numbers are allowed. If enabled, the user can use dot or comma ('.' or ',') as decimals
 * separator.
 * @returns Returns the number typed by the user.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/prompt|MDN - Window.prompt()}
 * @example
 * const age = facile.ask('How old are you?');
 * console.log(age);
 */
export function askNumber(message: string, allowDecimals = false): number | null {
  let answer = prompt(message);
  // Stop if the user didn't type anything
  if (!answer) {
    return null;
  }

  answer = answer.replaceAll(',', '.');
  return allowDecimals
    ? parseFloat(answer)
    : parseInt(answer, 10);
}

/**
 * Displays a message in a popup with a single "Ok" button.
 * @param message The message to display in the popup window.
 * @see {@link https://developer.mozilla.org/docs/Web/API/Window/alert|MDN - Window.alert()}
 * @example
 * facile.ask('Now you see me!');
 */
export function say(message: string): void {
  alert(message);
}

/**
 * Displays a message in a popup window with "Ok" and "Cancel" buttons.
 * @param message The message to display in the popup window.
 * @returns Returns true if the user has clicked on "Ok", or false if they clicked on "Cancel".
 * @example
 * facile.confirm('Do you agree?');
 */
export function confirm(message: string): boolean {
  return window.confirm(message);
}

/**
 * Gets the first element in the page that match the given CSS selectors, and get the value of that field.
 * @param selectors The CSS selectors to match.
 * @returns Returns the value from the found field element, or null if the element doesn't exist or is not a valid field element.
 * @example
 * // HTML
 * <input id="firstname" type="text" name="firstname"/>
 * // JS
 * const value = facile.getValue('#firstname');
 * console.log(value);
 */
export function getValue(selectors: string): string | null;

/**
 * Get the value of a given field element.
 * @param element The field element of which to get the value.
 * @returns Returns the value from the given field element, or null if the element doesn't exist or is not a valid field element.
 * @example
 * // HTML
 * <input id="firstname" type="text" name="firstname"/>
 * // JS
 * const firstnameField = facile.getElement('#firstname'):
 * const value = facile.getValue(firstnameField);
 * console.log(value);
 */
export function getValue<E extends FieldElement>(element: E): string | null;

/**
 * Gets the first element in the page that match the given tag name, and get the value of that field.
 * @param tagName The tag name to match.
 * @returns Returns the value from the found field element, or null if the element doesn't exist or is not a valid field element.
 * @example
 * // HTML
 * <input type="text" name="firstname"/>
 * // JS
 * const value = facile.getValue('input');
 * console.log(value);
 */
export function getValue<K extends FieldElementTag>(tagName: K): string | null;

export function getValue(selectors: string | FieldElement): string | null {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);
  
  if (!element) {
    return null;
  }

  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return element.value;
  }

  console.warn(`Failed to get field value: The element ${selectors} is not a valid field element.`);
  return null;
}

/**
 * Gets the first element in the page that match the given CSS selectors, and set the value of that field.
 * @param selectors The CSS selectors to match.
 * @returns Returns true if the element is a valid field element and its value has been assigned successfully.
 * @example
 * // HTML
 * <input id="firstname" type="text" name="firstname"/>
 * // JS
 * facile.setValue('#firstname', 'New field value');
 */
export function setValue(selectors: string, value: string): boolean;

/**
 * Get the value of a given field element.
 * @param element The field element of which to get the value.
 * @returns Returns the value from the given field element, or null if the element doesn't exist or is not a valid field element.
 * @example
 * // HTML
 * <input id="firstname" type="text" name="firstname"/>
 * // JS
 * const firstnameField = facile.getElement('#firstname'):
 * facile.setValue('#firstname', 'New field value');
 */
export function setValue<E extends FieldElement>(element: E, value: string): boolean;

/**
 * Gets the first element in the page that match the given tag name, and get the value of that field.
 * @param tagName The tag name to match.
 * @returns Returns the value from the found field element, or null if the element doesn't exist or is not a valid field element.
 * @example
 * // HTML
 * <input type="text" name="firstname"/>
 * // JS
 * facile.setValue('input', 'New field value');
 */
export function setValue<K extends FieldElementTag>(tagName: K, value: string): boolean;

export function setValue(selectors: string | FieldElement, value: string): boolean {
  const element = selectors instanceof HTMLElement
    ? selectors
    : getElement<HTMLElement>(selectors);
  
  if (!element) {
    return false;
  }

  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    element.value = value;
    return true;
  }

  console.warn(`Failed to set field value: The element ${selectors} is not a valid field element.`);
  return false;
}