/**
 * @file useControllableState.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for useControllableState.
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
import { useControllableState } from './useControllableState'

describe('useControllableState Hook', () => {
  it('uses defaultValue when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControllableState<string>({ defaultValue: 'initial' })
    )
    const [value] = result.current
    expect(value).toBe('initial')
  })

  it('updates uncontrolled value when setter is called with direct value or updater function', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState<number>({ defaultValue: 10, onChange })
    )

    act(() => {
      const [, setValue] = result.current
      setValue(20)
    })
    expect(result.current[0]).toBe(20)
    expect(onChange).toHaveBeenCalledWith(20)

    act(() => {
      const [, setValue] = result.current
      setValue((prev) => (prev ?? 0) + 5)
    })
    expect(result.current[0]).toBe(25)
    expect(onChange).toHaveBeenCalledWith(25)
  })

  it('prioritizes controlled value over defaultValue and internal state updates', () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState<string>({ value, defaultValue: 'fallback', onChange }),
      { initialProps: { value: 'controlled' } }
    )

    expect(result.current[0]).toBe('controlled')

    act(() => {
      const [, setValue] = result.current
      setValue('attempted update')
    })
    expect(onChange).toHaveBeenCalledWith('attempted update')
    // Value remains controlled
    expect(result.current[0]).toBe('controlled')

    rerender({ value: 'new controlled' })
    expect(result.current[0]).toBe('new controlled')
  })
})
