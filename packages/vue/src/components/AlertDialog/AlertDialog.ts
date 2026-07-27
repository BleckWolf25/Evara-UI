/**
 * @file AlertDialog.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue AlertDialog modal confirmation prompt component.
 *
 * @description
 * Renders modal confirmation popups with backdrop overlay clicks, focus restore, keyboard escape listeners, and alertdialog ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { defineComponent, h, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { AlertDialogController } from '@evara-ui/core'
import './AlertDialog.css'

// ---------- VUE ALERT DIALOG COMPONENT
export const AlertDialog = defineComponent({
  name: 'AlertDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    confirmLabel: {
      type: String,
      default: 'Confirm',
    },
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
  },
  emits: ['update:open', 'openChange', 'close', 'confirm', 'cancel'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE REFS AND ACTIVE ELEMENT POINTERS
    const alertDialogRef = ref<HTMLDivElement | null>(null)
    const previousActiveElement = ref<HTMLElement | null>(null)

    // ---------- CLOSE HANDLER
    const handleClose = () => {
      emit('update:open', false)
      emit('openChange', false)
      emit('close')
    }

    // ---------- CONFIRM HANDLER
    const handleConfirm = () => {
      emit('confirm')
      handleClose()
    }

    // ---------- CANCEL HANDLER
    const handleCancel = () => {
      emit('cancel')
      handleClose()
    }

    // ---------- KEYDOWN ESCAPE LISTENER HANDLER
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && props.open) {
        emit('cancel')
        handleClose()
      }
    }

    // ---------- WATCH FOR OPEN PROPOSAL AND FOCUS TRAP REASSIGNMENT
    watch(
      () => props.open,
      (newOpen) => {
        if (newOpen) {
          previousActiveElement.value = document.activeElement as HTMLElement
          setTimeout(() => alertDialogRef.value?.focus(), 0)
        } else {
          previousActiveElement.value?.focus()
        }
      },
      { immediate: true }
    )

    // ---------- LIFECYCLE MOUNT LISTENERS
    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })

    // ---------- BACKDROP OVERLAY CLICK DISMISS HANDLER
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        emit('cancel')
        handleClose()
      }
    }

    return () => {
      // Early return guard clause when dialog is closed
      if (!props.open) return null

      // ---------- HEADLESS ALERT DIALOG CONTROLLER INITIALIZATION
      const controller = new AlertDialogController({
        open: props.open,
        title: props.title,
        description: props.description,
        confirmLabel: props.confirmLabel,
        cancelLabel: props.cancelLabel,
      })

      return h(
        'div',
        {
          class: controller.getOverlayClasses(),
          onClick: handleOverlayClick,
        },
        [
          h(
            'div',
            {
              ref: alertDialogRef,
              class: [controller.getAlertDialogClasses(), attrs.class],
              ...controller.getAriaAttributes(),
              tabindex: -1,
            },
            [
              h('div', { class: controller.getHeaderClasses() }, [
                h('h2', { id: 'alert-dialog-title', class: controller.getTitleClasses() }, controller.getTitle()),
              ]),
              h('div', { class: controller.getBodyClasses() }, [
                h('p', { id: 'alert-dialog-description', class: controller.getDescriptionClasses() }, controller.getDescription()),
              ]),
              h('div', { class: controller.getFooterClasses() }, [
                h(
                  'button',
                  {
                    type: 'button',
                    class: controller.getCancelButtonClasses(),
                    onClick: handleCancel,
                  },
                  controller.getCancelLabel()
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    class: controller.getConfirmButtonClasses(),
                    onClick: handleConfirm,
                  },
                  controller.getConfirmLabel()
                ),
              ]),
            ]
          ),
        ]
      )
    }
  },
})
