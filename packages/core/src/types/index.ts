/**
 * @file index.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Global TypeScript type definitions and core interfaces.
 *
 * @description
 * Defines common design system primitive types, base component properties,
 * configuration structures, standard ARIA attribute schemas, and state objects.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS

// ---------- TYPE DECLARATIONS

// ---------- PRIMITIVE TYPES
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type Color = 'default' | 'success' | 'warning' | 'error'

// ---------- BASE PROPERTY INTERFACES
export interface BaseProps {
  id?: string | undefined
  className?: string | undefined
  disabled?: boolean | undefined
}

// ---------- COMPONENT CONFIGURATION INTERFACES
export interface ComponentConfig {
  size?: Size
  variant?: Variant
  color?: Color
}

// ---------- ACCESSIBILITY ARIA ATTRIBUTES INTERFACE
export interface AriaProps {
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-details'?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  'aria-disabled'?: boolean | 'true' | 'false'
  'aria-busy'?: boolean | 'true' | 'false'
}

// ---------- INTERACTION STATE INTERFACES
export interface ButtonState {
  isPressed: boolean
  isFocused: boolean
  isHovered: boolean
}