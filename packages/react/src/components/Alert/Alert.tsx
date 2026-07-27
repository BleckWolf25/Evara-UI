/**
 * @file Alert.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Alert UI component.
 *
 * @description
 * Renders flexible alert banners with status icons, dismiss buttons, accessible live regions, and custom children content.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState } from 'react'
import { AlertController } from '@bleckwolf25/core'
import type { AlertProps } from './Alert.types'
import './Alert.css'

// ---------- COMPONENTS

// ---------- REACT ALERT COMPONENT
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      dismissible = false,
      showIcon = false,
      onDismiss,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- VISIBILITY STATE INITIALIZATION
    const [isVisible, setIsVisible] = useState(true)

    // ---------- HEADLESS ALERT CONTROLLER INITIALIZATION
    const controller = new AlertController({
      variant,
      dismissible,
      showIcon,
    })

    // ---------- DISMISS CLICK EVENT HANDLER
    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    // ---------- EARLY RETURN GUARD CLAUSE
    if (!isVisible) {
      return null
    }

    // ---------- VARIANT ICON MAPPER HELPER
    const getIconForVariant = (alertVariant: string) => {
      const icons: Record<string, string> = {
        info: 'ℹ️',
        success: '✓',
        warning: '⚠',
        danger: '✕',
      }
      return icons[alertVariant] || icons['info']
    }

    return (
      <div
        ref={ref}
        className={`${controller.getAlertClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {controller.shouldShowIcon() && (
          <span className={controller.getIconClasses()}>
            {getIconForVariant(variant)}
          </span>
        )}
        <div className={controller.getContentClasses()}>
          {children}
        </div>
        {controller.isDismissible() && (
          <button
            type="button"
            className={controller.getCloseButtonClasses()}
            onClick={handleDismiss}
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'
export type { AlertProps }
