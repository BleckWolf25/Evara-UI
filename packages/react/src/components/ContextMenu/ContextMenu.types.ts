/**
 * @file ContextMenu.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React ContextMenu component.
 *
 * @description
 * Extends core ContextMenuProps with onClose callback interface and re-exports ContextMenuItem interface.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ContextMenuProps as CoreContextMenuProps, ContextMenuItem } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT CONTEXT MENU PROPS TYPE
export type ContextMenuProps = CoreContextMenuProps & {
  onClose?: () => void
}

export type { ContextMenuItem }
