/**
 * @file DatePicker.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for DatePicker single and date-range selection components.
 *
 * @description
 * Computes class names, date ranges, min/max bounds checking, selected date highlights, and text input ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { DatePickerProps, DateRange } from './DatePicker.types'

// ---------- CLASSES

// ---------- CLASS: DATE PICKER CONTROLLER
export class DatePickerController {
  // ---------- FIELDS AND CONSTANTS
  private props: DatePickerProps

  // ---------- CONSTRUCTOR
  constructor(props: DatePickerProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET DATE PICKER MAIN CONTAINER CLASSES
  getDatePickerClasses() {
    const { size = 'md', disabled = false, range = false } = this.props

    return [
      'ui-date-picker',
      `ui-date-picker--${size}`,
      disabled ? 'ui-date-picker--disabled' : '',
      range ? 'ui-date-picker--range' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET TRIGGER BUTTON CLASS NAME
  getTriggerClasses() {
    return 'ui-date-picker__trigger'
  }

  // ---------- GET CALENDAR POPUP CLASS NAME
  getCalendarClasses() {
    return 'ui-date-picker__calendar'
  }

  // ---------- GET HEADER CONTAINER CLASS NAME
  getHeaderClasses() {
    return 'ui-date-picker__header'
  }

  // ---------- GET MONTH DISPLAY CLASS NAME
  getMonthClasses() {
    return 'ui-date-picker__month'
  }

  // ---------- GET YEAR DISPLAY CLASS NAME
  getYearClasses() {
    return 'ui-date-picker__year'
  }

  // ---------- GET NAVIGATION BUTTON CLASS NAME
  getNavigationClasses() {
    return 'ui-date-picker__navigation'
  }

  // ---------- GET DAYS HEADER ROW CLASS NAME
  getDaysHeaderClasses() {
    return 'ui-date-picker__days-header'
  }

  // ---------- GET DAY COLUMN CLASS NAME
  getDayClasses() {
    return 'ui-date-picker__day'
  }

  // ---------- GET DATE CELL CLASS NAMES
  getDateClasses(_date: Date, isSelected: boolean, isInRange: boolean, isDisabled: boolean) {
    return [
      'ui-date-picker__date',
      isSelected ? 'ui-date-picker__date--selected' : '',
      isInRange ? 'ui-date-picker__date--in-range' : '',
      isDisabled ? 'ui-date-picker__date--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { disabled, placeholder } = this.props

    return {
      role: 'textbox',
      'aria-disabled': disabled,
      'aria-placeholder': placeholder,
    }
  }

  // ---------- CHECK RANGE SELECTION MODE
  isRange() {
    return this.props.range
  }

  // ---------- CHECK DISABLED STATE
  isDisabled() {
    return this.props.disabled
  }

  // ---------- GET PLACEHOLDER TEXT
  getPlaceholder() {
    return this.props.placeholder
  }

  // ---------- GET CURRENT VALUE
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

  // ---------- CHECK IF DATE IS DISABLED
  isDateDisabled(date: Date): boolean {
    const { minDate, maxDate } = this.props

    // ---------- MINIMUM DATE BOUND CHECK
    if (minDate && date < minDate) {
      return true
    }

    // ---------- MAXIMUM DATE BOUND CHECK
    if (maxDate && date > maxDate) {
      return true
    }

    return false
  }

  // ---------- CHECK IF DATE IS CURRENTLY SELECTED
  isDateSelected(date: Date): boolean {
    const value = this.props.value

    // Early return guard clause for missing value
    if (!value) {
      return false
    }

    // ---------- DATE RANGE CHECK BRANCH
    if (this.isRange()) {
      const range = value as DateRange
      const startSelected = range.start ? this.isSameDay(date, range.start) : false
      const endSelected = range.end ? this.isSameDay(date, range.end) : false
      if (startSelected) return true
      if (endSelected) return true
      return false
    }

    return this.isSameDay(date, value as Date)
  }

  // ---------- CHECK IF DATE FALLS WITHIN SELECTED RANGE
  isDateInRange(date: Date): boolean {
    // Early return guard clause for single-date mode
    if (!this.isRange()) {
      return false
    }

    const value = this.props.value as DateRange
    // Early return guard clause for incomplete range
    if (!value.start || !value.end) {
      return false
    }

    return date >= value.start && date <= value.end
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
