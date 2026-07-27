/**
 * @file Calendar.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Calendar date picker grid UI component.
 *
 * @description
 * Renders month date grids with v-model date selection, month navigation controls, min/max bounds, and disabled date filters.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, ref, type PropType } from 'vue'
import { CalendarController } from '@evara-ui/core'
import './Calendar.css'

// ---------- VUE CALENDAR COMPONENT
export const Calendar = defineComponent({
   
  name: 'Calendar',
  props: {
    value: {
      type: Date as PropType<Date | undefined>,
      default: undefined,
    },
    modelValue: {
      type: Date as PropType<Date | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: Date as PropType<Date | undefined>,
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
    disabledDates: {
      type: Array as PropType<Date[]>,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'update:value', 'change'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE ACTIVE MONTH POINTER
    const currentMonth = ref(new Date())

    // ---------- GET ACTIVE SELECTED DATE
    const getActiveValue = () => {
      if (props.modelValue !== undefined) return props.modelValue
      return props.value
    }

    // ---------- DATE CLICK SELECTION HANDLER
    const handleDateClick = (date: Date, controller: CalendarController) => {
      // Early return guard clause for disabled dates
      if (controller.isDateDisabled(date)) return
      emit('update:modelValue', date)
      emit('update:value', date)
      emit('change', date)
    }

    // ---------- PREVIOUS MONTH NAVIGATION
    const handlePreviousMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1)
    }

    // ---------- NEXT MONTH NAVIGATION
    const handleNextMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1)
    }

    // ---------- HELPER: GET TOTAL DAYS IN MONTH
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    // ---------- HELPER: GET FIRST DAY OF MONTH WEEKDAY
    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    return () => {
      const activeValue = getActiveValue()

      // ---------- HEADLESS CALENDAR CONTROLLER INITIALIZATION
      const controller = new CalendarController({
        value: activeValue,
        defaultValue: props.defaultValue,
        minDate: props.minDate,
        maxDate: props.maxDate,
        disabledDates: props.disabledDates,
      })

      const daysInMonth = getDaysInMonth(currentMonth.value)
      const firstDay = getFirstDayOfMonth(currentMonth.value)
      const days = []
      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

      for (let i = 0; i < firstDay; i++) {
        days.push(h('div', { key: `empty-${String(i)}`, class: 'ui-calendar__empty' }))
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), day)
        const isSelected = controller.isDateSelected(date)
        const isToday = controller.isDateToday(date)
        const isDisabled = controller.isDateDisabled(date)

        days.push(
          h(
            'button',
            {
              key: day,
              type: 'button',
              class: controller.getDateClasses(date, isSelected, isToday, isDisabled),
              onClick: () => { handleDateClick(date, controller); },
              disabled: isDisabled,
              'aria-label': date.toLocaleDateString(),
              'aria-selected': isSelected,
            },
            day
          )
        )
      }

      return h(
        'div',
        {
          class: [controller.getCalendarClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          h('div', { class: controller.getHeaderClasses() }, [
            h(
              'button',
              {
                type: 'button',
                class: controller.getNavigationClasses(),
                onClick: handlePreviousMonth,
                'aria-label': 'Previous month',
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
                'aria-label': 'Next month',
              },
              '›'
            ),
          ]),
          h(
            'div',
            { class: controller.getDaysHeaderClasses() },
            dayNames.map((day) => h('div', { key: day, class: controller.getDayClasses() }, day))
          ),
          h('div', { class: 'ui-calendar__dates' }, days),
        ]
      )
    }
  },
})
