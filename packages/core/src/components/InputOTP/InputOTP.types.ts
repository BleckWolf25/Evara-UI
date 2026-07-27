/**
 * @file InputOTP.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the InputOTP component controller.
 *
 * @description
 * Defines InputOTPProps configuration interface including length, value, size, and autoFocus properties.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- INPUT OTP PROPS INTERFACE
export interface InputOTPProps extends BaseProps {
  length?: number | undefined
  value?: string | undefined
  defaultValue?: string | undefined
  onChange?: ((value: string) => void) | undefined
  size?: Size | undefined
  disabled?: boolean | undefined
  autoFocus?: boolean | undefined
}
