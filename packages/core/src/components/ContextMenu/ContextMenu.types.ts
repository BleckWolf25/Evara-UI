/**
 * @file ContextMenu.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the ContextMenu component controller.
 *
 * @description
 * Defines ContextMenuItem interface and ContextMenuProps configuration interface including (x, y) screen coordinates.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- CONTEXT MENU ITEM INTERFACE
export interface ContextMenuItem {
  label: string
  onClick?: (() => void) | undefined
  disabled?: boolean | undefined
  divider?: boolean | undefined
}

// ---------- CONTEXT MENU PROPS INTERFACE
export interface ContextMenuProps extends BaseProps {
  items: ContextMenuItem[]
  open?: boolean | undefined
  onOpenChange?: ((open: boolean) => void) | undefined
  x?: number | undefined
  y?: number | undefined
}
