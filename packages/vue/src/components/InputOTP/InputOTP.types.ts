/**
 * @file InputOTP.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue InputOTP component.
 *
 * @description
 * Extends core InputOTPProps interface with Vue modelValue string binding.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { InputOTPProps as CoreInputOTPProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE INPUT OTP PROPS INTERFACE
export interface InputOTPProps extends CoreInputOTPProps {
  modelValue?: string
}
