/**
 * @file Calendar.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Calendar component.
 *
 * @description
 * Extends core CalendarProps interface with Vue modelValue and v-model date properties.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import type { CalendarProps as CoreCalendarProps } from '@bleckwolf25/core'

// ---------- VUE CALENDAR PROPS INTERFACE
export interface CalendarProps extends Omit<CoreCalendarProps, 'value' | 'defaultValue'> {
  value?: Date
  modelValue?: Date
  defaultValue?: Date
}
