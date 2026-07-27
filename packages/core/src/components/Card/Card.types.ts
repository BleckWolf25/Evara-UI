/**
 * @file Card.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Card component controller.
 *
 * @description
 * Defines CardVariant, CardElevation, and CardProps configuration interface for core card controllers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- CARD VARIANT UNION TYPE
export type CardVariant = 'default' | 'outlined' | 'elevated'

// ---------- CARD ELEVATION UNION TYPE
export type CardElevation = 'none' | 'sm' | 'md' | 'lg'

// ---------- CARD PROPS INTERFACE
export interface CardProps extends BaseProps {
  variant?: CardVariant | undefined
  elevation?: CardElevation | undefined
}
