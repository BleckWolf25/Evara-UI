/**
 * @file Input.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Input text field component.
 *
 * @description
 * Renders single-line text input fields supporting v-model bindings, prefix/suffix slots, size variants, and ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { InputController } from '@bleckwolf25/core'
import type { InputProps } from './Input.types'
import './Input.css'

// ---------- COMPONENTS

// ---------- VUE INPUT COMPONENT
export const Input = defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined,
    },
    value: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined,
    },
    variant: {
      type: String as PropType<InputProps['variant']>,
      default: 'default',
    },
    size: {
      type: String as PropType<InputProps['size']>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue', 'update:value', 'valueChange', 'input', 'change'],
  setup(props, { slots, emit, attrs }) {
    return () => {
      const activeValue = props.modelValue ?? props.value ?? props.defaultValue

      // ---------- HEADLESS INPUT CONTROLLER INITIALIZATION
      const controller = new InputController({
        variant: props.variant,
        size: props.size,
        disabled: props.disabled,
        readOnly: props.readOnly,
        required: props.required,
      })

      // ---------- INPUT EVENT HANDLER
      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement
        const val = target.value
        emit('update:modelValue', val)
        emit('update:value', val)
        emit('valueChange', val)
        emit('input', event)
      }

      // ---------- CHANGE EVENT HANDLER
      const handleChange = (event: Event) => {
        emit('change', event)
      }

      return h(
        'div',
        { class: [controller.getContainerClasses(), attrs.class] },
        [
          slots.prefix ? h('span', { class: 'ui-input__prefix' }, slots.prefix()) : null,
          h('input', {
            type: props.type,
            class: controller.getInputClasses(),
            value: activeValue,
            disabled: props.disabled,
            readonly: props.readOnly,
            required: props.required,
            onInput: handleInput,
            onChange: handleChange,
            ...controller.getAriaAttributes(),
          }),
          slots.suffix ? h('span', { class: 'ui-input__suffix' }, slots.suffix()) : null,
        ]
      )
    }
  },
})
