/**
 * @file Spinner.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Spinner loading activity indicator component.
 *
 * @description
 * Renders spinning activity loading indicators with size tokens, color themes, and ARIA status attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { SpinnerController } from '@bleckwolf25/core'
import type { SpinnerProps } from './Spinner.types'
import './Spinner.css'

// ---------- COMPONENTS

// ---------- VUE SPINNER COMPONENT
export const Spinner = defineComponent({
  name: 'Spinner',
  props: {
    size: {
      type: String as PropType<SpinnerProps['size']>,
      default: 'md',
    },
    color: {
      type: String as PropType<SpinnerProps['color']>,
      default: 'default',
    },
  },
  setup(props, { attrs }) {
    return () => {
      // ---------- HEADLESS SPINNER CONTROLLER INITIALIZATION
      const controller = new SpinnerController({
        size: props.size,
        color: props.color,
      })

      return h('div', {
        class: [controller.getSpinnerClasses(), attrs.class],
        ...controller.getAriaAttributes(),
      })
    }
  },
})
