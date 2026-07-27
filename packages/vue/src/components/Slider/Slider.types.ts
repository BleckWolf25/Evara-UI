/**
 * @file Slider.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Slider component.
 *
 * @description
 * Extends core SliderProps interface with Vue modelValue and numeric/array binding parameters.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SliderProps as CoreSliderProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE SLIDER PROPS INTERFACE
export interface SliderProps extends Omit<CoreSliderProps, 'value' | 'defaultValue'> {
  value?: number | number[]
  modelValue?: number | number[]
  defaultValue?: number | number[]
}
