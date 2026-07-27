/**
 * @file Badge.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Badge status tag UI component.
 *
 * @description
 * Renders small inline status badges with support for color themes, size variants, and corner position styling.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { BadgeController } from '@evara-ui/core'
import type { BadgeProps } from './Badge.types'
import './Badge.css'

// ---------- VUE BADGE COMPONENT
export const Badge = defineComponent({
   
  name: 'Badge',
  props: {
    color: {
      type: String as PropType<BadgeProps['color']>,
      default: undefined,
    },
    variant: {
      type: String as PropType<unknown>,
      default: undefined,
    },
    size: {
      type: String as PropType<BadgeProps['size']>,
      default: 'sm',
    },
    position: {
      type: String as PropType<BadgeProps['position']>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      // Determine active color token with variant fallback
      const activeColor = props.color ?? props.variant ?? 'default'

      // ---------- HEADLESS BADGE CONTROLLER INITIALIZATION
      const controller = new BadgeController({
        color: activeColor,
        size: props.size,
        position: props.position,
      })

      return h(
        'span',
        {
          class: [controller.getBadgeClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        slots.default?.()
      )
    }
  },
})
