/**
 * @file Select.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Select component controller.
 *
 * @description
 * Defines SelectOption interface and SelectProps configuration interface supporting single/multi-selection and search filter options.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- SELECT OPTION INTERFACE
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean | undefined
}

// ---------- SELECT PROPS INTERFACE
export interface SelectProps extends BaseProps {
  options: SelectOption[]
  value?: string | string[] | undefined
  defaultValue?: string | string[] | undefined
  onChange?: ((value: string | string[]) => void) | undefined
  multiple?: boolean | undefined
  searchable?: boolean | undefined
  disabled?: boolean | undefined
  placeholder?: string | undefined
  size?: Size | undefined
}
