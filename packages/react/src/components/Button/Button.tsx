/**
 * @file Button.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Button UI component with polymorphic element support.
 *
 * @description
 * Renders flexible, accessible button controls supporting visual style variants, sizes, full-width layouts,
 * loading spinner states, disabled flags, and polymorphic element rendering.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { ButtonController } from '@evara-ui/core'
import type { ButtonProps } from './Button.types'
import './Button.css'

// ---------- COMPONENTS

// ---------- REACT BUTTON COMPONENT
export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as: Component = 'button',
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      className,
      children,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS BUTTON CONTROLLER INITIALIZATION
    const controller = new ButtonController({
      variant,
      size,
      disabled,
      loading,
      fullWidth,
    })

    // ---------- CLICK EVENT HANDLER
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Guard clause for disabled or loading states
      if (disabled || loading) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    }

    // ---------- NATIVE ELEMENT TYPE COMPUTATION
    const isNativeButton = Component === 'button'

    return (
      <Component
        ref={ref}
        type={isNativeButton ? type : undefined}
        className={`${controller.getClassNames()}${className ? ` ${className}` : ''}`}
        disabled={isNativeButton ? disabled || loading : undefined}
        data-disabled={disabled || loading ? 'true' : undefined}
        {...controller.getAriaAttributes()}
        onClick={handleClick}
        {...props}
      >
        {loading && <span className="ui-button__spinner" aria-hidden="true" />}
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'
export type { ButtonProps }
