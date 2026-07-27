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
import { describe, it, expect } from 'vitest'
import {
  useController,
  useDialogController,
  useSliderController,
  usePaginationController,
} from './useController'
import {
  DialogController,
  SliderController,
  PaginationController,
} from '@bleckwolf25/core'

// ---------- TESTS
describe('useController Composables', () => {
  it('useController instantiates and memoizes any controller inside computed ref', () => {
    const controllerRef = useController(DialogController, { open: true })
    expect(controllerRef.value).toBeInstanceOf(DialogController)
    expect(controllerRef.value.isOpen()).toBe(true)
  })

  it('useDialogController instantiates DialogController correctly', () => {
    const controllerRef = useDialogController({ open: false })
    expect(controllerRef.value).toBeInstanceOf(DialogController)
    expect(controllerRef.value.isOpen()).toBe(false)
  })

  it('useSliderController instantiates SliderController correctly', () => {
    const controllerRef = useSliderController({ min: 0, max: 100, value: [50] })
    expect(controllerRef.value).toBeInstanceOf(SliderController)
    expect(controllerRef.value.getValue()).toEqual([50])
  })

  it('usePaginationController instantiates PaginationController correctly', () => {
    const controllerRef = usePaginationController({ currentPage: 2, totalPages: 10 })
    expect(controllerRef.value).toBeInstanceOf(PaginationController)
    expect(controllerRef.value.getCurrentPage()).toBe(2)
    expect(controllerRef.value.getTotalPages()).toBe(10)
  })
})
