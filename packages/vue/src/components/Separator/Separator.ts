/**
 * @file Separator.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Separator divider line component.
 *
 * @description
 * Renders layout divider lines with horizontal/vertical orientations, color themes, and ARIA separator roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { SeparatorController } from '@bleckwolf25/core'
import type { SeparatorProps } from './Separator.types'
import './Separator.css'

// ---------- COMPONENTS

// ---------- VUE SEPARATOR COMPONENT
export const Separator = defineComponent({
  name: 'Separator',
  props: {
    orientation: {
      type: String as PropType<SeparatorProps['orientation']>,
      default: 'horizontal',
    },
    color: {
      type: String as PropType<SeparatorProps['color']>,
      default: 'default',
    },
  },
  setup(props, { attrs }) {
    return () => {
      // ---------- HEADLESS SEPARATOR CONTROLLER INITIALIZATION
      const controller = new SeparatorController({
        orientation: props.orientation,
        color: props.color,
      })

      return h('div', {
        class: [controller.getSeparatorClasses(), attrs.class],
        ...controller.getAriaAttributes(),
      })
    }
  },
})
