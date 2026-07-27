/**
 * @file Badge.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Badge component.
 *
 * @description
 * Defines BadgeColor union type and BadgeProps interface extending HTMLAttributes<HTMLSpanElement>.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { HTMLAttributes, ReactNode } from 'react'
import type { BadgePosition } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- BADGE COLOR UNION TYPE
export type BadgeColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'error' | 'info' | (string & {})

// ---------- REACT BADGE PROPS INTERFACE
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  variant?: BadgeColor
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  position?: BadgePosition
  children?: ReactNode
}
