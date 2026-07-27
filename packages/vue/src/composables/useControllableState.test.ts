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
import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { useControllableState } from './useControllableState'

// ---------- TESTS
describe('useControllableState Composable', () => {
  it('uses defaultValue when uncontrolled', () => {
    const [value] = useControllableState({ defaultValue: 'hello' })
    expect(value.value).toBe('hello')
  })

  it('updates uncontrolled value when setter is called with direct value or updater function', () => {
    const onChange = vi.fn()
    const [value, setValue] = useControllableState<number>({ defaultValue: 10, onChange })

    setValue(20)
    expect(value.value).toBe(20)
    expect(onChange).toHaveBeenCalledWith(20)

    setValue((prev) => (prev ?? 0) + 5)
    expect(value.value).toBe(25)
    expect(onChange).toHaveBeenCalledWith(25)
  })

  it('prioritizes controlled value over defaultValue and updates', () => {
    const controlledRef = ref('controlled')
    const onChange = vi.fn()
    const [value, setValue] = useControllableState({ value: controlledRef, defaultValue: 'default', onChange })

    expect(value.value).toBe('controlled')
    setValue('new value')
    expect(onChange).toHaveBeenCalledWith('new value')
    expect(value.value).toBe('controlled')
  })
})
