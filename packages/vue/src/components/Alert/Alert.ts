/**
 * @file Alert.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Alert notification callout component.
 *
 * @description
 * Renders banner callouts supporting contextual variants, dismiss buttons, icons, and ARIA alert roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, ref, type PropType } from 'vue'
import { AlertController } from '@bleckwolf25/core'
import type { AlertProps } from './Alert.types'
import './Alert.css'

// ---------- VUE ALERT COMPONENT
export const Alert = defineComponent({
   
  name: 'Alert',
  props: {
    variant: {
      type: String as PropType<AlertProps['variant']>,
      default: 'info',
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['dismiss'],
  setup(props, { slots, emit, attrs }) {
    // ---------- REACTIVE VISIBILITY STATE
    const isVisible = ref(true)

    // ---------- DISMISS EVENT HANDLER
    const handleDismiss = () => {
      isVisible.value = false
      emit('dismiss')
    }

    // ---------- ICON MAP COMPUTATION
    const getIconForVariant = (alertVariant = 'info') => {
      const icons: Record<string, string> = {
        info: 'ℹ️',
        success: '✓',
        warning: '⚠',
        danger: '✕',
      }
      return icons[alertVariant] ?? icons.info
    }

    return () => {
      // Early return guard clause when alert is dismissed
      if (!isVisible.value) return null

      // ---------- HEADLESS ALERT CONTROLLER INITIALIZATION
      const controller = new AlertController({
        variant: props.variant,
        dismissible: props.dismissible,
        showIcon: props.showIcon,
      })

      return h(
        'div',
        {
          class: [controller.getAlertClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        [
          controller.shouldShowIcon()
            ? h('span', { class: controller.getIconClasses() }, getIconForVariant(props.variant))
            : null,
          h('div', { class: controller.getContentClasses() }, slots.default?.()),
          controller.isDismissible()
            ? h(
                'button',
                {
                  type: 'button',
                  class: controller.getCloseButtonClasses(),
                  onClick: handleDismiss,
                  'aria-label': 'Close',
                },
                '✕'
              )
            : null,
        ]
      )
    }
  },
})
