/**
 * @file index.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Utility functions and string formatting helpers for core controllers.
 *
 * @description
 * Provides class name concatenation helper `cn`, unique DOM ID generator `createId`,
 * execution debouncer `debounce`, and re-exports object property merging helpers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- UTILITY FUNCTIONS

// ---------- CLASS NAME CONCATENATION HELPER
export const cn = (...classes: Array<string | undefined | null | false>): string => {
  // Join all truthy class names with a single space separator
  return classes.filter(Boolean).join(' ')
}

// ---------- UNIQUE DOM ID GENERATOR
export const createId = (prefix = 'evara'): string => {
  // Generate random alphanumeric prefix string
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`
}

// ---------- DEBOUNCE FUNCTION EXECUTION HELPER
export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  delay: number,
): ((...args: Args) => void) => {
  // Store reference to active timeout handle
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Args) => {
    // Reset timer on consecutive calls before execution
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// ---------- RE-EXPORTS
export * from './utils'