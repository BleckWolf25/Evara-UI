/**
 * @file Button.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Button component.
 *
 * @description
 * Extends core ButtonProps with React HTMLButtonElement attributes, polymorphic 'as' element type prop, and ReactNode children.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { ButtonHTMLAttributes, ReactNode, ElementType } from 'react'
import type { ButtonProps as CoreButtonProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT BUTTON PROPS INTERFACE
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    CoreButtonProps {
  as?: ElementType
  children?: ReactNode
}
