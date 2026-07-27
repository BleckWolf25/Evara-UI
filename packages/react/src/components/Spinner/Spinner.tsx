/**
 * @file Spinner.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Spinner loading activity indicator UI component.
 *
 * @description
 * Renders animated spinning loader indicators with customizable sizes, color themes, and ARIA status roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { SpinnerController } from '@evara-ui/core'
import type { SpinnerProps } from './Spinner.types'
import './Spinner.css'

// ---------- COMPONENTS

// ---------- REACT SPINNER COMPONENT
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'default',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS SPINNER CONTROLLER INITIALIZATION
    const controller = new SpinnerController({
      size,
      color,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getSpinnerClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      />
    )
  }
)

Spinner.displayName = 'Spinner'
export type { SpinnerProps }
