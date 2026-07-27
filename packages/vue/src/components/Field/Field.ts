/**
 * @file Field.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Field form wrapper UI component.
 *
 * @description
 * Wraps individual form input controls with label headers, required asterisks, helper text hints, and validation error messages.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, inject, computed } from 'vue'
import { FieldController } from '@evara-ui/core'
import { FieldGroupKey } from '../FieldGroup/FieldGroup'
import './Field.css'

// ---------- COMPONENTS

// ---------- VUE FIELD COMPONENT
export const Field = defineComponent({
  name: 'Field',
  props: {
    label: {
      type: String,
      default: undefined,
    },
    helperText: {
      type: String,
      default: undefined,
    },
    error: {
      type: String,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    // Inject group context parameters if present
    const groupContext = inject(FieldGroupKey, null)

    const isRequired = computed(() => props.required || (groupContext?.required.value ?? false))
    const isDisabled = computed(() => props.disabled || (groupContext?.disabled.value ?? false))

    return () => {
      // ---------- HEADLESS FIELD CONTROLLER INITIALIZATION
      const controller = new FieldController({
        label: props.label,
        helperText: props.helperText,
        error: props.error,
        required: isRequired.value,
        disabled: isDisabled.value,
      })

      return h(
        'div',
        {
          class: [controller.getContainerClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          props.label
            ? h('label', { class: controller.getLabelClasses() }, [
                props.label,
                isRequired.value ? h('span', { class: 'ui-field__required-indicator', 'aria-hidden': 'true' }, '*') : null,
              ])
            : null,
          slots.default ? slots.default() : null,
          props.error ? h('p', { class: controller.getErrorTextClasses() }, props.error) : null,
          !props.error && props.helperText ? h('p', { class: controller.getHelperTextClasses() }, props.helperText) : null,
        ]
      )
    }
  },
})
