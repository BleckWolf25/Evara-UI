/**
 * @file DatePicker.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue DatePicker component.
 *
 * @description
 * Extends core DatePickerProps interface with Vue v-model value and modelValue date parameters.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { DatePickerProps as CoreDatePickerProps, DateRange } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE DATE PICKER PROPS INTERFACE
export interface DatePickerProps extends Omit<CoreDatePickerProps, 'value' | 'defaultValue'> {
  value?: Date | DateRange | null
  modelValue?: Date | DateRange | null
  defaultValue?: Date | DateRange | null
}
