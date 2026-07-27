/**
 * @file Checkbox.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Checkbox toggle input component.
 *
 * @description
 * Renders checkbox input toggles supporting v-model boolean state, indeterminate dash icons, label text wrappers, and ARIA checkbox roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, watch, type PropType } from 'vue'
import { CheckboxController } from '@evara-ui/core'
import './Checkbox.css'

// ---------- COMPONENTS

// ---------- VUE CHECKBOX COMPONENT
export const Checkbox = defineComponent({
  name: 'Checkbox',
  props: {
    checked: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    modelValue: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultChecked: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    value: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
  },
  emits: ['update:checked', 'update:modelValue', 'checkedChange', 'change'],
  setup(props, { emit, attrs, expose }) {
    // ---------- REACTIVE REFS AND INTERNAL CHECKED STATE
    const inputRef = ref<HTMLInputElement | null>(null)
    expose({ input: inputRef })

    const internalChecked = ref(props.defaultChecked)

    // ---------- GET ACTIVE CHECKED VALUE HELPER
    const getActiveChecked = () => {
      if (props.modelValue !== undefined) return props.modelValue
      if (props.checked !== undefined) return props.checked
      return internalChecked.value
    }

    // ---------- WATCH FOR INDETERMINATE PROPERTY CHANGE
    watch(
      () => props.indeterminate,
      (val) => {
        if (inputRef.value) {
          inputRef.value.indeterminate = val
        }
      },
      { immediate: true }
    )

    // ---------- CHANGE EVENT HANDLER
    const handleChange = (event: Event) => {
      // Early return guard clause for disabled checkbox
      if (props.disabled) {
        event.preventDefault()
        return
      }
      const target = event.target as HTMLInputElement
      const newChecked = target.checked
      internalChecked.value = newChecked
      emit('update:modelValue', newChecked)
      emit('update:checked', newChecked)
      emit('checkedChange', newChecked)
      emit('change', event)
    }

    return () => {
      const isChecked = getActiveChecked()

      // ---------- HEADLESS CHECKBOX CONTROLLER INITIALIZATION
      const controller = new CheckboxController({
        checked: isChecked,
        defaultChecked: props.defaultChecked,
        indeterminate: props.indeterminate,
        disabled: props.disabled,
        required: props.required,
      })

      const checkboxMarkup = h(
        'div',
        { class: [controller.getClassNames(), attrs.class] },
        [
          h('input', {
            ref: inputRef,
            type: 'checkbox',
            name: props.name,
            value: props.value,
            checked: isChecked,
            disabled: props.disabled,
            required: props.required,
            class: controller.getInputClasses(),
            onChange: handleChange,
            ...controller.getAriaAttributes(),
          }),
          h('span', { class: controller.getIndicatorClasses() }, [
            props.indeterminate
              ? h(
                  'svg',
                  {
                    class: 'ui-checkbox-icon',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '3',
                  },
                  [h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })]
                )
              : null,
            !props.indeterminate && isChecked
              ? h(
                  'svg',
                  {
                    class: 'ui-checkbox-icon',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '3',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                  },
                  [h('polyline', { points: '20 6 9 17 4 12' })]
                )
              : null,
          ]),
        ]
      )

      if (props.label) {
        return h(
          'label',
          {
            class: [
              'ui-checkbox-label-wrapper',
              props.disabled ? 'ui-checkbox-label-wrapper--disabled' : '',
            ],
          },
          [checkboxMarkup, h('span', { class: 'ui-checkbox-label-text' }, props.label)]
        )
      }

      return checkboxMarkup
    }
  },
})
