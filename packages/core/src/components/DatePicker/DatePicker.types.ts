/**
 * @file DatePicker.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the DatePicker component controller.
 *
 * @description
 * Defines DateRange interface and DatePickerProps configuration interface supporting single date and range pickers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- DATE RANGE INTERFACE
export interface DateRange {
  start: Date | null
  end: Date | null
}

// ---------- DATE PICKER PROPS INTERFACE
export interface DatePickerProps extends BaseProps {
  value?: Date | DateRange | null | undefined
  defaultValue?: Date | DateRange | null | undefined
  onChange?: ((value: Date | DateRange | null) => void) | undefined
  minDate?: Date | undefined
  maxDate?: Date | undefined
  range?: boolean | undefined
  disabled?: boolean | undefined
  placeholder?: string | undefined
  size?: Size | undefined
}
