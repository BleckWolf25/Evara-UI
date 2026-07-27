/**
 * @file FieldGroup.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React FieldGroup UI container component.
 *
 * @description
 * Groups related form fields together with shared disabled and required field group context.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { FieldGroupController } from '@bleckwolf25/core'
import type { FieldGroupProps } from './FieldGroup.types'
import './FieldGroup.css'

// ---------- COMPONENTS

// ---------- REACT FIELD GROUP COMPONENT
export const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>(
  (
    {
      disabled = false,
      required = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS FIELD GROUP CONTROLLER INITIALIZATION
    const controller = new FieldGroupController({
      disabled,
      required,
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

FieldGroup.displayName = 'FieldGroup'
export type { FieldGroupProps }
