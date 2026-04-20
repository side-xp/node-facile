/**
 * String utility functions.
 * @module String
 */

/**
 * Returns the string with its first character converted to uppercase.
 * @param value The string to capitalize.
 * @returns The capitalized string.
 * @example
 * capitalize('hello world')  // 'Hello world'
 * capitalize('already')      // 'Already'
 * capitalize('')             // ''
 */
export function capitalize(value: string): string {
  if (value.length === 0) return value
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

/**
 * Shortens a string to a maximum length, appending an ellipsis (`…`) if truncated.
 * The `maxLength` includes the ellipsis character.
 * @param value The string to truncate.
 * @param maxLength The maximum length of the returned string, including the ellipsis.
 * @returns The truncated string, or the original string if it fits within `maxLength`.
 * @example
 * truncate('Hello, World!', 8)  // 'Hello, …'
 * truncate('Hi', 8)             // 'Hi'
 * truncate('Hello, World!', 1)  // '…'
 */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value
  return `${value.slice(0, Math.max(0, maxLength - 1))}…`
}

/**
 * Converts a string into a URL-friendly slug.
 * - Accented characters are converted to their base ASCII equivalents
 * - Emojis and other non-ASCII characters are removed
 * - Whitespace characters are replaced with `-`
 * - Other non-alphanumeric characters are replaced with `_`
 * - Consecutive separators are collapsed into one
 * - Leading and trailing separators are removed
 * @param value The string to slugify.
 * @returns The slugified string.
 * @example
 * slugify('Hello World')     // 'hello-world'
 * slugify('Héllo Wörld')     // 'hello-world'
 * slugify('foo-bar')         // 'foo-bar'
 * slugify('foo@bar')         // 'foo_bar'
 * slugify('foo @ bar')       // 'foo-bar'
 * slugify('hello!')          // 'hello'
 */
export function slugify(value: string): string {
  return (
    value
      // Decompose accented characters into base letter + combining diacritic (eg. "è" becomes "e" + "`"
      .normalize('NFD')
      // Remove all combining diacritics, leaving only the base letters
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      // Replace anything that is not a letter, digit, whitespace, or hyphen with an underscore
      // Note that this also strips emojis and other non-ASCII symbols
      .replace(/[^\p{L}\p{N}\s-]/gu, '_')
      // Collapse runs of whitespace and hyphens into a single hyphen
      .replace(/[\s-]+/g, '-')
      // Collapse any separator sequence that contains a hyphen into a single hyphen
      // eg. "_-_" or "-_" or "_-"" all become "-"
      .replace(/[-_]*[-][-_]*/g, '-')
      // Collapse remaining runs of underscores into a single underscore
      .replace(/[-_]*[_][-_]*/g, '_')
      // Remove leading and trailing separators
      .replace(/^[-_]+|[-_]+$/g, '')
  )
}

/**
 * Counts the number of non-overlapping occurrences of a pattern in a string.
 * @param value The string to search within.
 * @param pattern The substring or regular expression to search for.
 * @returns The number of occurrences found.
 * @example
 * occurrences('banana', 'a')       // 3
 * occurrences('banana', 'an')      // 2
 * occurrences('hello', 'xyz')      // 0
 * occurrences('aaa', 'aa')         // 1 (non-overlapping)
 * occurrences('test', /t/g)        // 2
 */
export function occurrences(value: string, pattern: string | RegExp): number {
  if (typeof pattern === 'string') {
    if (pattern.length === 0) return 0
    let count = 0
    let pos = value.indexOf(pattern)
    while (pos !== -1) {
      count++
      pos = value.indexOf(pattern, pos + pattern.length)
    }
    return count
  }
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
  return (value.match(new RegExp(pattern.source, flags)) ?? []).length
}
