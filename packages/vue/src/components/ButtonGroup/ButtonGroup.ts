/**
 * @file ButtonGroup.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue ButtonGroup toolbar container UI component.
 *
 * @description
 * Groups adjacent buttons with unified borders, orientation layout variants (horizontal/vertical), and group ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { ButtonGroupController } from '@bleckwolf25/core'
import type { ButtonGroupProps } from './ButtonGroup.types'
import './ButtonGroup.css'

// ---------- VUE BUTTON GROUP COMPONENT
export const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  props: {
    orientation: {
      type: String as PropType<ButtonGroupProps['orientation']>,
      default: 'horizontal',
    },
    size: {
      type: String as PropType<ButtonGroupProps['size']>,
      default: 'md',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      // ---------- HEADLESS BUTTON GROUP CONTROLLER INITIALIZATION
      const controller = new ButtonGroupController({
        orientation: props.orientation,
        size: props.size,
      })

      return h(
        'div',
        {
          class: [controller.getButtonGroupClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        slots.default?.()
      )
    }
  },
})
