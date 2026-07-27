/**
 * @file ProgressBar.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the ProgressBar component controller.
 *
 * @description
 * Defines ProgressBarProps configuration interface including percentage values, indeterminate mode, sizes, and colors.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size, Color } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- PROGRESS BAR PROPS INTERFACE
export interface ProgressBarProps extends BaseProps {
  value?: number | undefined
  indeterminate?: boolean | undefined
  size?: Size | undefined
  color?: Color | undefined
}
