/**
 * @file ButtonGroup.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React ButtonGroup UI component.
 *
 * @description
 * Groups multiple child buttons with unified orientation layouts, size synchronization, and ARIA group accessibility attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { ButtonGroupController } from '@bleckwolf25/core'
import type { ButtonGroupProps } from './ButtonGroup.types'
import './ButtonGroup.css'

// ---------- COMPONENTS

// ---------- REACT BUTTON GROUP COMPONENT
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = 'horizontal',
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS BUTTON GROUP CONTROLLER INITIALIZATION
    const controller = new ButtonGroupController({
      orientation,
      size,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getButtonGroupClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'
export type { ButtonGroupProps }
