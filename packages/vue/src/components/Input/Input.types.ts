/**
 * @file Input.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Input component.
 *
 * @description
 * Extends core InputProps interface with Vue modelValue and string/number value types.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputProps as CoreInputProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE INPUT PROPS INTERFACE
export interface InputProps extends Omit<CoreInputProps, 'value' | 'defaultValue' | 'type'> {
  value?: string | number
  modelValue?: string | number
  defaultValue?: string | number
  type?: string
}
