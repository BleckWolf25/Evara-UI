/**
 * @file Field.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Field component controller.
 *
 * @description
 * Defines FieldProps configuration interface including label, helper text, error messages, and required/disabled state flags.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- FIELD PROPS INTERFACE
export interface FieldProps extends BaseProps {
  label?: string | undefined
  helperText?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  disabled?: boolean | undefined
}
