/**
 * @file Dialog.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Dialog component controller.
 *
 * @description
 * Defines DialogProps configuration interface including open states, focus trapping, overlay dismiss behavior, and ARIA labelledby/describedby.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- DIALOG PROPS INTERFACE
export interface DialogProps extends BaseProps {
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  id?: string | undefined
  ariaLabelledBy?: string | undefined
  ariaDescribedBy?: string | undefined
  closeOnEscape?: boolean | undefined
  closeOnOverlayClick?: boolean | undefined
  trapFocus?: boolean | undefined
}
