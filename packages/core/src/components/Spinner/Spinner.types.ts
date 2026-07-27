/**
 * @file Spinner.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Spinner component controller.
 *
 * @description
 * Defines SpinnerProps configuration interface including size tokens and color variants.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size, Color } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- SPINNER PROPS INTERFACE
export interface SpinnerProps extends BaseProps {
  size?: Size | undefined
  color?: Color | undefined
}
