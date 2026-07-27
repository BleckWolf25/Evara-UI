/**
 * @file ContextMenu.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue ContextMenu right-click popup menu component.
 *
 * @description
 * Renders floating right-click context menus at cursor coordinates (x,y) with click-outside dismissal and menuitem ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, onMounted, onBeforeUnmount, type PropType } from 'vue'
import { ContextMenuController } from '@evara-ui/core'
import type { ContextMenuProps } from './ContextMenu.types'
import './ContextMenu.css'

// ---------- COMPONENTS

// ---------- VUE CONTEXT MENU COMPONENT
export const ContextMenu = defineComponent({
  name: 'ContextMenu',
  props: {
    items: {
      type: Array as PropType<ContextMenuProps['items']>,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:open', 'openChange', 'close'],
  setup(props, { emit, attrs }) {
    // ---------- REACTIVE CONTAINER REF
    const contextMenuRef = ref<HTMLDivElement | null>(null)

    // ---------- CLOSE HANDLER
    const handleClose = () => {
      emit('update:open', false)
      emit('openChange', false)
      emit('close')
    }

    // ---------- CLICK OUTSIDE HANDLER
    const handleClickOutside = (event: MouseEvent) => {
      if (props.open && contextMenuRef.value && !contextMenuRef.value.contains(event.target as Node)) {
        handleClose()
      }
    }

    // ---------- ESCAPE KEYDOWN HANDLER
    const handleEscape = (event: KeyboardEvent) => {
      if (props.open && event.key === 'Escape') {
        handleClose()
      }
    }

    // ---------- LIFECYCLE EVENT LISTENERS
    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    })

    // ---------- ITEM SELECTION HANDLER
    const handleItemClick = (item: ContextMenuProps['items'][0]) => {
      // Early return guard clause for disabled menu items
      if (item.disabled) return
      item.onClick?.()
      handleClose()
    }

    return () => {
      // Early return guard clause when context menu is closed
      if (!props.open) return null

      // ---------- HEADLESS CONTEXT MENU CONTROLLER INITIALIZATION
      const controller = new ContextMenuController({
        items: props.items,
        open: props.open,
        x: props.x,
        y: props.y,
      })
      const position = controller.getPosition()

      return h(
        'div',
        {
          ref: contextMenuRef,
          class: [controller.getContextMenuClasses(), attrs.class],
          style: {
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
          },
          ...controller.getAriaAttributes(),
        },
        controller.getItems().map((item, index) =>
          h(
            'div',
            {
              key: index,
              class: controller.getItemClasses(item.disabled ?? false, item.divider ?? false),
              onClick: () => { handleItemClick(item); },
              role: 'menuitem',
              tabindex: item.disabled ? -1 : 0,
            },
            item.label
          )
        )
      )
    }
  },
})
