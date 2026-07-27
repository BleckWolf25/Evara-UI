/**
 * @file RadioGroupContext.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React context definition for RadioGroup radio button synchronization.
 *
 * @description
 * Defines RadioGroupContextValue interface and exports RadioGroupContext for passing shared radio group values down to child radios.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { createContext } from 'react'

// ---------- TYPES AND INTERFACES

// ---------- RADIO GROUP CONTEXT VALUE INTERFACE
interface RadioGroupContextValue {
  name?: string | undefined
  value?: string | undefined
  disabled?: boolean | undefined
  required?: boolean | undefined
  onChange?: ((value: string) => void) | undefined
}

// ---------- CONTEXT DEFINITIONS
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)
