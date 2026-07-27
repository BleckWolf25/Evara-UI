/**
 * @file Avatar.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Avatar component.
 *
 * @description
 * Defines AvatarStatus union type and AvatarProps configuration interface for user avatars.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps, Size } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- AVATAR ONLINE STATUS UNION TYPE
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

// ---------- AVATAR PROPS INTERFACE
export interface AvatarProps extends BaseProps {
  src?: string | undefined
  alt?: string | undefined
  initials?: string | undefined
  size?: Size | undefined
  status?: AvatarStatus | undefined
}
