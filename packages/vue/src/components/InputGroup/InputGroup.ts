/**
 * @file InputGroup.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue InputGroup input addon container component.
 *
 * @description
 * Combines input fields with prepend and append addon buttons or text indicators in a unified input control layout.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { InputGroupController } from '@evara-ui/core'
import type { InputGroupProps } from './InputGroup.types'
import './InputGroup.css'

// ---------- COMPONENTS

// ---------- VUE INPUT GROUP COMPONENT
export const InputGroup = defineComponent({
  name: 'InputGroup',
  props: {
    size: {
      type: String as PropType<InputGroupProps['size']>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      // ---------- HEADLESS INPUT GROUP CONTROLLER INITIALIZATION
      const controller = new InputGroupController({
        size: props.size,
        disabled: props.disabled,
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
