/**
 * @file Button.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Button interactive action component.
 *
 * @description
 * Renders interactive buttons with polymorphic tags, loading spinners, size variants, color themes, and ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, type Component, type PropType } from 'vue'
import { ButtonController } from '@evara-ui/core'
import type { ButtonProps } from './Button.types'
import './Button.css'

// ---------- VUE BUTTON COMPONENT
export const Button = defineComponent({
   
  name: 'Button',
  props: {
    as: {
      type: [String, Object],
      default: 'button',
    },
    variant: {
      type: String as PropType<ButtonProps['variant']>,
      default: 'primary',
    },
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'md',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<ButtonProps['type']>,
      default: 'button',
    },
  },
  emits: ['click'],
  setup(props, { slots, emit, attrs }) {
    return () => {
      // ---------- HEADLESS BUTTON CONTROLLER INITIALIZATION
      const controller = new ButtonController({
        variant: props.variant,
        size: props.size,
        disabled: props.disabled,
        loading: props.loading,
        fullWidth: props.fullWidth,
      })

      // ---------- CLICK HANDLER
      const handleClick = (event: MouseEvent) => {
        // Early return guard clause for disabled or loading button
        if (props.disabled || props.loading) {
          event.preventDefault()
          return
        }
        emit('click', event)
      }

      const tag = props.as as string | Component
      const isNativeButton = tag === 'button'

      return h(
        tag,
        {
          type: isNativeButton ? props.type : undefined,
          class: [controller.getClassNames(), attrs.class],
          disabled: isNativeButton ? props.disabled || props.loading : undefined,
          'data-disabled': props.disabled || props.loading ? 'true' : undefined,
          ...controller.getAriaAttributes(),
          onClick: handleClick,
        },
        [
          props.loading ? h('span', { class: 'ui-button__spinner', 'aria-hidden': 'true' }) : null,
          slots.default ? slots.default() : null,
        ]
      )
    }
  },
})
