/**
 * @file utils.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary DOM manipulation, prop merging, and keyboard constants utilities.
 *
 * @description
 * Implements prop merging algorithms with event handler chaining, focusable DOM element querying,
 * safe focus execution helpers, and keyboard event code constants.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { cn } from './index'

// ---------- CONSTANTS

// ---------- FOCUSABLE DOM SELECTOR QUERY
export const FOCUSABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'

// ---------- KEYBOARD KEY CONSTANTS
export const KEY_CODES = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const

// ---------- TYPES
export type Key = (typeof KEY_CODES)[keyof typeof KEY_CODES]

// ---------- FUNCTIONS

// ---------- PROP AND ATTRIBUTE MERGING HELPER
export function mergeProps(
  ...args: Array<Record<string, unknown> | null | undefined>
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const props of args) {
    // Early return guard clause for missing properties
    if (!props) {
      continue
    }
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const val = props[key]
        const prevVal = result[key]

        // ---------- EVENT HANDLER CHAINING
        if (
          key.startsWith('on') &&
          typeof val === 'function' &&
          typeof prevVal === 'function'
        ) {
          const prevFn = prevVal as (...args: unknown[]) => unknown
          const valFn = val as (...args: unknown[]) => unknown

          // Chain previous and current handler invocations sequentially
          result[key] = (...eventArgs: unknown[]) => {
            prevFn(...eventArgs)
            valFn(...eventArgs)
          }
        } else if (key === 'className' || key === 'class') {
          // ---------- CLASS NAME COMBINATION
          result[key] = cn(prevVal as string | undefined, val as string | undefined)
        } else if (
          key === 'style' &&
          prevVal &&
          typeof prevVal === 'object' &&
          val &&
          typeof val === 'object'
        ) {
          // ---------- INLINE STYLE OBJECT MERGING
          result[key] = {
            ...(prevVal as Record<string, unknown>),
            ...(val as Record<string, unknown>),
          }
        } else {
          // ---------- OVERWRITE ATTRIBUTE PROPERTY
          result[key] = val
        }
      }
    }
  }

  return result
}

// ---------- FOCUSABLE DOM ELEMENTS QUERY
export function getFocusableElements(element: HTMLElement | null): HTMLElement[] {
  // Guard clause for server-side rendering or missing target container
  if (typeof window === 'undefined' || !element) {
    return []
  }
  // Query all matching selector nodes and filter interactive elements
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.tabIndex !== -1 && !el.hasAttribute('disabled')
  )
}

// ---------- DOM ELEMENT FOCUS WRAPPER
export function focusElement(element: HTMLElement | null): void {
  // Guard clause for server-side rendering or missing target element
  if (typeof window === 'undefined' || !element) {
    return
  }
  try {
    element.focus()
  } catch (_e) {
    // Prevent focus exceptions from interrupting application execution
  }
}
