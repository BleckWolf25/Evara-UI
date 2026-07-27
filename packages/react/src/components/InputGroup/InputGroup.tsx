/**
 * @file InputGroup.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React InputGroup UI component.
 *
 * @description
 * Groups form input fields with action buttons, dropdowns, or addon badges with synchronized sizing and border-radius joining.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { InputGroupController } from '@bleckwolf25/core'
import type { InputGroupProps } from './InputGroup.types'
import './InputGroup.css'

// ---------- COMPONENTS

// ---------- REACT INPUT GROUP COMPONENT
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      size = 'md',
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS INPUT GROUP CONTROLLER INITIALIZATION
    const controller = new InputGroupController({
      size,
      disabled,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getContainerClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {children}
      </div>
    )
  }
)

InputGroup.displayName = 'InputGroup'
export type { InputGroupProps }
