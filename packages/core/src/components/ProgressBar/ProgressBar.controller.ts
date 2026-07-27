/**
 * @file ProgressBar.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for ProgressBar progress indicator component.
 *
 * @description
 * Computes class names, fill bar width styles, indeterminate progress animation flags, and progressbar ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ProgressBarProps } from './ProgressBar.types'

// ---------- CLASSES

// ---------- CLASS: PROGRESS BAR CONTROLLER
export class ProgressBarController {
  // ---------- FIELDS AND CONSTANTS
  private props: ProgressBarProps

  // ---------- CONSTRUCTOR
  constructor(props: ProgressBarProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET PROGRESS BAR MAIN CONTAINER CLASSES
  getProgressBarClasses() {
    const { size = 'md', color = 'default', indeterminate = false } = this.props

    return [
      'ui-progress-bar',
      `ui-progress-bar--${size}`,
      `ui-progress-bar--${color}`,
      indeterminate ? 'ui-progress-bar--indeterminate' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET FILL BAR SUB-ELEMENT CLASS NAME
  getFillClasses() {
    return 'ui-progress-bar__fill'
  }

  // ---------- BUILD ACCESSIBILITY PROGRESSBAR ARIA ATTRIBUTES
  getAriaAttributes() {
    const { value = 0, indeterminate = false } = this.props

    return {
      role: 'progressbar',
      'aria-valuenow': indeterminate ? undefined : value,
      'aria-valuemin': indeterminate ? undefined : 0,
      'aria-valuemax': indeterminate ? undefined : 100,
      'aria-valuetext': indeterminate ? 'Loading...' : `${value.toString()}%`,
    }
  }

  // ---------- COMPUTE INLINE FILL BAR WIDTH STYLE OBJECT
  getFillStyle() {
    const { value = 0, indeterminate = false } = this.props

    // Early return guard clause for indeterminate progress
    if (indeterminate) {
      return undefined
    }

    return {
      width: `${Math.min(100, Math.max(0, value)).toString()}%`,
    }
  }

  // ---------- CHECK INDETERMINATE STATE FLAG
  isIndeterminate() {
    return this.props.indeterminate
  }

  // ---------- GET CURRENT VALUE
  getValue() {
    return this.props.value
  }
}
