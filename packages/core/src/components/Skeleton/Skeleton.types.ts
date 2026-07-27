/**
 * @file Skeleton.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Skeleton component controller.
 *
 * @description
 * Defines SkeletonShape union type and SkeletonProps configuration interface for placeholder elements.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- SKELETON SHAPE UNION TYPE
export type SkeletonShape = 'text' | 'circle' | 'rectangle' | 'square'

// ---------- SKELETON PROPS INTERFACE
export interface SkeletonProps extends BaseProps {
  shape?: SkeletonShape | undefined
  animated?: boolean | undefined
}
