/**
 * @file Badge.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Badge component.
 *
 * @description
 * Defines BadgePosition union type and BadgeProps configuration interface for core badge controllers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size, Color } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- BADGE POSITION UNION TYPE
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

// ---------- BADGE PROPS INTERFACE
export interface BadgeProps extends BaseProps {
  color?: Color | undefined
  size?: Size | undefined
  position?: BadgePosition | undefined
}
