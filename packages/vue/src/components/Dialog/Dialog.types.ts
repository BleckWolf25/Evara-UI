/**
 * @file Dialog.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Dialog component.
 *
 * @description
 * Extends core DialogProps interface with optional Vue onClose callback prop.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { DialogProps as CoreDialogProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE DIALOG PROPS INTERFACE
export interface DialogProps extends CoreDialogProps {
  onClose?: () => void
}
