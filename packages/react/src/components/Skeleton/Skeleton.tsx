/**
 * @file Skeleton.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Skeleton loading placeholder UI component.
 *
 * @description
 * Renders loading content placeholder blocks with pulse animations and configurable shapes (text, circle, rectangle, square).
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { SkeletonController } from '@evara-ui/core'
import type { SkeletonProps } from './Skeleton.types'
import './Skeleton.css'

// ---------- COMPONENTS

// ---------- REACT SKELETON COMPONENT
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      shape = 'text',
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS SKELETON CONTROLLER INITIALIZATION
    const controller = new SkeletonController({
      shape,
      animated,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getSkeletonClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
export type { SkeletonProps }
