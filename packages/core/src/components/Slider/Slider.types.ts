/**
 * @file Slider.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Slider component controller.
 *
 * @description
 * Defines SliderProps configuration interface including min, max, step, range mode, and value change callbacks.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- SLIDER PROPS INTERFACE
export interface SliderProps extends BaseProps {
  value?: number | number[] | undefined
  defaultValue?: number | number[] | undefined
  onChange?: ((value: number | number[]) => void) | undefined
  min?: number | undefined
  max?: number | undefined
  step?: number | undefined
  range?: boolean | undefined
  disabled?: boolean | undefined
  size?: Size | undefined
}
