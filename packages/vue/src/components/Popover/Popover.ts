/**
 * @file Popover.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Popover floating content card component with Root, Trigger, Content, and Close sub-components.
 *
 * @description
 * Renders positioned floating card panels with trigger buttons, click-outside dismissal, and popover ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, watch, onMounted, onBeforeUnmount, provide, inject, type PropType } from 'vue'
import { PopoverController } from '@evara-ui/core'
import type { PopoverProps } from './Popover.types'
import './Popover.css'

// ---------- TYPES AND SYMBOLS
const PopoverKey = Symbol('PopoverContext')

export interface PopoverContext {
  open: boolean
  setOpen: (val: boolean) => void
}

// ---------- COMPONENTS

// ---------- VUE MAIN POPOVER COMPONENT
export const PopoverComponent = defineComponent({
  name: 'Popover',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String as PropType<PopoverProps['position']>,
      default: 'bottom',
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:open', 'openChange', 'close'],
  setup(props, { slots, emit, attrs }) {
    // ---------- REACTIVE REFS AND OPEN STATE
    const popoverRef = ref<HTMLDivElement | null>(null)
    const triggerRef = ref<HTMLElement | null>(null)
    const internalOpen = ref(props.open)

    watch(
      () => props.open,
      (newVal) => {
        internalOpen.value = newVal
      }
    )

    // ---------- TRIGGER CLICK TOGGLE HANDLER
    const handleTriggerClick = () => {
      const newState = !internalOpen.value
      internalOpen.value = newState
      emit('update:open', newState)
      emit('openChange', newState)
      if (!newState) emit('close')
    }

    // ---------- CLICK OUTSIDE DISMISSAL HANDLER
    const handleClickOutside = (event: MouseEvent) => {
      // Early return guard clause when closed or click-outside disabled
      if (!internalOpen.value || !props.closeOnClickOutside) return
      if (
        popoverRef.value &&
        !popoverRef.value.contains(event.target as Node) &&
        triggerRef.value &&
        !triggerRef.value.contains(event.target as Node)
      ) {
        internalOpen.value = false
        emit('update:open', false)
        emit('openChange', false)
        emit('close')
      }
    }

    // ---------- LIFECYCLE MOUNT LISTENERS
    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    return () => {
      // ---------- HEADLESS POPOVER CONTROLLER INITIALIZATION
      const controller = new PopoverController({
        open: internalOpen.value,
        position: props.position,
        closeOnClickOutside: props.closeOnClickOutside,
      })

      const triggerMarkup = slots.trigger
        ? h(
            'span',
            {
              ref: triggerRef,
              onClick: handleTriggerClick,
              style: { display: 'inline-block' },
            },
            slots.trigger()
          )
        : null

      return h('div', { style: { position: 'relative', display: 'inline-block' } }, [
        triggerMarkup,
        internalOpen.value
          ? h(
              'div',
              {
                ref: popoverRef,
                class: [controller.getPopoverClasses(), attrs.class],
                ...controller.getAriaAttributes(),
              },
              slots.default?.()
            )
          : null,
      ])
    }
  },
})

// ---------- VUE POPOVER ROOT SUB-COMPONENT
export const PopoverRoot = defineComponent({
  name: 'PopoverRoot',
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ['update:open', 'openChange'],
  setup(props, { slots, emit }) {
    const setOpen = (val: boolean) => {
      emit('update:open', val)
      emit('openChange', val)
    }

    provide(PopoverKey, { open: props.open, setOpen })

    return () => (slots.default ? slots.default() : null)
  },
})

// ---------- VUE POPOVER TRIGGER SUB-COMPONENT
export const PopoverTrigger = defineComponent({
  name: 'PopoverTrigger',
  setup(_, { slots, attrs }) {
    const context = inject<PopoverContext | null>(PopoverKey, null)
    return () =>
      h(
        'button',
        {
          type: 'button',
          class: ['ui-popover__trigger', attrs.class],
          onClick: () => context?.setOpen(!context.open),
        },
        slots.default?.()
      )
  },
})

// ---------- VUE POPOVER CONTENT SUB-COMPONENT
export const PopoverContent = defineComponent({
  name: 'PopoverContent',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-popover__content', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE POPOVER CLOSE SUB-COMPONENT
export const PopoverClose = defineComponent({
  name: 'PopoverClose',
  setup(_, { slots, attrs }) {
    const context = inject<PopoverContext | null>(PopoverKey, null)
    return () =>
      h(
        'button',
        {
          type: 'button',
          class: ['ui-popover__close', attrs.class],
          onClick: () => context?.setOpen(false),
        },
        slots.default?.() ?? '✕'
      )
  },
})

// ---------- COMPOUND POPOVER EXPORT
export const Popover = Object.assign(PopoverComponent, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
})
