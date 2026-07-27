/**
 * @file Radio.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Radio option input component.
 *
 * @description
 * Renders individual radio button options with RadioGroup injection context integration, label wrappers, and radio ARIA roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, inject, type PropType } from 'vue'
import { RadioController } from '@bleckwolf25/core'
import { RadioGroupKey } from './RadioGroupContext'
import './Radio.css'

// ---------- COMPONENTS

// ---------- VUE RADIO COMPONENT
export const Radio = defineComponent({
  name: 'Radio',
  props: {
    value: {
      type: [String, Number] as PropType<string | number | undefined>,
      default: undefined,
    },
    checked: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultChecked: {
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
  },
  emits: ['update:checked', 'change'],
  setup(props, { slots, emit, attrs }) {
    // Inject radio group context if present
    const groupContext = inject(RadioGroupKey, null)

    return () => {
      const groupName = groupContext?.name.value
      const strValue = props.value !== undefined ? String(props.value) : ''
      const isChecked = groupContext
        ? groupContext.value.value === strValue
        : (props.checked ?? props.defaultChecked)
      const isDisabled = (groupContext?.disabled.value ?? false) || props.disabled
      const isRequired = (groupContext?.required.value ?? false) || props.required

      // ---------- HEADLESS RADIO CONTROLLER INITIALIZATION
      const controller = new RadioController({
        value: strValue,
        checked: isChecked,
        disabled: isDisabled,
        required: isRequired,
        name: groupName,
      })

      // ---------- CHANGE EVENT HANDLER
      const handleChange = (event: Event) => {
        // Early return guard clause for disabled radio
        if (isDisabled) {
          event.preventDefault()
          return
        }
        emit('update:checked', true)
        emit('change', event)
        if (groupContext && strValue !== '') {
          groupContext.onChange(strValue)
        }
      }

      const radioMarkup = h(
        'div',
        { class: [controller.getClassNames(), attrs.class] },
        [
          h('input', {
            type: 'radio',
            name: groupName,
            value: props.value,
            checked: isChecked,
            disabled: isDisabled,
            required: isRequired,
            class: controller.getInputClasses(),
            onChange: handleChange,
            ...controller.getAriaAttributes(),
          }),
          h('span', { class: controller.getIndicatorClasses() }),
        ]
      )

      const labelContent = slots.default ? slots.default() : props.label

      if (labelContent) {
        return h(
          'label',
          { class: ['ui-radio-label-wrapper', isDisabled ? 'ui-radio-label-wrapper--disabled' : ''] },
          [radioMarkup, h('span', { class: 'ui-radio-label-text' }, labelContent)]
        )
      }

      return radioMarkup
    }
  },
})
