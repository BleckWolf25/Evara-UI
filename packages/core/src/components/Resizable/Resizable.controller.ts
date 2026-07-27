/**
 * @file Resizable.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Resizable panel layout component.
 *
 * @description
 * Computes class names for resizable panels, handles, dimension constraints (min/max width and height), and region ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ResizableProps, ResizeHandle } from './Resizable.types'

// ---------- CLASSES

// ---------- CLASS: RESIZABLE CONTROLLER
export class ResizableController {
  // ---------- FIELDS AND CONSTANTS
  private props: ResizableProps

  // ---------- CONSTRUCTOR
  constructor(props: ResizableProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET RESIZABLE MAIN CONTAINER CLASS NAME
  getResizableClasses() {
    return 'ui-resizable'
  }

  // ---------- GET RESIZE HANDLE CLASS NAME WITH DIRECTION
  getHandleClasses(handle: ResizeHandle) {
    return ['ui-resizable__handle', `ui-resizable__handle--${handle}`].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'region',
      'aria-label': 'Resizable',
    }
  }

  // ---------- GET INITIAL WIDTH
  getWidth() {
    return this.props.width
  }

  // ---------- GET INITIAL HEIGHT
  getHeight() {
    return this.props.height
  }

  // ---------- GET MINIMUM WIDTH BOUND
  getMinWidth() {
    return this.props.minWidth
  }

  // ---------- GET MAXIMUM WIDTH BOUND
  getMaxWidth() {
    return this.props.maxWidth
  }

  // ---------- GET MINIMUM HEIGHT BOUND
  getMinHeight() {
    return this.props.minHeight
  }

  // ---------- GET MAXIMUM HEIGHT BOUND
  getMaxHeight() {
    return this.props.maxHeight
  }

  // ---------- GET RESIZE HANDLES ARRAY WITH DEFAULT FALLBACK
  getHandles() {
    return this.props.handles ?? ['se']
  }

  // ---------- CONSTRAIN WIDTH VALUE WITHIN MIN/MAX BOUNDS
  constrainWidth(width: number): number {
    const minWidth = this.getMinWidth()
    const maxWidth = this.getMaxWidth()

    // Minimum width boundary check
    if (minWidth !== undefined && width < minWidth) {
      return minWidth
    }

    // Maximum width boundary check
    if (maxWidth !== undefined && width > maxWidth) {
      return maxWidth
    }

    return width
  }

  // ---------- CONSTRAIN HEIGHT VALUE WITHIN MIN/MAX BOUNDS
  constrainHeight(height: number): number {
    const minHeight = this.getMinHeight()
    const maxHeight = this.getMaxHeight()

    // Minimum height boundary check
    if (minHeight !== undefined && height < minHeight) {
      return minHeight
    }

    // Maximum height boundary check
    if (maxHeight !== undefined && height > maxHeight) {
      return maxHeight
    }

    return height
  }
}
