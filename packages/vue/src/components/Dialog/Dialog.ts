/**
 * @file Dialog.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Dialog modal component with Trigger, Overlay, Content, Header, Body, Footer, and Close sub-components.
 *
 * @description
 * Renders modal dialog overlays with focus trapping, keyboard escape listeners, backdrop click dismissal, and compound sub-components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, watch, onMounted, onBeforeUnmount, provide, inject, type InjectionKey } from 'vue'
import { DialogController } from '@bleckwolf25/core'
import './Dialog.css'

// ---------- TYPES AND SYMBOLS
export const DialogKey: InjectionKey<{
  open: boolean
  close: () => void
  setOpen: (val: boolean) => void
}> = Symbol('DialogContext')

// ---------- COMPONENTS

// ---------- VUE MAIN DIALOG COMPONENT
export const DialogComponent = defineComponent({
  name: 'Dialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    closeOnEscape: {
      type: Boolean,
      default: true,
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true,
    },
    trapFocus: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:open', 'openChange', 'close'],
  setup(props, { slots, emit, attrs }) {
    // ---------- REACTIVE REFS AND ACTIVE ELEMENT POINTERS
    const dialogRef = ref<HTMLDivElement | null>(null)
    const previousActiveElement = ref<HTMLElement | null>(null)

    // ---------- CLOSE HANDLER
    const handleClose = () => {
      emit('update:open', false)
      emit('openChange', false)
      emit('close')
    }

    // ---------- SET OPEN HANDLER
    const setOpen = (val: boolean) => {
      emit('update:open', val)
      emit('openChange', val)
      if (!val) emit('close')
    }

    provide(DialogKey, { open: props.open, close: handleClose, setOpen })

    // ---------- WATCH OPEN PROPERTY FOR FOCUS MANAGEMENT
    watch(
      () => props.open,
      (newOpen) => {
        if (newOpen) {
          previousActiveElement.value = document.activeElement as HTMLElement
          setTimeout(() => dialogRef.value?.focus(), 0)
        } else {
          previousActiveElement.value?.focus()
        }
      },
      { immediate: true }
    )

    // ---------- KEYDOWN KEYBOARD LISTENERS (ESCAPE & FOCUS TRAP)
    const handleKeyDown = (event: KeyboardEvent) => {
      // Early return guard clause when closed or focus trap disabled
      if (!props.open || !props.trapFocus) return

      const controller = new DialogController({
        open: props.open,
        closeOnEscape: props.closeOnEscape,
        closeOnOverlayClick: props.closeOnOverlayClick,
        trapFocus: props.trapFocus,
      })

      if (event.key === 'Escape' && controller.shouldCloseOnEscape()) {
        handleClose()
      }

      if (event.key === 'Tab') {
        const container = dialogRef.value
        // Early return guard clause if container ref is missing
        if (!container) return

        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
      }
    }

    // ---------- LIFECYCLE MOUNT LISTENERS
    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })

    // ---------- BACKDROP OVERLAY CLICK DISMISS HANDLER
    const handleOverlayClick = (event: MouseEvent) => {
      const controller = new DialogController({
        open: props.open,
        closeOnEscape: props.closeOnEscape,
        closeOnOverlayClick: props.closeOnOverlayClick,
        trapFocus: props.trapFocus,
      })
      if (event.target === event.currentTarget && controller.shouldCloseOnOverlayClick()) {
        handleClose()
      }
    }

    return () => {
      // Early return guard clause when dialog is closed
      if (!props.open) return null

      // ---------- HEADLESS DIALOG CONTROLLER INITIALIZATION
      const controller = new DialogController({
        open: props.open,
        closeOnEscape: props.closeOnEscape,
        closeOnOverlayClick: props.closeOnOverlayClick,
        trapFocus: props.trapFocus,
      })

      return h(
        'div',
        {
          class: controller.getOverlayClasses(),
          onClick: handleOverlayClick,
          ...controller.getDataAttributes(),
        },
        [
          h(
            'div',
            {
              ref: dialogRef,
              class: [controller.getDialogClasses(), attrs.class],
              ...controller.getAriaAttributes(),
              ...controller.getDataAttributes(),
              tabindex: -1,
            },
            slots.default?.()
          ),
        ]
      )
    }
  },
})

// ---------- VUE DIALOG ROOT SUB-COMPONENT
export const DialogRoot = defineComponent({
  name: 'DialogRoot',
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ['update:open', 'openChange'],
  setup(props, { slots, emit }) {
    const handleClose = () => {
      emit('update:open', false)
      emit('openChange', false)
    }
    const setOpen = (val: boolean) => {
      emit('update:open', val)
      emit('openChange', val)
    }

    provide(DialogKey, { open: props.open, close: handleClose, setOpen })

    return () => (slots.default ? slots.default() : null)
  },
})

// ---------- VUE DIALOG TRIGGER SUB-COMPONENT
export const DialogTrigger = defineComponent({
  name: 'DialogTrigger',
  setup(_, { slots, attrs }) {
    const context = inject(DialogKey, null)
    return () =>
      h(
        'button',
        {
          type: 'button',
          class: ['ui-dialog__trigger', attrs.class],
          onClick: () => context?.setOpen(true),
        },
        slots.default?.()
      )
  },
})

// ---------- VUE DIALOG OVERLAY SUB-COMPONENT
export const DialogOverlay = defineComponent({
  name: 'DialogOverlay',
  setup(_, { slots, attrs }) {
    const context = inject(DialogKey, null)
    if (!context?.open) return () => null

    const controller = new DialogController({ open: true })

    return () =>
      h(
        'div',
        {
          class: [controller.getOverlayClasses(), attrs.class],
          onClick: () => { context.close(); },
          ...controller.getDataAttributes(),
        },
        slots.default?.()
      )
  },
})

// ---------- VUE DIALOG CONTENT SUB-COMPONENT
export const DialogContent = defineComponent({
  name: 'DialogContent',
  setup(_, { slots, attrs }) {
    const context = inject(DialogKey, null)
    if (!context?.open) return () => null

    const controller = new DialogController({ open: true })

    return () =>
      h(
        'div',
        {
          class: [controller.getDialogClasses(), attrs.class],
          ...controller.getAriaAttributes(),
          ...controller.getDataAttributes(),
          tabindex: -1,
        },
        slots.default?.()
      )
  },
})

// ---------- VUE DIALOG HEADER SUB-COMPONENT
export const DialogHeader = defineComponent({
  name: 'DialogHeader',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-dialog__header', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE DIALOG BODY SUB-COMPONENT
export const DialogBody = defineComponent({
  name: 'DialogBody',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-dialog__body', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE DIALOG FOOTER SUB-COMPONENT
export const DialogFooter = defineComponent({
  name: 'DialogFooter',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-dialog__footer', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE DIALOG TITLE SUB-COMPONENT
export const DialogTitle = defineComponent({
  name: 'DialogTitle',
  setup(_, { slots, attrs }) {
    return () => h('h2', { class: ['ui-dialog__title', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE DIALOG DESCRIPTION SUB-COMPONENT
export const DialogDescription = defineComponent({
  name: 'DialogDescription',
  setup(_, { slots, attrs }) {
    return () => h('p', { class: ['ui-dialog__description', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE DIALOG CLOSE SUB-COMPONENT
export const DialogClose = defineComponent({
  name: 'DialogClose',
  emits: ['click'],
  setup(_, { slots, attrs, emit }) {
    const context = inject(DialogKey, { open: false, close: () => { /* noop */ }, setOpen: () => { /* noop */ } })

    return () =>
      h(
        'button',
        {
          type: 'button',
          class: ['ui-dialog__close-button', attrs.class],
          'aria-label': 'Close',
          onClick: (e: MouseEvent) => {
            emit('click', e)
            if (!e.defaultPrevented) {
              context.close()
            }
          },
        },
        slots.default?.() ?? '✕'
      )
  },
})

// ---------- COMPOUND DIALOG EXPORT
export const Dialog = Object.assign(DialogComponent, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
})
