/**
 * @file Separator.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Separator divider line UI component.
 *
 * @description
 * Renders visual section dividers with support for horizontal and vertical orientations, color themes, and ARIA separator roles.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { SeparatorController } from '@evara-ui/core'
import type { SeparatorProps } from './Separator.types'
import './Separator.css'

// ---------- COMPONENTS

// ---------- REACT SEPARATOR COMPONENT
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      color = 'default',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS SEPARATOR CONTROLLER INITIALIZATION
    const controller = new SeparatorController({
      orientation,
      color,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getSeparatorClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'
export type { SeparatorProps }
