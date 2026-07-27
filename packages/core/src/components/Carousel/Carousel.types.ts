/**
 * @file Carousel.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Carousel component controller.
 *
 * @description
 * Defines CarouselProps configuration interface including autoplay, interval, infinite looping, and indicator flags.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { BaseProps } from '../../types'

// ---------- TYPES AND INTERFACES

// ---------- CAROUSEL PROPS INTERFACE
export interface CarouselProps extends BaseProps {
  children?: unknown
  autoplay?: boolean | undefined
  interval?: number | undefined
  infinite?: boolean | undefined
  showArrows?: boolean | undefined
  showDots?: boolean | undefined
}
