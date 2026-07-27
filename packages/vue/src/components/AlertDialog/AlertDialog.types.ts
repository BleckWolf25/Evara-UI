/**
 * @file AlertDialog.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue AlertDialog component.
 *
 * @description
 * Extends core AlertDialogProps interface with optional confirm, cancel, and close callbacks for Vue components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import type { AlertDialogProps as CoreAlertDialogProps } from '@bleckwolf25/core'

// ---------- VUE ALERT DIALOG PROPS INTERFACE
export interface AlertDialogProps extends CoreAlertDialogProps {
  onConfirm?: () => void
  onCancel?: () => void
  onClose?: () => void
}
