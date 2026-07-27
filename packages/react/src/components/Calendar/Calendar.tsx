/**
 * @file Calendar.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Calendar date selection UI component.
 *
 * @description
 * Renders interactive monthly grid calendar pickers with previous/next month controls, today highlighting,
 * min/max date boundary enforcement, disabled date styling, and ARIA grid role accessibility.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState } from 'react'
import { CalendarController } from '@bleckwolf25/core'
import type { CalendarProps } from './Calendar.types'
import './Calendar.css'

// ---------- COMPONENTS

// ---------- REACT CALENDAR COMPONENT
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS CALENDAR CONTROLLER INITIALIZATION
    const controller = new CalendarController({
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates,
    })

    // ---------- MONTH STATE INITIALIZATION
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const isControlled = value !== undefined

    // ---------- DATE CLICK HANDLER
    const handleDateClick = (date: Date) => {
      // Early return guard clause for disabled dates
      if (controller.isDateDisabled(date)) return

      if (!isControlled) {
        onChange?.(date)
      } else {
        onChange?.(date)
      }
    }

    // ---------- PREVIOUS MONTH NAVIGATION HANDLER
    const handlePreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }

    // ---------- NEXT MONTH NAVIGATION HANDLER
    const handleNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    // ---------- GET DAYS IN MONTH COMPUTATION
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    // ---------- GET FIRST DAY OF MONTH COMPUTATION
    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    // ---------- RENDER CALENDAR GRID FUNCTION
    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth)
      const firstDay = getFirstDayOfMonth(currentMonth)
      const days = []

      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

      // Fill preceding empty grid cells before month start
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i.toString()}`} className="ui-calendar__empty" />)
      }

      // Build active month date buttons
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        const isSelected = controller.isDateSelected(date)
        const isToday = controller.isDateToday(date)
        const isDisabled = controller.isDateDisabled(date)

        days.push(
          <button
            key={day}
            type="button"
            className={controller.getDateClasses(date, isSelected, isToday, isDisabled)}
            onClick={() => {
              handleDateClick(date)
            }}
            disabled={isDisabled}
            aria-label={date.toLocaleDateString()}
            aria-selected={isSelected}
          >
            {day}
          </button>
        )
      }

      return (
        <div className={controller.getCalendarClasses()} ref={ref} {...controller.getAriaAttributes()} {...props}>
          <div className={controller.getHeaderClasses()}>
            <button
              type="button"
              className={controller.getNavigationClasses()}
              onClick={handlePreviousMonth}
              aria-label="Previous month"
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
              aria-label="Next month"
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
          <div className="ui-calendar__dates">{days}</div>
        </div>
      )
    }

    return (
      <div className={`${controller.getCalendarClasses()}${className ? ` ${className}` : ''}`}>
        {renderCalendar()}
      </div>
    )
  }
)

Calendar.displayName = 'Calendar'
export type { CalendarProps }
