/**
 * @file Button.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript type definitions for the Button component controller.
 *
 * @description
 * Defines button variant union types and ButtonProps configuration interface for core button controllers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- BUTTON VARIANT UNION TYPE
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

// ---------- BUTTON PROPS INTERFACE
export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}
