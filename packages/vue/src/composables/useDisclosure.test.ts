/**
 * @file useDisclosure.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for useDisclosure.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
// @vitest-environment jsdom
import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { useDisclosure } from './useDisclosure'

// ---------- TESTS
describe('useDisclosure Composable', () => {
  it('initializes with defaultOpen state when uncontrolled', () => {
    const { isOpen } = useDisclosure({ defaultOpen: true })
    expect(isOpen.value).toBe(true)
  })

  it('initializes with false when no options provided', () => {
    const { isOpen } = useDisclosure()
    expect(isOpen.value).toBe(false)
  })

  it('updates state internally when uncontrolled and openDialog/closeDialog/toggle called', () => {
    const { isOpen, openDialog, closeDialog, toggle } = useDisclosure()
    expect(isOpen.value).toBe(false)

    openDialog()
    expect(isOpen.value).toBe(true)

    closeDialog()
    expect(isOpen.value).toBe(false)

    toggle()
    expect(isOpen.value).toBe(true)
  })

  it('fires onOpenChange, onOpen, and onClose callbacks correctly', () => {
    const onOpenChange = vi.fn()
    const onOpen = vi.fn()
    const onClose = vi.fn()

    const { openDialog, closeDialog } = useDisclosure({
      onOpenChange,
      onOpen,
      onClose,
    })

    openDialog()
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(onOpen).toHaveBeenCalled()

    closeDialog()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClose).toHaveBeenCalled()
  })

  it('respects controlled open ref without updating internal state directly', () => {
    const controlledOpen = ref(true)
    const onOpenChange = vi.fn()

    const { isOpen, closeDialog } = useDisclosure({
      open: controlledOpen,
      onOpenChange,
    })

    expect(isOpen.value).toBe(true)
    closeDialog()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(isOpen.value).toBe(true) // remains true until controlled ref updates
  })
})
