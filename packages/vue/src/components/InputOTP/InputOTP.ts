/**
 * @file InputOTP.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue InputOTP pin code input component.
 *
 * @description
 * Renders segmented numeric pin inputs supporting clipboard paste parsing, auto-focus progression, backspace handling, and ARIA digit labels.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, onMounted, type PropType } from 'vue'
import { InputOTPController } from '@evara-ui/core'
import type { InputOTPProps } from './InputOTP.types'
import './InputOTP.css'

// ---------- COMPONENTS

// ---------- VUE INPUT OTP COMPONENT
export const InputOTP = defineComponent({
  name: 'InputOTP',
  props: {
    length: {
      type: Number,
      default: 6,
    },
    value: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    modelValue: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<InputOTPProps['size']>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:value', 'change'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE STATE AND REFS
    const internalValue = ref(props.defaultValue)
    const focusedIndex = ref(0)
    const inputRefs = ref<Array<HTMLInputElement | null>>([])

    // ---------- GET ACTIVE OTP STRING VALUE
    const getActiveValue = () => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined) return props.value
      return internalValue.value
    }

    // ---------- LIFECYCLE MOUNT AUTOFOCUS
    onMounted(() => {
      if (props.autoFocus && inputRefs.value[0]) {
        inputRefs.value[0]?.focus()
      }
    })

    // ---------- DIGIT CHANGE EVENT HANDLER
    const handleChange = (index: number, newValue: string) => {
      const currentValue = getActiveValue()
      const newValueArray = currentValue.split('')
      newValueArray[index] = newValue
      const newOTP = newValueArray.join('')

      if (props.modelValue === undefined && props.value === undefined) {
        internalValue.value = newOTP
      }

      emit('update:modelValue', newOTP)
      emit('update:value', newOTP)
      emit('change', newOTP)

      if (newValue && index < props.length - 1) {
        inputRefs.value[index + 1]?.focus()
      }
    }

    // ---------- KEYDOWN ARROW & BACKSPACE HANDLER
    const handleKeyDown = (index: number, event: KeyboardEvent, controller: InputOTPController) => {
      const currentValue = getActiveValue()
      controller.handleKeyDown(event, index, currentValue)

      const key = event.key
      if (key === 'Backspace') {
        event.preventDefault()
        handleChange(index, '')
        if (index > 0) {
          inputRefs.value[index - 1]?.focus()
        }
      } else if (key === 'ArrowLeft' && index > 0) {
        inputRefs.value[index - 1]?.focus()
      } else if (key === 'ArrowRight' && index < props.length - 1) {
        inputRefs.value[index + 1]?.focus()
      }
    }

    // ---------- CLIPBOARD PASTE HANDLER
    const handlePaste = (event: ClipboardEvent, controller: InputOTPController) => {
      event.preventDefault()
      const pastedData = controller.handlePaste(event, props.length)
      if (pastedData) {
        const currentValue = getActiveValue()
        const newValueArray = currentValue.split('')
        for (let i = 0; i < pastedData.length; i++) {
          if (i < props.length) {
            newValueArray[i] = pastedData[i]
          }
        }
        const newOTP = newValueArray.join('')
        if (props.modelValue === undefined && props.value === undefined) {
          internalValue.value = newOTP
        }
        emit('update:modelValue', newOTP)
        emit('update:value', newOTP)
        emit('change', newOTP)

        const nextEmptyIndex = pastedData.length < props.length ? pastedData.length : props.length - 1
        inputRefs.value[nextEmptyIndex]?.focus()
      }
    }

    return () => {
      const currentValue = getActiveValue()

      // ---------- HEADLESS INPUT OTP CONTROLLER INITIALIZATION
      const controller = new InputOTPController({
        length: props.length,
        value: currentValue,
        size: props.size,
        disabled: props.disabled,
        autoFocus: props.autoFocus,
      })

      return h(
        'div',
        {
          class: [controller.getContainerClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        Array.from({ length: props.length }).map((_, index) =>
          h('input', {
            key: index,
            ref: (el) => {
              inputRefs.value[index] = el as HTMLInputElement | null
            },
            type: 'text',
            inputmode: 'numeric',
            pattern: '[0-9]*',
            maxlength: 1,
            class: controller.getInputClasses(index),
            value: currentValue[index] || '',
            onInput: (e: Event) => {
              const target = e.target as HTMLInputElement
              const val = target.value
              if (val === '' || /^\d$/.test(val)) {
                handleChange(index, val)
              }
            },
            onKeydown: (e: KeyboardEvent) => { handleKeyDown(index, e, controller); },
            onPaste: (e: ClipboardEvent) => { handlePaste(e, controller); },
            onFocus: () => {
              focusedIndex.value = index
            },
            disabled: props.disabled,
            autofocus: props.autoFocus && index === 0,
            'aria-label': `Digit ${index + 1}`,
            'aria-current': focusedIndex.value === index ? 'true' : undefined,
          })
        )
      )
    }
  },
})
