/**
 * @file ContextMenu.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue ContextMenu component.
 *
 * @description
 * Extends core ContextMenuProps interface with optional Vue onClose callback prop.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ContextMenuProps as CoreContextMenuProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE CONTEXT MENU PROPS INTERFACE
export interface ContextMenuProps extends CoreContextMenuProps {
  onClose?: () => void
}
