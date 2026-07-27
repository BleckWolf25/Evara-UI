/**
 * @file DatePicker.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue DatePicker input component with dropdown calendar popover.
 *
 * @description
 * Renders date inputs with popup calendars supporting single and range date selections, min/max bounds, and click-outside popover dismissals.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, onMounted, onBeforeUnmount, type PropType } from 'vue'
import { DatePickerController, type DateRange } from '@bleckwolf25/core'
import type { DatePickerProps } from './DatePicker.types'
import './DatePicker.css'

// ---------- COMPONENTS

// ---------- VUE DATE PICKER COMPONENT
export const DatePicker = defineComponent({
  name: 'DatePicker',
  props: {
    value: {
      type: [Date, Object] as PropType<Date | DateRange | null | undefined>,
      default: undefined,
    },
    modelValue: {
      type: [Date, Object] as PropType<Date | DateRange | null | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [Date, Object] as PropType<Date | DateRange | null | undefined>,
      default: undefined,
    },
    minDate: {
      type: Date as PropType<Date | undefined>,
      default: undefined,
    },
    maxDate: {
      type: Date as PropType<Date | undefined>,
      default: undefined,
    },
    range: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Select date...',
    },
    size: {
      type: String as PropType<DatePickerProps['size']>,
      default: 'md',
    },
  },
  emits: ['update:modelValue', 'update:value', 'change'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE STATE AND REFS
    const isOpen = ref(false)
    const currentMonth = ref(new Date())
    const datePickerRef = ref<HTMLDivElement | null>(null)
    const calendarRef = ref<HTMLDivElement | null>(null)

    // ---------- GET ACTIVE SELECTED DATE VALUE
    const getActiveValue = () => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined) return props.value
      return props.defaultValue
    }

    // ---------- TOGGLE CALENDAR POPOVER HANDLER
    const handleToggle = (controller: DatePickerController) => {
      // Guard clause for disabled picker
      if (!controller.isDisabled()) {
        isOpen.value = !isOpen.value
      }
    }

    // ---------- DATE CELL CLICK SELECTION HANDLER
    const handleDateClick = (date: Date, controller: DatePickerController) => {
      // Early return guard clause for disabled dates
      if (controller.isDateDisabled(date)) return

      let newValue: Date | DateRange | null
      const selectedValue = getActiveValue()

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

      emit('update:modelValue', newValue)
      emit('update:value', newValue)
      emit('change', newValue)

      if (!controller.isRange()) {
        isOpen.value = false
      }
    }

    // ---------- PREVIOUS MONTH NAVIGATION
    const handlePreviousMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1)
    }

    // ---------- NEXT MONTH NAVIGATION
    const handleNextMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1)
    }

    // ---------- CLICK OUTSIDE DISMISSAL HANDLER
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.value &&
        !datePickerRef.value.contains(event.target as Node) &&
        calendarRef.value &&
        !calendarRef.value.contains(event.target as Node)
      ) {
        isOpen.value = false
      }
    }

    // ---------- LIFECYCLE EVENT LISTENERS
    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    // ---------- HELPER: DAYS IN MONTH
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    // ---------- HELPER: FIRST DAY OF MONTH
    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    // ---------- HELPER: FORMAT DISPLAY DATE TEXT
    const formatDate = (date: Date | DateRange | null | undefined, controller: DatePickerController) => {
      if (!date) return props.placeholder

      if (controller.isRange()) {
        const rangeObj = date as DateRange
        if (!rangeObj.start) return props.placeholder
        if (!rangeObj.end) return rangeObj.start.toLocaleDateString()
        return `${rangeObj.start.toLocaleDateString()} - ${rangeObj.end.toLocaleDateString()}`
      }

      return (date as Date).toLocaleDateString()
    }

    return () => {
      const selectedValue = getActiveValue()

      // ---------- HEADLESS DATE PICKER CONTROLLER INITIALIZATION
      const controller = new DatePickerController({
        value: selectedValue,
        defaultValue: props.defaultValue,
        minDate: props.minDate,
        maxDate: props.maxDate,
        range: props.range,
        disabled: props.disabled,
        placeholder: props.placeholder,
        size: props.size,
      })

      // ---------- RENDER CALENDAR GRID HELPER
      const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth.value)
        const firstDay = getFirstDayOfMonth(currentMonth.value)
        const days = []
        const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

        for (let i = 0; i < firstDay; i++) {
          days.push(h('div', { key: `empty-${i}`, class: 'ui-date-picker__empty' }))
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day)
          const isSelected = controller.isDateSelected(date)
          const isInRange = controller.isDateInRange(date)
          const isDisabled = controller.isDateDisabled(date)

          days.push(
            h(
              'button',
              {
                key: day,
                type: 'button',
                class: controller.getDateClasses(date, isSelected, isInRange, isDisabled),
                onClick: () => { handleDateClick(date, controller); },
                disabled: isDisabled,
              },
              day
            )
          )
        }

        return h('div', { class: controller.getCalendarClasses() }, [
          h('div', { class: controller.getHeaderClasses() }, [
            h(
              'button',
              {
                type: 'button',
                class: controller.getNavigationClasses(),
                onClick: handlePreviousMonth,
              },
              '‹'
            ),
            h(
              'div',
              { class: controller.getMonthClasses() },
              currentMonth.value.toLocaleDateString('en-US', { month: 'long' })
            ),
            h('div', { class: controller.getYearClasses() }, currentMonth.value.getFullYear()),
            h(
              'button',
              {
                type: 'button',
                class: controller.getNavigationClasses(),
                onClick: handleNextMonth,
              },
              '›'
            ),
          ]),
          h(
            'div',
            { class: controller.getDaysHeaderClasses() },
            dayNames.map((day) => h('div', { key: day, class: controller.getDayClasses() }, day))
          ),
          h('div', { class: 'ui-date-picker__dates' }, days),
        ])
      }

      return h(
        'div',
        {
          ref: datePickerRef,
          class: [controller.getDatePickerClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          h(
            'div',
            {
              class: controller.getTriggerClasses(),
              onClick: () => { handleToggle(controller); },
              tabindex: controller.isDisabled() ? -1 : 0,
            },
            [
              h('span', formatDate(selectedValue, controller)),
              h('span', { class: 'ui-date-picker__calendar-icon' }, '📅'),
            ]
          ),
          isOpen.value ? h('div', { ref: calendarRef, class: 'ui-date-picker__popover' }, renderCalendar()) : null,
        ]
      )
    }
  },
})
