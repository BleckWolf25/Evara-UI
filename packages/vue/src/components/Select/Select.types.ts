/**
 * @file Select.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Select component.
 *
 * @description
 * Extends core SelectProps interface with Vue modelValue and string/array bindings.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SelectProps as CoreSelectProps, SelectOption } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE SELECT PROPS INTERFACE
export interface SelectProps extends Omit<CoreSelectProps, 'value' | 'defaultValue'> {
  value?: string | string[]
  modelValue?: string | string[]
  defaultValue?: string | string[]
}
export type { SelectOption }
