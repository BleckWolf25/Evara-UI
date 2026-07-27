/**
 * @file Skeleton.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Skeleton content loading placeholder component.
 *
 * @description
 * Computes class names, shapes (text, circle, rectangle, square), pulse animations, and status loading ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { SkeletonProps } from './Skeleton.types'

// ---------- CLASSES

// ---------- CLASS: SKELETON CONTROLLER
export class SkeletonController {
  // ---------- FIELDS AND CONSTANTS
  private props: SkeletonProps

  // ---------- CONSTRUCTOR
  constructor(props: SkeletonProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET SKELETON MAIN CONTAINER CLASSES
  getSkeletonClasses() {
    const { shape = 'text', animated = true } = this.props

    return ['ui-skeleton', `ui-skeleton--${shape}`, animated ? 'ui-skeleton--animated' : ''].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY STATUS ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'status',
      'aria-label': 'Loading...',
    }
  }

  // ---------- GET SKELETON SHAPE
  getShape() {
    return this.props.shape
  }

  // ---------- CHECK ANIMATION STATE FLAG
  isAnimated() {
    return this.props.animated
  }
}
