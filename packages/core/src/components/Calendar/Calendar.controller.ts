/**
 * @file Calendar.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Calendar date selection component.
 *
 * @description
 * Computes calendar grid CSS classes, date disability states, min/max bounds checking,
 * selection flags, and grid accessibility ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CalendarProps } from './Calendar.types'

// ---------- CLASSES

// ---------- CLASS: CALENDAR CONTROLLER
export class CalendarController {
  // ---------- FIELDS AND CONSTANTS
  private props: CalendarProps

  // ---------- CONSTRUCTOR
  constructor(props: CalendarProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET MAIN CALENDAR CLASS NAME
  getCalendarClasses() {
    return 'ui-calendar'
  }

  // ---------- GET HEADER CONTAINER CLASS NAME
  getHeaderClasses() {
    return 'ui-calendar__header'
  }

  // ---------- GET MONTH LABEL CLASS NAME
  getMonthClasses() {
    return 'ui-calendar__month'
  }

  // ---------- GET YEAR LABEL CLASS NAME
  getYearClasses() {
    return 'ui-calendar__year'
  }

  // ---------- GET NAVIGATION CONTAINER CLASS NAME
  getNavigationClasses() {
    return 'ui-calendar__navigation'
  }

  // ---------- GET DAYS HEADER CLASS NAME
  getDaysHeaderClasses() {
    return 'ui-calendar__days-header'
  }

  // ---------- GET DAY COLUMN CLASS NAME
  getDayClasses() {
    return 'ui-calendar__day'
  }

  // ---------- GET DATE CELL CLASS NAMES
  getDateClasses(_date: Date, isSelected: boolean, isToday: boolean, isDisabled: boolean) {
    return [
      'ui-calendar__date',
      isSelected ? 'ui-calendar__date--selected' : '',
      isToday ? 'ui-calendar__date--today' : '',
      isDisabled ? 'ui-calendar__date--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD GRID ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'grid',
      'aria-label': 'Calendar',
    }
  }

  // ---------- GET SELECTED VALUE
  getValue() {
    return this.props.value
  }

  // ---------- GET DEFAULT VALUE
  getDefaultValue() {
    return this.props.defaultValue
  }

  // ---------- GET MINIMUM DATE BOUND
  getMinDate() {
    return this.props.minDate
  }

  // ---------- GET MAXIMUM DATE BOUND
  getMaxDate() {
    return this.props.maxDate
  }

  // ---------- GET DISABLED DATES ARRAY
  getDisabledDates() {
    return this.props.disabledDates
  }

  // ---------- CHECK IF GIVEN DATE IS DISABLED
  isDateDisabled(date: Date): boolean {
    const { minDate, maxDate, disabledDates } = this.props

    // ---------- MINIMUM DATE BOUNDARY CHECK
    if (minDate && date < minDate) {
      return true
    }

    // ---------- MAXIMUM DATE BOUNDARY CHECK
    if (maxDate && date > maxDate) {
      return true
    }

    // ---------- DISABLED DATES ARRAY MATCHING
    if (disabledDates) {
      return disabledDates.some((disabledDate) => this.isSameDay(date, disabledDate))
    }

    return false
  }

  // ---------- CHECK IF GIVEN DATE IS CURRENTLY SELECTED
  isDateSelected(date: Date): boolean {
    const value = this.props.value

    // Early return guard clause for null value
    if (!value) {
      return false
    }

    return this.isSameDay(date, value)
  }

  // ---------- CHECK IF GIVEN DATE IS TODAY
  isDateToday(date: Date): boolean {
    const today = new Date()
    return this.isSameDay(date, today)
  }

  // ---------- PRIVATE HELPER: SAME DAY COMPARISON
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }
}
