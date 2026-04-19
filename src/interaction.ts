/**
 * Utilities for handling user interactions.
 * @module Interaction
 */

import { getElement } from './dom'

//#region onClick()

/**
 * Represents a callback invoked when a click event occurs.
 */
export type ClickCallback = (event: MouseEvent) => void

/**
 * Registers a callback to be invoked when the given element is clicked.
 * @param element The target element.
 * @param callback The function to call when the element is clicked.
 * @example
 * // HTML
 * <button id="my-button">Click Me!</button>
 * // JS
 * const btn = facile.getElement('#my-button');
 * facile.onClick(btn, () => facile.say('Clicked!'));
 */
export function onClick(element: HTMLElement, callback: ClickCallback): void

/**
 * Registers a callback to be invoked when the first element matching the given tag name is clicked.
 * Does nothing if no element is found.
 * @param tag The HTML tag name to search for.
 * @param callback The function to call when the element is clicked.
 * @example
 * // HTML
 * <button>Click Me!</button>
 * // JS
 * facile.onClick('button', () => facile.say('Clicked!'));
 */
export function onClick<K extends keyof HTMLElementTagNameMap>(tag: K, callback: ClickCallback): void

/**
 * Registers a callback to be invoked when the first element matching the given CSS selector is clicked.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @param callback The function to call when the element is clicked.
 * @example
 * // HTML
 * <button id="my-button">Click Me!</button>
 * // JS
 * facile.onClick('#my-button', () => facile.say('Clicked!'));
 */
export function onClick(selector: string, callback: ClickCallback): void

export function onClick(target: HTMLElement | string, callback: ClickCallback): void {
  const el = typeof target === 'string' ? getElement<HTMLElement>(target) : target
  if (el) el.addEventListener('click', callback)
}

//#endregion

//#region onChange()

/**
 * Represents a form field element that can emit a `change` event.
 */
export type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

/**
 * Represents a callback invoked when a form field value changes.
 * @param value The new value of the field. For checkboxes and radio buttons, this is a `boolean`.
 * For all other fields, this is a `string`.
 * @param event The original change event.
 */
export type ChangeCallback = (value: string | boolean, event: Event) => void

/**
 * Registers a callback to be invoked when the value of the given form field changes.
 * @param element The target form field element.
 * @param callback The function to call when the value changes.
 * @example
 * // HTML
 * <input id="username" type="text" />
 * // JS
 * const input = facile.getElement('#username');
 * facile.onChange(input, (value) => facile.say(`Hello, ${value}!`));
 */
export function onChange(element: FormField, callback: ChangeCallback): void

/**
 * Registers a callback to be invoked when the value of the first form field matching the given tag name changes. Does
 * nothing if no element is found.
 * @param tag The HTML tag name of the form field to search for.
 * @param callback The function to call when the value changes.
 * @example
 * // HTML
 * <input type="text" />
 * // JS
 * facile.onChange('input', (value) => facile.say(`Hello, ${value}!`));
 */
export function onChange(
  tag: keyof Pick<HTMLElementTagNameMap, 'input' | 'select' | 'textarea'>,
  callback: ChangeCallback,
): void

/**
 * Registers a callback to be invoked when the value of the first form field matching the given CSS selector changes.
 * Does nothing if no element is found.
 * @param selector A CSS selector string.
 * @param callback The function to call when the value changes.
 * @example
 * // HTML
 * <input id="username" type="text" />
 * // JS
 * facile.onChange('#username', (value) => facile.say(`Hello, ${value}!`));
 */
export function onChange(selector: string, callback: ChangeCallback): void

export function onChange(target: FormField | string, callback: ChangeCallback): void {
  const el = typeof target === 'string' ? getElement<FormField>(target) : target
  if (!el) return
  el.addEventListener('change', (event) => {
    const value =
      el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio') ? el.checked : el.value
    callback(value, event)
  })
}

//#endregion
