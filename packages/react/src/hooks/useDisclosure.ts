/**
 * @file useDisclosure.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Disclosure open/close toggle state management hook.
 *
 * @description
 * Manages controlled and uncontrolled open/close toggle states for dialogs, modals, popovers, and menus,
 * invoking open, close, and openChange callbacks seamlessly.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { useState, useCallback } from 'react'

// ---------- INTERFACES AND TYPES

// ---------- DISCLOSURE PROPS INTERFACE
export interface UseDisclosureProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onOpen?: () => void
  onClose?: () => void
}

// ---------- DISCLOSURE RETURN INTERFACE
export interface UseDisclosureReturn {
  open: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  openDialog: () => void
  closeDialog: () => void
  toggle: () => void
}

// ---------- HOOKS

// ---------- USE DISCLOSURE HOOK
export function useDisclosure(props: UseDisclosureProps = {}): UseDisclosureReturn {
  const {
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    onOpen,
    onClose,
  } = props

  // ---------- CONTROLLED MODE COMPUTATION
  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const open = isControlled ? controlledOpen : uncontrolledOpen

  // ---------- OPEN CHANGE EVENT HANDLER
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      // ---------- UNCONTROLLED STATE MUTATION
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
      // ---------- CALLBACK INVOCATIONS
      if (newOpen) {
        onOpen?.()
      } else {
        onClose?.()
      }
    },
    [isControlled, onOpenChange, onOpen, onClose],
  )

  // ---------- ACTION CALLBACK HELPERS
  const openDialog = useCallback(() => { handleOpenChange(true); }, [handleOpenChange])
  const closeDialog = useCallback(() => { handleOpenChange(false); }, [handleOpenChange])
  const toggle = useCallback(() => { handleOpenChange(!open); }, [handleOpenChange, open])

  return {
    open,
    isOpen: open,
    onOpenChange: handleOpenChange,
    openDialog,
    closeDialog,
    toggle,
  }
}
