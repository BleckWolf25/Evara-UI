/**
 * @file index.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Core design system constants for sizes, variants, and colors.
 *
 * @description
 * Defines immutable constant maps for element dimensions, visual style variants,
 * and semantic status color tokens across all Evara UI component controllers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- CONSTANTS

// ---------- ELEMENT SIZES CONSTANTS
export const SIZES = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const

// ---------- STYLE VARIANTS CONSTANTS
export const VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
} as const

// ---------- SEMANTIC COLOR CONSTANTS
export const COLORS = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const