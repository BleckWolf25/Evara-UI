/**
 * @file Calendar.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Calendar component controller.
 *
 * @description
 * Defines CalendarProps configuration interface including min/max dates, value properties, and disabled dates arrays.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- CALENDAR PROPS INTERFACE
export interface CalendarProps extends BaseProps {
  value?: Date | null | undefined
  defaultValue?: Date | null | undefined
  onChange?: ((date: Date) => void) | undefined
  minDate?: Date | undefined
  maxDate?: Date | undefined
  disabledDates?: Date[] | undefined
}
