/**
 * @file Slider.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Slider numeric range input component.
 *
 * @description
 * Computes slider track class names, thumb drag states, min/max step math conversions, percentage positions, and slider ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SliderProps } from './Slider.types'

// ---------- CLASSES

// ---------- CLASS: SLIDER CONTROLLER
export class SliderController {
  // ---------- FIELDS AND CONSTANTS
  private props: SliderProps

  // ---------- CONSTRUCTOR
  constructor(props: SliderProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET SLIDER MAIN CONTAINER CLASSES
  getSliderClasses() {
    const { size = 'md', disabled = false, range = false } = this.props

    return [
      'ui-slider',
      `ui-slider--${size}`,
      disabled ? 'ui-slider--disabled' : '',
      range ? 'ui-slider--range' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET TRACK CLASS NAME
  getTrackClasses() {
    return 'ui-slider__track'
  }

  // ---------- GET FILL BAR CLASS NAME
  getFillClasses() {
    return 'ui-slider__fill'
  }

  // ---------- GET THUMB HANDLE CLASS NAME WITH ACTIVE STATE
  getThumbClasses(isActive: boolean) {
    return ['ui-slider__thumb', isActive ? 'ui-slider__thumb--active' : ''].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY SLIDER ARIA ATTRIBUTES
  getAriaAttributes() {
    const { disabled, min, max, step } = this.props
    const value = this.getValue()

    return {
      role: 'slider',
      'aria-disabled': disabled,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-valuetext': value?.toString(),
      'aria-valuetep': step,
    }
  }

  // ---------- GET VALUE WITH DEFAULT FALLBACK
  getValue() {
    return this.props.value ?? this.props.defaultValue
  }

  // ---------- GET MINIMUM BOUND VALUE WITH FALLBACK
  getMin() {
    return this.props.min ?? 0
  }

  // ---------- GET MAXIMUM BOUND VALUE WITH FALLBACK
  getMax() {
    return this.props.max ?? 100
  }

  // ---------- GET INCREMENT STEP VALUE WITH FALLBACK
  getStep() {
    return this.props.step ?? 1
  }

  // ---------- CHECK RANGE SELECTION FLAG
  isRange() {
    return this.props.range
  }

  // ---------- CHECK DISABLED STATE
  isDisabled() {
    return this.props.disabled
  }

  // ---------- CONVERT NUMERIC VALUE TO PERCENTAGE
  getPercentage(value: number): number {
    const min = this.getMin()
    const max = this.getMax()
    const percentage = ((value - min) / (max - min)) * 100
    return Math.max(0, Math.min(100, percentage))
  }

  // ---------- CONVERT PERCENTAGE TO STEPPED NUMERIC VALUE
  getValueFromPercentage(percentage: number): number {
    const min = this.getMin()
    const max = this.getMax()
    const step = this.getStep()
    const rawValue = min + (percentage / 100) * (max - min)
    const steppedValue = Math.round(rawValue / step) * step
    return Math.max(min, Math.min(max, steppedValue))
  }
}
