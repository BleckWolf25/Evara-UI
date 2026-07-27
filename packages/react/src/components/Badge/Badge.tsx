/**
 * @file Badge.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Badge UI component.
 *
 * @description
 * Renders status badges with support for color tokens, size variants, relative container placement, and ARIA status roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { BadgeController, type Color } from '@bleckwolf25/core'
import type { BadgeProps } from './Badge.types'
import './Badge.css'

// ---------- COMPONENTS

// ---------- REACT BADGE COMPONENT
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color,
      variant,
      size = 'sm',
      position,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- ACTIVE COLOR COMPUTATION
    const activeColor = color ?? variant ?? 'default'

    // ---------- HEADLESS BADGE CONTROLLER INITIALIZATION
    const controller = new BadgeController({
      color: activeColor as Color,
      size,
      position,
    })

    return (
      <span
        ref={ref}
        className={`${controller.getBadgeClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
export type { BadgeProps }
