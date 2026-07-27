/**
 * @file ProgressBar.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React ProgressBar progress indicator UI component.
 *
 * @description
 * Renders progress bars with support for percentage progress widths, infinite indeterminate loading animations, color themes, and ARIA progressbar roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { ProgressBarController } from '@evara-ui/core'
import type { ProgressBarProps } from './ProgressBar.types'
import './ProgressBar.css'

// ---------- COMPONENTS

// ---------- REACT PROGRESS BAR COMPONENT
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      indeterminate = false,
      size = 'md',
      color = 'default',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS PROGRESS BAR CONTROLLER INITIALIZATION
    const controller = new ProgressBarController({
      value,
      indeterminate,
      size,
      color,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getProgressBarClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        <div
          className={controller.getFillClasses()}
          style={controller.getFillStyle()}
        />
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
export type { ProgressBarProps }
