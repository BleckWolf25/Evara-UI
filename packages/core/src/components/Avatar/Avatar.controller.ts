/**
 * @file Avatar.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Avatar user profile picture components.
 *
 * @description
 * Computes CSS class names, status indicator styling, initials fallback flags, and ARIA labels for user avatars.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { AvatarProps } from './Avatar.types'

// ---------- CLASSES

// ---------- CLASS: AVATAR CONTROLLER
export class AvatarController {
  // ---------- FIELDS AND CONSTANTS
  private props: AvatarProps

  // ---------- CONSTRUCTOR
  constructor(props: AvatarProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET AVATAR MAIN CONTAINER CLASSES
  getAvatarClasses() {
    const { size = 'md', status } = this.props

    return ['ui-avatar', `ui-avatar--${size}`, status ? `ui-avatar--status-${status}` : '']
      .filter(Boolean)
      .join(' ')
  }

  // ---------- GET IMAGE SUB-ELEMENT CLASS NAME
  getImageClasses() {
    return 'ui-avatar__image'
  }

  // ---------- GET INITIALS FALLBACK CLASS NAME
  getInitialsClasses() {
    return 'ui-avatar__initials'
  }

  // ---------- GET STATUS BADGE INDICATOR CLASS NAME
  getStatusIndicatorClasses() {
    return 'ui-avatar__status-indicator'
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    const { alt, status } = this.props

    return {
      'aria-label': alt ?? 'Avatar',
      'aria-hidden': status ? undefined : undefined,
    }
  }

  // ---------- CHECK IMAGE SOURCE PRESENCE
  hasImage() {
    return !!this.props.src
  }

  // ---------- CHECK INITIALS PRESENCE
  hasInitials() {
    return !!this.props.initials
  }

  // ---------- CHECK STATUS PRESENCE
  hasStatus() {
    return !!this.props.status
  }

  // ---------- GET CURRENT STATUS
  getStatus() {
    return this.props.status
  }
}
