/**
 * @file Checkbox.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Checkbox component.
 *
 * @description
 * Extends core CheckboxProps with React InputHTMLAttributes, label ReactNode, and onCheckedChange callbacks.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { CheckboxProps as CoreCheckboxProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT CHECKBOX PROPS INTERFACE
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'checked' | 'defaultChecked' | 'required' | 'type'>,
    Omit<CoreCheckboxProps, 'name' | 'value'> {
  label?: ReactNode
  onCheckedChange?: (checked: boolean) => void
}
