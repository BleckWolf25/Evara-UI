/**
 * @file Popover.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Popover component.
 *
 * @description
 * Extends core PopoverProps interface with optional Vue onClose callback prop.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { PopoverProps as CorePopoverProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE POPOVER PROPS INTERFACE
export interface PopoverProps extends CorePopoverProps {
  onClose?: () => void
}
