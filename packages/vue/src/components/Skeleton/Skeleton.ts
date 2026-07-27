/**
 * @file Skeleton.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Skeleton loading placeholder UI component.
 *
 * @description
 * Renders animated loading skeleton blocks with shape variants (text, circle, rectangle, square) and ARIA status attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { SkeletonController } from '@evara-ui/core'
import type { SkeletonProps } from './Skeleton.types'
import './Skeleton.css'

// ---------- COMPONENTS

// ---------- VUE SKELETON COMPONENT
export const Skeleton = defineComponent({
  name: 'Skeleton',
  props: {
    shape: {
      type: String as PropType<SkeletonProps['shape']>,
      default: 'text',
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs }) {
    return () => {
      // ---------- HEADLESS SKELETON CONTROLLER INITIALIZATION
      const controller = new SkeletonController({
        shape: props.shape,
        animated: props.animated,
      })

      return h('div', {
        class: [controller.getSkeletonClasses(), attrs.class],
        ...controller.getAriaAttributes(),
      })
    }
  },
})
