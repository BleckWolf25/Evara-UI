/**
 * @file AlertDialog.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the AlertDialog component.
 *
 * @description
 * Defines AlertDialogProps configuration interface including title, description, button labels, and callback events.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- ALERT DIALOG PROPS INTERFACE
export interface AlertDialogProps extends BaseProps {
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  title?: string | undefined
  description?: string | undefined
  confirmLabel?: string | undefined
  cancelLabel?: string | undefined
  onConfirm?: (() => void) | undefined
  onCancel?: (() => void) | undefined
}
