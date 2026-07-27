/**
 * @file Resizable.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Resizable panel component with drag handles.
 *
 * @description
 * Renders resizable containers with interactive drag handles (n, s, e, w, ne, nw, se, sw) and min/max width/height constraints.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState, useRef, useCallback, useMemo } from 'react'
import { ResizableController } from '@bleckwolf25/core'
import type { ResizeHandle } from '@bleckwolf25/core'
import type { ResizableProps } from './Resizable.types'
import './Resizable.css'

// ---------- COMPONENTS

// ---------- REACT RESIZABLE COMPONENT
export const Resizable = forwardRef<HTMLDivElement, ResizableProps>(
  (
    {
      children,
      width = 300,
      height = 200,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      handles = ['se'],
      onResize,
      onResizeStart,
      onResizeEnd,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS RESIZABLE CONTROLLER MEMOIZATION
    const controller = useMemo(
      () =>
        new ResizableController({
          children,
          width,
          height,
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
          handles,
          onResize,
          onResizeStart,
          onResizeEnd,
        }),
      [children, width, height, minWidth, maxWidth, minHeight, maxHeight, handles, onResize, onResizeStart, onResizeEnd],
    )

    // ---------- REACTIVE STATE AND REFS
    const [currentWidth, setCurrentWidth] = useState(width)
    const [currentHeight, setCurrentHeight] = useState(height)
    const [_isResizing, setIsResizing] = useState(false)
    const [_activeHandle, setActiveHandle] = useState<ResizeHandle | null>(null)
    const resizableRef = useRef<HTMLDivElement>(null)
    const startPos = useRef({ x: 0, y: 0 })
    const startSize = useRef({ width: 0, height: 0 })

    // ---------- MOUSE DOWN RESIZE INITIATION HANDLER
    const handleMouseDown = useCallback(
      (handle: ResizeHandle, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        setIsResizing(true)
        setActiveHandle(handle)
        startPos.current = { x: e.clientX, y: e.clientY }
        startSize.current = { width: currentWidth, height: currentHeight }

        onResizeStart?.()

        // ---------- MOUSE MOVE DRAG HANDLER
        const handleMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - startPos.current.x
          const deltaY = moveEvent.clientY - startPos.current.y

          let newWidth = startSize.current.width
          let newHeight = startSize.current.height

          if (handle.includes('e')) newWidth += deltaX
          if (handle.includes('w')) newWidth -= deltaX
          if (handle.includes('s')) newHeight += deltaY
          if (handle.includes('n')) newHeight -= deltaY

          newWidth = controller.constrainWidth(newWidth)
          newHeight = controller.constrainHeight(newHeight)

          setCurrentWidth(newWidth)
          setCurrentHeight(newHeight)

          onResize?.({ width: newWidth, height: newHeight })
        }

        // ---------- MOUSE UP DRAG END HANDLER
        const handleMouseUp = () => {
          setIsResizing(false)
          setActiveHandle(null)
          onResizeEnd?.()

          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      },
      [controller, currentWidth, currentHeight, onResize, onResizeStart, onResizeEnd],
    )

    return (
      <div
        ref={(node) => {
          resizableRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={`${controller.getResizableClasses()}${className ? ` ${className}` : ''}`}
        style={{
          width: currentWidth,
          height: currentHeight,
          position: 'relative',
        }}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {children}
        {controller.getHandles().map((handle) => (
          <div
            key={handle}
            className={controller.getHandleClasses(handle)}
            onMouseDown={(e) => {
              handleMouseDown(handle, e)
            }}
            style={{ cursor: `${handle}-resize` }}
          />
        ))}
      </div>
    )
  }
)

Resizable.displayName = 'Resizable'
export type { ResizableProps }
