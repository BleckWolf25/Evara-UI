/**
 * @file Input.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Input component controller.
 *
 * @description
 * Defines InputVariant union type and InputProps configuration interface for text boxes and form inputs.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- INPUT VARIANT UNION TYPE
export type InputVariant = 'default' | 'error' | 'success'

// ---------- INPUT PROPS INTERFACE
export interface InputProps extends BaseProps {
  variant?: InputVariant | undefined
  size?: Size | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  placeholder?: string | undefined
  value?: string | undefined
  defaultValue?: string | undefined
  type?: string | undefined
}
