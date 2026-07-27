/**
 * @file FieldGroup.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue FieldGroup form field grouping UI component.
 *
 * @description
 * Groups multiple form field controls with inherited disabled and required states via Vue injection context.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, provide, computed, type InjectionKey, type ComputedRef } from 'vue'
import { FieldGroupController } from '@bleckwolf25/core'
import './FieldGroup.css'

// ---------- TYPES AND INTERFACES

// ---------- FIELD GROUP CONTEXT STATE INTERFACE
export interface FieldGroupContextState {
  disabled: ComputedRef<boolean>
  required: ComputedRef<boolean>
}

// ---------- INJECTION SYMBOLS
export const FieldGroupKey: InjectionKey<FieldGroupContextState> = Symbol('FieldGroupContext')

// ---------- COMPONENTS

// ---------- VUE FIELD GROUP COMPONENT
export const FieldGroup = defineComponent({
  name: 'FieldGroup',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    // Provide field group context state to child fields
    provide(FieldGroupKey, {
      disabled: computed(() => props.disabled),
      required: computed(() => props.required),
    })

    return () => {
      // ---------- HEADLESS FIELD GROUP CONTROLLER INITIALIZATION
      const controller = new FieldGroupController({
        disabled: props.disabled,
        required: props.required,
      })

      return h(
        'div',
        {
          class: [controller.getContainerClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        slots.default?.()
      )
    }
  },
})
