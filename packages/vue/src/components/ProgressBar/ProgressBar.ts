/**
 * @file ProgressBar.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue ProgressBar progress indicator UI component.
 *
 * @description
 * Renders progress bar indicators with percentage width fills, indeterminate animation modes, color themes, and ARIA progressbar attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { ProgressBarController } from '@evara-ui/core'
import type { ProgressBarProps } from './ProgressBar.types'
import './ProgressBar.css'

// ---------- COMPONENTS

// ---------- VUE PROGRESS BAR COMPONENT
export const ProgressBar = defineComponent({
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ProgressBarProps['size']>,
      default: 'md',
    },
    color: {
      type: String as PropType<ProgressBarProps['color']>,
      default: 'default',
    },
  },
  setup(props, { attrs }) {
    return () => {
      // ---------- HEADLESS PROGRESS BAR CONTROLLER INITIALIZATION
      const controller = new ProgressBarController({
        value: props.value,
        indeterminate: props.indeterminate,
        size: props.size,
        color: props.color,
      })

      return h(
        'div',
        {
          class: [controller.getProgressBarClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          h('div', {
            class: controller.getFillClasses(),
            style: controller.getFillStyle(),
          }),
        ]
      )
    }
  },
})
