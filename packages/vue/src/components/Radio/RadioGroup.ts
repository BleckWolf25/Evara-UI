/**
 * @file RadioGroup.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue RadioGroup container UI component.
 *
 * @description
 * Groups multiple child radio option buttons with unified value selection, context provider, and radiogroup ARIA roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, provide, computed, ref, type PropType } from 'vue'
import { RadioGroupController } from '@evara-ui/core'
import { RadioGroupKey } from './RadioGroupContext'
import './Radio.css'

// ---------- COMPONENTS

// ---------- VUE RADIO GROUP COMPONENT
export const RadioGroup = defineComponent({
  name: 'RadioGroup',
  props: {
    modelValue: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    value: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'update:value', 'valueChange', 'change'],
  setup(props, { slots, emit, attrs }) {
    // ---------- REACTIVE REFS AND VALUE RESOLUTION
    const internalValue = ref(props.defaultValue)

    const getActiveValue = () => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.value !== undefined) return props.value
      return internalValue.value
    }

    // ---------- VALUE CHANGE EVENT HANDLER
    const handleValueChange = (newValue: string) => {
      if (props.modelValue === undefined && props.value === undefined) {
        internalValue.value = newValue
      }
      emit('update:modelValue', newValue)
      emit('update:value', newValue)
      emit('valueChange', newValue)
      emit('change', newValue)
    }

    // Provide context values for child Radio components
    provide(RadioGroupKey, {
      name: computed(() => props.name),
      value: computed(() => getActiveValue()),
      disabled: computed(() => props.disabled),
      required: computed(() => props.required),
      onChange: handleValueChange,
    })

    return () => {
      // ---------- HEADLESS RADIO GROUP CONTROLLER INITIALIZATION
      const controller = new RadioGroupController({
        disabled: props.disabled,
        required: props.required,
        name: props.name,
      })

      return h(
        'div',
        {
          class: [controller.getClassNames(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        slots.default?.()
      )
    }
  },
})
