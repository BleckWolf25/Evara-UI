/**
 * @file Radio.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Radio and RadioGroup components.
 *
 * @description
 * Extends core RadioProps and RadioGroupProps interfaces with Vue modelValue and checked parameters.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type {
  RadioProps as CoreRadioProps,
  RadioGroupProps as CoreRadioGroupProps,
} from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE RADIO GROUP PROPS INTERFACE
export interface RadioGroupProps extends Omit<CoreRadioGroupProps, 'value' | 'defaultValue'> {
  value?: string
  modelValue?: string
  defaultValue?: string
}

// ---------- VUE RADIO PROPS INTERFACE
export interface RadioProps extends Omit<CoreRadioProps, 'checked' | 'name'> {
  label?: string
  checked?: boolean
  defaultChecked?: boolean
}
