/**
 * @file DatePicker.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React DatePicker UI component.
 *
 * @description
 * Renders date picker popover inputs supporting single-date, date-range selections, month/year navigation grid, and click-outside popover toggles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState, useRef, useEffect } from 'react'
import { DatePickerController, type DateRange } from '@bleckwolf25/core'
import type { DatePickerProps } from './DatePicker.types'
import './DatePicker.css'

// ---------- COMPONENTS

// ---------- REACT DATE PICKER COMPONENT
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      range = false,
      disabled = false,
      placeholder = 'Select date...',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS DATE PICKER CONTROLLER INITIALIZATION
    const controller = new DatePickerController({
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      range,
      disabled,
      placeholder,
      size,
    })

    // ---------- POPOVER STATE AND REFS
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const datePickerRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)

    const selectedValue = value !== undefined ? value : defaultValue
    const isControlled = value !== undefined

    // ---------- TOGGLE POPOVER HANDLER
    const handleToggle = () => {
      // Guard clause for disabled pickers
      if (!controller.isDisabled()) {
        setIsOpen(!isOpen)
      }
    }

    // ---------- DATE CLICK HANDLER
    const handleDateClick = (date: Date) => {
      // Early return guard clause for disabled dates
      if (controller.isDateDisabled(date)) return

      let newValue: Date | DateRange | null

      if (controller.isRange()) {
        const currentRange = selectedValue as DateRange | null
        if (!currentRange?.start) {
          newValue = { start: date, end: null }
        } else if (!currentRange.end) {
          if (date < currentRange.start) {
            newValue = { start: date, end: currentRange.start }
          } else {
            newValue = { start: currentRange.start, end: date }
          }
        } else {
          newValue = { start: date, end: null }
        }
      } else {
        newValue = date
      }

      if (!isControlled) {
        onChange?.(newValue)
      } else {
        onChange?.(newValue)
      }

      if (!controller.isRange()) {
        setIsOpen(false)
      }
    }

    // ---------- PREVIOUS MONTH HANDLER
    const handlePreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }

    // ---------- NEXT MONTH HANDLER
    const handleNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    // ---------- SIDE EFFECT: CLICK OUTSIDE LISTENER
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          datePickerRef.current &&
          !datePickerRef.current.contains(event.target as Node) &&
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    // ---------- GET DAYS IN MONTH COMPUTATION
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    // ---------- GET FIRST DAY OF MONTH COMPUTATION
    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    // ---------- FORMAT DATE DISPLAY STRING HELPER
    const formatDate = (date: Date | DateRange | null | undefined) => {
      if (!date) return placeholder

      if (controller.isRange()) {
        const r = date as DateRange
        if (!r.start) return placeholder
        if (!r.end) return r.start.toLocaleDateString()
        return `${r.start.toLocaleDateString()} - ${r.end.toLocaleDateString()}`
      }

      return (date as Date).toLocaleDateString()
    }

    // ---------- RENDER CALENDAR GRID FUNCTION
    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth)
      const firstDay = getFirstDayOfMonth(currentMonth)
      const days = []

      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i.toString()}`} className="ui-date-picker__empty" />)
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        const isSelected = controller.isDateSelected(date)
        const isInRange = controller.isDateInRange(date)
        const isDisabled = controller.isDateDisabled(date)

        days.push(
          <button
            key={day}
            type="button"
            className={controller.getDateClasses(date, isSelected, isInRange, isDisabled)}
            onClick={() => {
              handleDateClick(date)
            }}
            disabled={isDisabled}
          >
            {day}
          </button>
        )
      }

      return (
        <div className={controller.getCalendarClasses()}>
          <div className={controller.getHeaderClasses()}>
            <button
              type="button"
              className={controller.getNavigationClasses()}
              onClick={handlePreviousMonth}
            >
              ‹
            </button>
            <div className={controller.getMonthClasses()}>
              {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
            </div>
            <div className={controller.getYearClasses()}>
              {currentMonth.getFullYear()}
            </div>
            <button
              type="button"
              className={controller.getNavigationClasses()}
              onClick={handleNextMonth}
            >
              ›
            </button>
          </div>
          <div className={controller.getDaysHeaderClasses()}>
            {dayNames.map((day) => (
              <div key={day} className={controller.getDayClasses()}>
                {day}
              </div>
            ))}
          </div>
          <div className="ui-date-picker__dates">{days}</div>
        </div>
      )
    }

    return (
      <div
        ref={(node) => {
          datePickerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={`${controller.getDatePickerClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        <div
          className={controller.getTriggerClasses()}
          onClick={handleToggle}
          tabIndex={controller.isDisabled() ? -1 : 0}
        >
          <span>{formatDate(selectedValue)}</span>
          <span className="ui-date-picker__calendar-icon">📅</span>
        </div>

        {isOpen && (
          <div ref={calendarRef} className="ui-date-picker__popover">
            {renderCalendar()}
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
export type { DatePickerProps }
