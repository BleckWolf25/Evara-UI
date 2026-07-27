/**
 * @file Popover.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Popover overlay UI component.
 *
 * @description
 * Renders floating overlay panels with customizable trigger elements, placement positioning options, and click-outside dismissal handlers.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useEffect, useRef, useState } from 'react'
import { PopoverController } from '@bleckwolf25/core'
import type { PopoverProps } from './Popover.types'
import './Popover.css'

// ---------- COMPONENTS

// ---------- MAIN POPOVER COMPONENT
const PopoverComponent = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open = false,
      onOpenChange,
      onClose,
      position = 'bottom',
      closeOnClickOutside = true,
      children,
      trigger,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS POPOVER CONTROLLER INITIALIZATION
    const controller = new PopoverController({
      open,
      onOpenChange: (isOpen) => {
        onOpenChange?.(isOpen)
        if (!isOpen) onClose?.()
      },
      position,
      closeOnClickOutside,
    })

    // ---------- REFS AND INTERNAL STATE
    const popoverRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLElement>(null)
    const [internalOpen, setInternalOpen] = useState(open)

    // ---------- SIDE EFFECT: SYNC CONTROLLED OPEN PROP
    useEffect(() => {
      setInternalOpen(open)
    }, [open])

    // ---------- TRIGGER CLICK HANDLER
    const handleTriggerClick = () => {
      const newState = !internalOpen
      setInternalOpen(newState)
      onOpenChange?.(newState)
      if (!newState) onClose?.()
    }

    // ---------- SIDE EFFECT: CLICK OUTSIDE DISMISSAL LISTENER
    useEffect(() => {
      // Early return guard clause for closed popover or disabled click-outside
      if (!internalOpen || !closeOnClickOutside) return

      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setInternalOpen(false)
          onOpenChange?.(false)
          onClose?.()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [internalOpen, closeOnClickOutside, onOpenChange, onClose])

    // ---------- TRIGGER MARKUP COMPUTATION
    const triggerElement = trigger ? (
      <span ref={triggerRef} onClick={handleTriggerClick}>
        {trigger}
      </span>
    ) : null

    return (
      <>
        {triggerElement}
        {internalOpen && (
          <div
            ref={(node) => {
              popoverRef.current = node
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
            }}
            className={`${controller.getPopoverClasses()}${className ? ` ${className}` : ''}`}
            {...controller.getAriaAttributes()}
            {...props}
          >
            {children}
          </div>
        )}
      </>
    )
  }
)

PopoverComponent.displayName = 'Popover'

// ---------- COMPOUND POPOVER CONTENT SUB-COMPONENT
const PopoverContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-popover__content${className ? ` ${className}` : ''}`} {...props} />
  ),
)
PopoverContent.displayName = 'Popover.Content'

// ---------- COMPOUND COMPONENT ASSIGNMENT
const Popover = Object.assign(PopoverComponent, {
  Content: PopoverContent,
})

export { Popover }
export type { PopoverProps }
