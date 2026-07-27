/**
 * @file useDisclosure.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue 3 disclosure open/close toggle composable.
 *
 * @description
 * Manages open/close toggle state for dialogs, modals, popovers, and context menus in Vue 3,
 * providing reactive ref states and helper action functions.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { ref, computed, type Ref } from 'vue'

// ---------- DISCLOSURE PROPS INTERFACE
export interface UseDisclosureProps {
  defaultOpen?: boolean
  open?: Ref<boolean> | (() => boolean) | boolean
  onOpenChange?: (open: boolean) => void
  onOpen?: () => void
  onClose?: () => void
}

// ---------- DISCLOSURE RETURN INTERFACE
export interface UseDisclosureReturn {
  open: Ref<boolean>
  isOpen: Ref<boolean>
  onOpenChange: (open: boolean) => void
  openDialog: () => void
  closeDialog: () => void
  toggle: () => void
}

// ---------- USE DISCLOSURE COMPOSABLE
export function useDisclosure(props: UseDisclosureProps = {}): UseDisclosureReturn {
  const {
    defaultOpen = false,
    onOpenChange,
    onOpen,
    onClose,
  } = props

  // ---------- STATE REF INITIALIZATION
  const uncontrolledOpen = ref(defaultOpen)

  // ---------- CONTROLLED MODE GETTER
  const isControlled = () => props.open !== undefined

  // ---------- COMPUTED OPEN STATE DERIVATION
  const openComputed = computed<boolean>(() => {
    if (props.open !== undefined) {
      if (typeof props.open === 'function') return props.open()
      if (typeof props.open === 'object' && 'value' in props.open) return props.open.value
      return props.open
    }
    return uncontrolledOpen.value
  })

  // ---------- OPEN CHANGE EVENT HANDLER
  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled()) {
      uncontrolledOpen.value = newOpen
    }
    onOpenChange?.(newOpen)
    if (newOpen) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  // ---------- ACTION METHODS
  const openDialog = () => { handleOpenChange(true); }
  const closeDialog = () => { handleOpenChange(false); }
  const toggle = () => { handleOpenChange(!openComputed.value); }

  return {
    open: openComputed,
    isOpen: openComputed,
    onOpenChange: handleOpenChange,
    openDialog,
    closeDialog,
    toggle,
  }
}
