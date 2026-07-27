/**
 * @file Card.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the React Card component.
 *
 * @description
 * Extends core CardProps interface with ReactNode children properties for React application cards.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CardProps as CoreCardProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- REACT CARD PROPS TYPE
export type CardProps = CoreCardProps & {
  children: React.ReactNode
}
