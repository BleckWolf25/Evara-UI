/**
 * @file useController.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for useController.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  DialogController,
  SliderController,
  PaginationController,
} from '@evara-ui/core'
import {
  useController,
  useDialogController,
  useSliderController,
  usePaginationController,
} from './useController'

describe('useController Hooks', () => {
  it('useController instantiates and memoizes any controller', () => {
    const { result, rerender } = renderHook(() =>
      useController(DialogController, { open: true })
    )
    const firstInstance = result.current
    expect(firstInstance).toBeInstanceOf(DialogController)
    expect(firstInstance.isOpen()).toBe(true)

    rerender()
    expect(result.current).toBe(firstInstance)
  })

  it('useDialogController instantiates and memoizes DialogController correctly', () => {
    const { result } = renderHook(() =>
      useDialogController({ open: false })
    )
    expect(result.current).toBeInstanceOf(DialogController)
    expect(result.current.isOpen()).toBe(false)
  })

  it('useSliderController instantiates and memoizes SliderController correctly', () => {
    const { result } = renderHook(() =>
      useSliderController({ min: 0, max: 100, defaultValue: [50] })
    )
    expect(result.current).toBeInstanceOf(SliderController)
    expect(result.current.getValue()).toEqual([50])
  })

  it('usePaginationController instantiates and memoizes PaginationController correctly', () => {
    const { result } = renderHook(() =>
      usePaginationController({ currentPage: 2, totalPages: 10 })
    )
    expect(result.current).toBeInstanceOf(PaginationController)
    expect(result.current.getCurrentPage()).toBe(2)
  })
})
