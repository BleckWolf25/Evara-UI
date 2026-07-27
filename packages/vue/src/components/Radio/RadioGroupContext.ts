/**
 * @file RadioGroupContext.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue InjectionKey context definition for RadioGroup radio button synchronization.
 *
 * @description
 * Defines RadioGroupContextValue interface and exports RadioGroupKey symbol for Vue injection context.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { type InjectionKey, type ComputedRef } from 'vue'

// ---------- TYPES AND INTERFACES

// ---------- RADIO GROUP CONTEXT VALUE INTERFACE
export interface RadioGroupContextValue {
  name: ComputedRef<string | undefined>
  value: ComputedRef<string | undefined>
  disabled: ComputedRef<boolean>
  required: ComputedRef<boolean>
  onChange: (val: string) => void
}

// ---------- INJECTION SYMBOLS
export const RadioGroupKey: InjectionKey<RadioGroupContextValue> = Symbol('RadioGroupContext')
