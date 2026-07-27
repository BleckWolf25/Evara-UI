/**
 * @file ContextMenu.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React ContextMenu UI component.
 *
 * @description
 * Renders fixed-position popup context menus at mouse pointer (x, y) coordinates with click-outside detection,
 * escape key closing listeners, and disabled/divider item styling.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useEffect, useRef, useCallback } from 'react'
import { ContextMenuController } from '@bleckwolf25/core'
import type { ContextMenuProps } from './ContextMenu.types'
import './ContextMenu.css'

// ---------- COMPONENTS

// ---------- REACT CONTEXT MENU COMPONENT
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      items,
      open = false,
      onOpenChange,
      onClose,
      x = 0,
      y = 0,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- MENU CLOSE HANDLER
    const handleClose = useCallback(() => {
      onOpenChange?.(false)
      onClose?.()
    }, [onOpenChange, onClose])

    // ---------- HEADLESS CONTEXT MENU CONTROLLER INITIALIZATION
    const controller = new ContextMenuController({
      items,
      open,
      onOpenChange: (isOpen) => {
        onOpenChange?.(isOpen)
        if (!isOpen) onClose?.()
      },
      x,
      y,
    })

    const contextMenuRef = useRef<HTMLDivElement>(null)

    // ---------- SIDE EFFECT: CLICK OUTSIDE AND ESCAPE LISTENERS
    useEffect(() => {
      // Early return guard clause for closed menu
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target as Node)
        ) {
          handleClose()
        }
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, handleClose])

    // ---------- ITEM CLICK HANDLER
    const handleItemClick = (item: ContextMenuProps['items'][0]) => {
      // Guard clause for disabled menu items
      if (item.disabled) return

      item.onClick?.()
      handleClose()
    }

    // ---------- EARLY RETURN GUARD CLAUSE
    if (!open) {
      return null
    }

    const position = controller.getPosition()

    return (
      <div
        ref={(node) => {
          contextMenuRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={`${controller.getContextMenuClasses()}${className ? ` ${className}` : ''}`}
        style={{
          position: 'fixed',
          left: `${position.x.toString()}px`,
          top: `${position.y.toString()}px`,
        }}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {controller.getItems().map((item, index) => (
          <div
            key={index}
            className={controller.getItemClasses(item.disabled ?? false, item.divider ?? false)}
            onClick={() => {
              handleItemClick(item)
            }}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
)

ContextMenu.displayName = 'ContextMenu'
export type { ContextMenuProps }
