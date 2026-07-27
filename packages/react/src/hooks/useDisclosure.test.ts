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
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDisclosure } from './useDisclosure'

describe('useDisclosure Hook', () => {
  it('initializes with defaultOpen state when uncontrolled', () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }))
    expect(result.current.open).toBe(true)
    expect(result.current.isOpen).toBe(true)
  })

  it('initializes with false when no props provided', () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current.open).toBe(false)
  })

  it('updates state internally when uncontrolled and openDialog/closeDialog/toggle called', () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current.open).toBe(false)

    act(() => {
      result.current.openDialog()
    })
    expect(result.current.open).toBe(true)

    act(() => {
      result.current.closeDialog()
    })
    expect(result.current.open).toBe(false)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.open).toBe(true)
  })

  it('fires onOpenChange, onOpen, and onClose callbacks correctly', () => {
    const onOpenChange = vi.fn()
    const onOpen = vi.fn()
    const onClose = vi.fn()

    const { result } = renderHook(() =>
      useDisclosure({ onOpenChange, onOpen, onClose })
    )

    act(() => {
      result.current.openDialog()
    })
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      result.current.closeDialog()
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('respects controlled open prop without updating internal state directly', () => {
    const onOpenChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ open }) => useDisclosure({ open, onOpenChange }),
      { initialProps: { open: false } }
    )

    expect(result.current.open).toBe(false)

    act(() => {
      result.current.openDialog()
    })
    expect(onOpenChange).toHaveBeenCalledWith(true)
    // Controlled prop stays false until parent updates it
    expect(result.current.open).toBe(false)

    rerender({ open: true })
    expect(result.current.open).toBe(true)
  })
})
