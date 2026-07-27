/**
 * @file AlertDialog.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React AlertDialog component.
 *
 * @description
 * Extends core AlertDialogProps with React-specific onClose event callback signature.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { AlertDialogProps as CoreAlertDialogProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT ALERT DIALOG PROPS TYPE
export type AlertDialogProps = CoreAlertDialogProps & {
  onClose?: () => void
}
