/**
 * @file Checkbox.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Checkbox component.
 *
 * @description
 * Extends core CheckboxProps interface with Vue modelValue and checked binding definitions.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CheckboxProps as CoreCheckboxProps } from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE CHECKBOX PROPS INTERFACE
export interface CheckboxProps extends Omit<CoreCheckboxProps, 'checked' | 'defaultChecked' | 'value'> {
  checked?: boolean
  modelValue?: boolean
  defaultChecked?: boolean
  label?: string
  name?: string
  value?: string | number
}
