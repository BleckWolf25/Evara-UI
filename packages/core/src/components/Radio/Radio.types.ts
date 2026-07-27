/**
 * @file Radio.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Radio and RadioGroup components controller.
 *
 * @description
 * Defines RadioGroupProps and RadioProps configuration interfaces for radio button inputs.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- RADIO GROUP PROPS INTERFACE
export interface RadioGroupProps extends BaseProps {
  value?: string | undefined
  defaultValue?: string | undefined
  disabled?: boolean | undefined
  required?: boolean | undefined
  name?: string | undefined
}

// ---------- RADIO PROPS INTERFACE
export interface RadioProps extends BaseProps {
  value: string
  checked?: boolean | undefined
  disabled?: boolean | undefined
  required?: boolean | undefined
  name?: string | undefined
}
