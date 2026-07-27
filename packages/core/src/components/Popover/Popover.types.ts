/**
 * @file Popover.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Popover component controller.
 *
 * @description
 * Defines PopoverPosition union type and PopoverProps configuration interface for floating popover panels.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- POPOVER POSITION ALIGNMENT UNION TYPE
export type PopoverPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

// ---------- POPOVER PROPS INTERFACE
export interface PopoverProps extends BaseProps {
  open?: boolean | undefined
  defaultOpen?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  position?: PopoverPosition | undefined
  closeOnClickOutside?: boolean | undefined
}
