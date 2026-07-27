/**
 * @file Checkbox.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Checkbox component controller.
 *
 * @description
 * Defines CheckboxProps configuration interface including checked, defaultChecked, indeterminate, and required flags.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- CHECKBOX PROPS INTERFACE
export interface CheckboxProps extends BaseProps {
  checked?: boolean | undefined
  defaultChecked?: boolean | undefined
  indeterminate?: boolean | undefined
  required?: boolean | undefined
  disabled?: boolean | undefined
  name?: string | undefined
  value?: string | undefined
}
