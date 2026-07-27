/**
 * @file useControllableState.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue 3 controlled and uncontrolled reactive state composable.
 *
 * @description
 * Manages controlled and uncontrolled reactive component states in Vue 3, accepting prop refs, getter functions,
 * or direct values while maintaining fallback uncontrolled ref state.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- IMPORTS
import { ref, computed, type Ref } from 'vue'

// ---------- CONTROLLABLE STATE PROPS INTERFACE
export interface UseControllableStateProps<T> {
  value?: Ref<T | undefined> | (() => T | undefined) | T
  defaultValue?: T
  onChange?: (value: T) => void
}

// ---------- USE CONTROLLABLE STATE COMPOSABLE
export function useControllableState<T>({
  value: controlledValueInput,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [Ref<T | undefined>, (value: T | ((prev: T | undefined) => T)) => void] {
  // ---------- UNCONTROLLED REF STATE INITIALIZATION
  const uncontrolledValue = ref<T | undefined>(defaultValue) as Ref<T | undefined>

  // ---------- CONTROLLED MODE FLAG GETTER
  const isControlled = () => controlledValueInput !== undefined

  // ---------- COMPUTED VALUE DERIVATION
  const computedValue = computed<T | undefined>(() => {
    if (controlledValueInput !== undefined) {
      if (typeof controlledValueInput === 'function') return (controlledValueInput as () => T | undefined)()
      if (typeof controlledValueInput === 'object' && controlledValueInput !== null && 'value' in controlledValueInput) {
        return (controlledValueInput).value
      }
      return controlledValueInput
    }
    return uncontrolledValue.value
  })

  // ---------- VALUE SETTER METHOD
  const setValue = (nextValue: T | ((prev: T | undefined) => T)) => {
    const resolvedValue =
      typeof nextValue === 'function'
        ? (nextValue as (prev: T | undefined) => T)(computedValue.value)
        : nextValue

    // ---------- UNCONTROLLED STATE MUTATION
    if (!isControlled()) {
      uncontrolledValue.value = resolvedValue
    }
    onChange?.(resolvedValue)
  }

  return [computedValue, setValue]
}
