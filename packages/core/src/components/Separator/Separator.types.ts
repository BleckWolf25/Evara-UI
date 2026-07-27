/**
 * @file Separator.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Separator component controller.
 *
 * @description
 * Defines SeparatorOrientation union type, SeparatorColor union type, and SeparatorProps configuration interface.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- SEPARATOR ORIENTATION UNION TYPE
export type SeparatorOrientation = 'horizontal' | 'vertical'

// ---------- SEPARATOR COLOR UNION TYPE
export type SeparatorColor = 'default' | 'primary' | 'secondary'

// ---------- SEPARATOR PROPS INTERFACE
export interface SeparatorProps extends BaseProps {
  orientation?: SeparatorOrientation | undefined
  color?: SeparatorColor | undefined
}
