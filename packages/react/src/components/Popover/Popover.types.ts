/**
 * @file Popover.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Popover component.
 *
 * @description
 * Extends core PopoverProps with ReactNode children, trigger elements, and onClose callback signatures.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { PopoverProps as CorePopoverProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT POPOVER PROPS TYPE
export type PopoverProps = CorePopoverProps & {
  children: React.ReactNode
  trigger?: React.ReactNode
  onClose?: () => void
}
