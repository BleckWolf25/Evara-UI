/**
 * @file Dialog.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Dialog modal component with Radix primitives compatibility.
 *
 * @description
 * Renders modal dialog windows supporting shorthand props and compound primitives (Root, Trigger, Overlay, Content, Header, Body, Footer, Title, Description, Close).
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useEffect, useRef, useMemo, createContext, useContext, useState, useCallback } from 'react'
import { DialogController } from '@evara-ui/core'
import type { DialogProps } from './Dialog.types'
import './Dialog.css'

// ---------- TYPES AND CONTEXT

// ---------- DIALOG CONTEXT STATE INTERFACE
interface DialogContextState {
  open: boolean
  setOpen: (open: boolean) => void
  close: () => void
}

// ---------- DIALOG REACT CONTEXT
const DialogContext = createContext<DialogContextState>({
  open: false,
  setOpen: () => { /* noop */ },
  close: () => { /* noop */ },
})

// ---------- COMPOUND PRIMITIVE: DIALOG ROOT
const DialogRoot = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open, setOpen, close: () => { setOpen(false); } }}>
      {children}
    </DialogContext.Provider>
  )
}

// ---------- COMPOUND PRIMITIVE: DIALOG TRIGGER
const DialogTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, children, ...props }, ref) => {
    const { setOpen } = useContext(DialogContext)
    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) {
            setOpen(true)
          }
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DialogTrigger.displayName = 'Dialog.Trigger'

// ---------- COMPOUND PRIMITIVE: DIALOG OVERLAY
const DialogOverlay = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { open, close } = useContext(DialogContext)
    // Guard clause for closed overlay
    if (!open) return null

    return (
      <div
        ref={ref}
        data-state="open"
        className={`ui-dialog__overlay${className ? ` ${className}` : ''}`}
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) {
            close()
          }
        }}
        {...props}
      />
    )
  }
)
DialogOverlay.displayName = 'Dialog.Overlay'

// ---------- COMPONENTS

// ---------- MAIN DIALOG CONTENT COMPONENT
const DialogComponent = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = false,
      onOpenChange,
      onClose,
      closeOnEscape = true,
      closeOnOverlayClick = true,
      trapFocus = true,
      children,
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

    // ---------- HEADLESS DIALOG CONTROLLER INITIALIZATION
    const controller = useMemo(
      () =>
        new DialogController({
          open,
          onOpenChange: (isOpen) => {
            onOpenChange?.(isOpen)
            if (!isOpen) onClose?.()
          },
          closeOnEscape,
          closeOnOverlayClick,
          trapFocus,
        }),
      [open, onOpenChange, onClose, closeOnEscape, closeOnOverlayClick, trapFocus],
    )

    // ---------- REFS
    const dialogRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // ---------- SIDE EFFECT: FOCUS RESTORATION
    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement
        dialogRef.current?.focus()
      } else {
        previousActiveElement.current?.focus()
      }
    }, [open])

    // ---------- SIDE EFFECT: KEYBOARD FOCUS TRAPPING AND ESCAPE LISTENERS
    useEffect(() => {
      // Early return guard clause for closed modal or disabled focus trapping
      if (!open || !trapFocus) return

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && controller.shouldCloseOnEscape()) {
          handleClose()
        }

        if (event.key === 'Tab') {
          const container = dialogRef.current
          // Early return guard clause if dialog ref missing
          if (!container) return

          const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          )

          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

            if (event.shiftKey) {
              if (document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
              }
            } else {
              if (document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
              }
            }
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [open, trapFocus, controller, handleClose])

    // ---------- OVERLAY CLICK HANDLER
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget && controller.shouldCloseOnOverlayClick()) {
        handleClose()
      }
    }

    // ---------- EARLY RETURN GUARD CLAUSE
    if (!open) {
      return null
    }

    return (
      <DialogContext.Provider
        value={{
          open,
          setOpen: (val) => {
            if (!val) handleClose()
          },
          close: handleClose,
        }}
      >
        <div className={controller.getOverlayClasses()} onClick={handleOverlayClick} {...controller.getDataAttributes()}>
          <div
            ref={(node) => {
              dialogRef.current = node
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
            }}
            className={`${controller.getDialogClasses()}${className ? ` ${className}` : ''}`}
            {...controller.getAriaAttributes()}
            {...controller.getDataAttributes()}
            {...props}
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </DialogContext.Provider>
    )
  }
)

DialogComponent.displayName = 'Dialog'

// ---------- COMPOUND SUB-COMPONENTS
const DialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-dialog__header${className ? ` ${className}` : ''}`} {...props} />
  )
)
DialogHeader.displayName = 'Dialog.Header'

const DialogBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-dialog__body${className ? ` ${className}` : ''}`} {...props} />
  )
)
DialogBody.displayName = 'Dialog.Body'

const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-dialog__footer${className ? ` ${className}` : ''}`} {...props} />
  )
)
DialogFooter.displayName = 'Dialog.Footer'

const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={`ui-dialog__title${className ? ` ${className}` : ''}`} {...props} />
  )
)
DialogTitle.displayName = 'Dialog.Title'

const DialogDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={`ui-dialog__description${className ? ` ${className}` : ''}`} {...props} />
  )
)
DialogDescription.displayName = 'Dialog.Description'

const DialogClose = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, ...props }, ref) => {
    const context = useContext(DialogContext)
    return (
      <button
        ref={ref}
        type="button"
        className={`ui-dialog__close-button${className ? ` ${className}` : ''}`}
        aria-label="Close"
        onClick={(e) => {
          onClick?.(e)
          if (!e.defaultPrevented) {
            context.close()
          }
        }}
        {...props}
      >
        ✕
      </button>
    )
  }
)
DialogClose.displayName = 'Dialog.Close'

// ---------- COMPOUND COMPONENT ASSIGNMENT
const Dialog = Object.assign(DialogComponent, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogComponent,
  Overlay: DialogOverlay,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
})

export { Dialog }
export type { DialogProps }
