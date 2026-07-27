/**
 * @file Slider.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Slider range input UI component.
 *
 * @description
 * Renders interactive range sliders supporting single-thumb and dual-thumb values, drag thumb listeners, step precision math, and slider ARIA roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, type PropType } from 'vue'
import { SliderController } from '@evara-ui/core'
import type { SliderProps } from './Slider.types'
import './Slider.css'

// ---------- COMPONENTS

// ---------- VUE SLIDER COMPONENT
export const Slider = defineComponent({
  name: 'Slider',
  props: {
    value: {
      type: [Number, Array] as PropType<number | number[] | undefined>,
      default: undefined,
    },
    modelValue: {
      type: [Number, Array] as PropType<number | number[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [Number, Array] as PropType<number | number[]>,
      default: 50,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    range: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<SliderProps['size']>,
      default: 'md',
    },
  },
  emits: ['update:modelValue', 'update:value', 'change'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE STATE AND REFS
    const internalValue = ref<number | number[]>(props.defaultValue)
    const isDragging = ref(false)
    const activeThumb = ref(0)
    const trackRef = ref<HTMLDivElement | null>(null)

    // ---------- GET ACTIVE SLIDER VALUE HELPER
    const getActiveValue = () => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined) return props.value
      return internalValue.value
    }

    return () => {
      const currentValue = getActiveValue()

      // ---------- HEADLESS SLIDER CONTROLLER INITIALIZATION
      const controller = new SliderController({
        value: currentValue,
        defaultValue: props.defaultValue,
        min: props.min,
        max: props.max,
        step: props.step,
        range: props.range,
        disabled: props.disabled,
        size: props.size,
      })

      // ---------- TRACK CLICK DIRECT VALUE JUMP HANDLER
      const handleTrackClick = (e: MouseEvent) => {
        // Guard clause for disabled slider
        if (controller.isDisabled()) return
        const track = trackRef.value
        // Guard clause for missing track ref
        if (!track) return

        const rect = track.getBoundingClientRect()
        const percentage = ((e.clientX - rect.left) / rect.width) * 100
        const newValue = controller.getValueFromPercentage(percentage)

        if (controller.isRange()) {
          const currentValues = Array.isArray(currentValue)
            ? currentValue
            : [(props.defaultValue as number) || 0, (props.defaultValue as number) || 0]
          const newValues = [...currentValues]
          const thumbIndex = Math.abs(newValue - currentValues[0]) < Math.abs(newValue - currentValues[1]) ? 0 : 1
          newValues[thumbIndex] = newValue
          newValues.sort((a, b) => a - b)

          if (props.modelValue === undefined && props.value === undefined) {
            internalValue.value = newValues
          }
          emit('update:modelValue', newValues)
          emit('update:value', newValues)
          emit('change', newValues)
        } else {
          if (props.modelValue === undefined && props.value === undefined) {
            internalValue.value = newValue
          }
          emit('update:modelValue', newValue)
          emit('update:value', newValue)
          emit('change', newValue)
        }
      }

      // ---------- THUMB MOUSE DOWN DRAG HANDLER
      const handleThumbMouseDown = (thumbIndex: number, e: MouseEvent) => {
        // Guard clause for disabled slider
        if (controller.isDisabled()) return
        e.preventDefault()
        e.stopPropagation()

        isDragging.value = true
        activeThumb.value = thumbIndex

        // ---------- MOUSE MOVE DRAG HANDLER
        const handleMouseMove = (moveEvent: MouseEvent) => {
          const track = trackRef.value
          // Guard clause for missing track ref
          if (!track) return

          const rect = track.getBoundingClientRect()
          const percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100
          const newValue = controller.getValueFromPercentage(percentage)

          if (controller.isRange()) {
            const currentValues = Array.isArray(currentValue)
              ? currentValue
              : [(props.defaultValue as number) || 0, (props.defaultValue as number) || 0]
            const newValues = [...currentValues]
            newValues[thumbIndex] = newValue
            newValues.sort((a, b) => a - b)

            if (props.modelValue === undefined && props.value === undefined) {
              internalValue.value = newValues
            }
            emit('update:modelValue', newValues)
            emit('update:value', newValues)
            emit('change', newValues)
          } else {
            if (props.modelValue === undefined && props.value === undefined) {
              internalValue.value = newValue
            }
            emit('update:modelValue', newValue)
            emit('update:value', newValue)
            emit('change', newValue)
          }
        }

        // ---------- MOUSE UP DRAG END HANDLER
        const handleMouseUp = () => {
          isDragging.value = false
          activeThumb.value = 0
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }

      // ---------- RENDER THUMBS HELPER
      const renderThumbs = () => {
        if (controller.isRange()) {
          const values = Array.isArray(currentValue)
            ? currentValue
            : [(props.defaultValue as number) || 0, (props.defaultValue as number) || 0]
          return values.map((val, index) => {
            const percentage = controller.getPercentage(val)
            return h('div', {
              key: index,
              class: controller.getThumbClasses(isDragging.value && activeThumb.value === index),
              style: { left: `${percentage}%` },
              onMousedown: (e: MouseEvent) => { handleThumbMouseDown(index, e); },
              tabindex: controller.isDisabled() ? -1 : 0,
              role: 'slider',
              'aria-valuenow': val,
              'aria-valuemin': controller.getMin(),
              'aria-valuemax': controller.getMax(),
              'aria-disabled': controller.isDisabled(),
              'aria-valuetext': String(val),
            })
          })
        }

        const percentage = controller.getPercentage(currentValue as number)
        return h('div', {
          class: controller.getThumbClasses(isDragging.value),
          style: { left: `${percentage}%` },
          onMousedown: (e: MouseEvent) => { handleThumbMouseDown(0, e); },
          tabindex: controller.isDisabled() ? -1 : 0,
          role: 'slider',
          'aria-valuenow': currentValue,
          'aria-valuemin': controller.getMin(),
          'aria-valuemax': controller.getMax(),
          'aria-disabled': controller.isDisabled(),
          'aria-valuetext': String(currentValue),
        })
      }

      // ---------- RENDER FILL BAR HELPER
      const renderFill = () => {
        if (controller.isRange()) {
          const values = Array.isArray(currentValue)
            ? currentValue
            : [(props.defaultValue as number) || 0, (props.defaultValue as number) || 0]
          const startPercentage = controller.getPercentage(values[0])
          const endPercentage = controller.getPercentage(values[1])
          return h('div', {
            class: controller.getFillClasses(),
            style: {
              left: `${startPercentage}%`,
              width: `${endPercentage - startPercentage}%`,
            },
          })
        }

        const percentage = controller.getPercentage(currentValue as number)
        return h('div', {
          class: controller.getFillClasses(),
          style: { width: `${percentage}%` },
        })
      }

      return h(
        'div',
        {
          class: [controller.getSliderClasses(), attrs.class],
        },
        [
          h(
            'div',
            {
              ref: trackRef,
              class: controller.getTrackClasses(),
              onClick: handleTrackClick,
            },
            [renderFill(), renderThumbs()]
          ),
        ]
      )
    }
  },
})
