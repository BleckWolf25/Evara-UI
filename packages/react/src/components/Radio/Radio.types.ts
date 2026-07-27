/**
 * @file Radio.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Radio and RadioGroup components.
 *
 * @description
 * Extends core RadioProps and RadioGroupProps with HTML attributes and ReactNode labels.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import type {
  RadioProps as CoreRadioProps,
  RadioGroupProps as CoreRadioGroupProps,
} from '@evara-ui/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT RADIO GROUP PROPS INTERFACE
export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'disabled' | 'onChange' | 'value' | 'defaultValue'>,
    Omit<CoreRadioGroupProps, 'value' | 'defaultValue'> {
  value?: string | undefined
  defaultValue?: string | undefined
  onChange?: ((value: string) => void) | undefined
  onValueChange?: ((value: string) => void) | undefined
  children?: ReactNode
}

// ---------- REACT RADIO PROPS INTERFACE
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'checked' | 'defaultChecked' | 'type' | 'value' | 'name'>,
    Omit<CoreRadioProps, 'checked' | 'name'> {
  label?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
}
