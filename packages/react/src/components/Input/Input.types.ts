/**
 * @file Input.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Input component.
 *
 * @description
 * Extends core InputProps with InputHTMLAttributes<HTMLInputElement>, prefix/suffix ReactNode slots, and onValueChange handlers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputProps as CoreInputProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT INPUT PROPS INTERFACE
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'size' | 'prefix'>,
    Omit<CoreInputProps, 'value' | 'defaultValue' | 'type'> {
  prefix?: ReactNode
  suffix?: ReactNode
  onValueChange?: (value: string) => void
}
