/**
 * @file Avatar.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Avatar user profile picture UI component.
 *
 * @description
 * Renders user profile avatars supporting image sources, text initials fallbacks, presence status badges, and size variants.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { AvatarController } from '@bleckwolf25/core'
import type { AvatarProps } from './Avatar.types'
import './Avatar.css'

// ---------- VUE AVATAR COMPONENT
export const Avatar = defineComponent({
   
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: undefined,
    },
    alt: {
      type: String,
      default: undefined,
    },
    initials: {
      type: String,
      default: undefined,
    },
    size: {
      type: String as PropType<AvatarProps['size']>,
      default: 'md',
    },
    status: {
      type: String as PropType<AvatarProps['status']>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () => {
      // ---------- HEADLESS AVATAR CONTROLLER INITIALIZATION
      const controller = new AvatarController({
        src: props.src,
        alt: props.alt,
        initials: props.initials,
        size: props.size,
        status: props.status,
      })

      return h(
        'div',
        {
          class: [controller.getAvatarClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          controller.hasImage()
            ? h('img', { src: props.src, alt: props.alt, class: controller.getImageClasses() })
            : null,
          !controller.hasImage() && controller.hasInitials()
            ? h('span', { class: controller.getInitialsClasses() }, props.initials)
            : null,
          controller.hasStatus()
            ? h('span', {
                class: controller.getStatusIndicatorClasses(),
                title: props.status,
                'aria-label': `Status: ${props.status ?? ''}`,
              })
            : null,
        ]
      )
    }
  },
})
