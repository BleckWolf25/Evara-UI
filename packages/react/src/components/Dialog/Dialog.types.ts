/**
 * @file Dialog.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Dialog component.
 *
 * @description
 * Extends core DialogProps with ReactNode children and onClose callback signatures.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { DialogProps as CoreDialogProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT DIALOG PROPS TYPE
export type DialogProps = CoreDialogProps & {
  children: React.ReactNode
  onClose?: () => void
}
