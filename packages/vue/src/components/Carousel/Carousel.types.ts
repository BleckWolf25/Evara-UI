/**
 * @file Carousel.types.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary TypeScript types and interfaces for the Vue Carousel component.
 *
 * @description
 * Re-exports core CarouselProps interface for Vue application slide controls.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CarouselProps as CoreCarouselProps } from '@bleckwolf25/core'

// ---------- TYPES AND INTERFACES

// ---------- VUE CAROUSEL PROPS INTERFACE
export interface CarouselProps extends CoreCarouselProps {}
