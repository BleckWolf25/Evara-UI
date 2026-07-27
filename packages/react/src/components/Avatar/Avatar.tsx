/**
 * @file Avatar.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Avatar UI component.
 *
 * @description
 * Renders user profile picture avatars with fallback text initials, size variants, and online status badges.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { AvatarController } from '@evara-ui/core'
import type { AvatarProps } from './Avatar.types'
import './Avatar.css'

// ---------- COMPONENTS

// ---------- REACT AVATAR COMPONENT
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      size = 'md',
      status,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS AVATAR CONTROLLER INITIALIZATION
    const controller = new AvatarController({
      src,
      alt,
      initials,
      size,
      status,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getAvatarClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {controller.hasImage() && (
          <img
            src={src}
            alt={alt}
            className={controller.getImageClasses()}
          />
        )}
        {!controller.hasImage() && controller.hasInitials() && (
          <span className={controller.getInitialsClasses()}>
            {initials}
          </span>
        )}
        {controller.hasStatus() && (
          <span
            className={controller.getStatusIndicatorClasses()}
            title={status}
            aria-label={`Status: ${status ?? ''}`}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
export type { AvatarProps }
