/**
 * @file AlertDialog.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React AlertDialog confirmation modal component.
 *
 * @description
 * Renders modal confirmation dialog overlays with focus trapping, escape key listeners,
 * confirm/cancel button actions, and accessible live region attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useEffect, useRef, useCallback } from 'react'
import { AlertDialogController } from '@bleckwolf25/core'
import type { AlertDialogProps } from './AlertDialog.types'
import './AlertDialog.css'

// ---------- COMPONENTS

// ---------- REACT ALERT DIALOG COMPONENT
export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      open = false,
      onOpenChange,
      onClose,
      title,
      description,
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- DIALOG CLOSE EVENT HANDLER
    const handleClose = useCallback(() => {
      onOpenChange?.(false)
      onClose?.()
    }, [onOpenChange, onClose])

    // ---------- HEADLESS ALERT DIALOG CONTROLLER INITIALIZATION
    const controller = new AlertDialogController({
      open,
      onOpenChange: (isOpen) => {
        onOpenChange?.(isOpen)
        if (!isOpen) onClose?.()
      },
      title,
      description,
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel,
    })

    // ---------- DOM REFS
    const alertDialogRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // ---------- SIDE EFFECT: FOCUS MANAGEMENT
    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement
        alertDialogRef.current?.focus()
      } else {
        previousActiveElement.current?.focus()
      }
    }, [open])

    // ---------- SIDE EFFECT: KEYBOARD ESCAPE LISTENER
    useEffect(() => {
      // Early return guard clause for closed modal
      if (!open) return

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onCancel?.()
          handleClose()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [open, handleClose, onCancel])

    // ---------- OVERLAY CLICK EVENT HANDLER
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onCancel?.()
        handleClose()
      }
    }

    // ---------- CONFIRM BUTTON CLICK HANDLER
    const handleConfirm = () => {
      onConfirm?.()
      handleClose()
    }

    // ---------- CANCEL BUTTON CLICK HANDLER
    const handleCancel = () => {
      onCancel?.()
      handleClose()
    }

    // ---------- EARLY RETURN GUARD CLAUSE
    if (!open) {
      return null
    }

    return (
      <div className={controller.getOverlayClasses()} onClick={handleOverlayClick}>
        <div
          ref={(node) => {
            alertDialogRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          className={`${controller.getAlertDialogClasses()}${className ? ` ${className}` : ''}`}
          {...controller.getAriaAttributes()}
          {...props}
          tabIndex={-1}
        >
          <div className={controller.getHeaderClasses()}>
            <h2 id="alert-dialog-title" className={controller.getTitleClasses()}>
              {controller.getTitle()}
            </h2>
          </div>
          <div className={controller.getBodyClasses()}>
            <p id="alert-dialog-description" className={controller.getDescriptionClasses()}>
              {controller.getDescription()}
            </p>
          </div>
          <div className={controller.getFooterClasses()}>
            <button
              type="button"
              className={controller.getCancelButtonClasses()}
              onClick={handleCancel}
            >
              {controller.getCancelLabel()}
            </button>
            <button
              type="button"
              className={controller.getConfirmButtonClasses()}
              onClick={handleConfirm}
            >
              {controller.getConfirmLabel()}
            </button>
          </div>
        </div>
      </div>
    )
  }
)

AlertDialog.displayName = 'AlertDialog'
export type { AlertDialogProps }
