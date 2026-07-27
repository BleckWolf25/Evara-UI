/**
 * @file ButtonGroup.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the ButtonGroup component controller.
 *
 * @description
 * Defines ButtonGroupOrientation union type and ButtonGroupProps configuration interface for button groups.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- BUTTON GROUP ORIENTATION UNION TYPE
export type ButtonGroupOrientation = 'horizontal' | 'vertical'

// ---------- BUTTON GROUP PROPS INTERFACE
export interface ButtonGroupProps extends BaseProps {
  orientation?: ButtonGroupOrientation | undefined
  size?: Size | undefined
}
