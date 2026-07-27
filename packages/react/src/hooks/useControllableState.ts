/**
 * @file useControllableState.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Controlled and uncontrolled React state management hook.
 *
 * @description
 * Provides unified state management for React components supporting both controlled (prop-driven)
 * and uncontrolled (internal state with default value) paradigms, invoking onChange callbacks when state updates.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { useState, useCallback } from 'react'

// ---------- INTERFACES AND TYPES

// ---------- CONTROLLABLE STATE PROPS INTERFACE
export interface UseControllableStateProps<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

// ---------- HOOKS

// ---------- USE CONTROLLABLE STATE HOOK
export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T | undefined, (value: T | ((prev: T | undefined) => T)) => void] {
  // ---------- CONTROLLED MODE FLAG COMPUTATION
  const isControlled = controlledValue !== undefined

  // ---------- UNCONTROLLED FALLBACK STATE
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue)

  // ---------- DERIVED ACTIVE VALUE
  const value = isControlled ? controlledValue : uncontrolledValue

  // ---------- VALUE UPDATE CALLBACK SETTER
  const setValue = useCallback(
    (nextValue: T | ((prev: T | undefined) => T)) => {
      // Resolve function values or direct state payloads
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T | undefined) => T)(value)
          : nextValue

      // ---------- UNCONTROLLED STATE MUTATION
      if (!isControlled) {
        setUncontrolledValue(resolvedValue)
      }

      // ---------- EVENT LISTENER INVOCATION
      onChange?.(resolvedValue)
    },
    [isControlled, value, onChange],
  )

  return [value, setValue]
}
