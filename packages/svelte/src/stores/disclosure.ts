/**
 * @file disclosure.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Svelte disclosure toggle store helper.
 *
 * @description
 * Manages open/close state using Svelte writable stores, exposing open, close, and toggle action helpers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { writable } from 'svelte/store'
import type { DialogProps } from '@bleckwolf25/core'

// ---------- FUNCTIONS

// ---------- DISCLOSURE STORE CREATOR
export function useDisclosure(options: DialogProps = {}) {
  // ---------- SVELTE WRITABLE STORE INITIALIZATION
  const isOpen = writable<boolean>(options.open ?? false)

  return {
    isOpen,
    // ---------- OPEN DIALOG ACTION
    open: () => {
      isOpen.set(true)
    },
    // ---------- CLOSE DIALOG ACTION
    close: () => {
      isOpen.set(false)
    },
    // ---------- TOGGLE DIALOG ACTION
    toggle: () => {
      isOpen.update((prev) => !prev)
    },
  }
}
