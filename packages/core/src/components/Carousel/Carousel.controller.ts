/**
 * @file Carousel.controller.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Headless controller for Carousel image and content slider component.
 *
 * @description
 * Computes class names for carousel tracks, slides, arrows, pagination indicators, autoplay intervals, and ARIA attributes.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import type { CarouselProps } from './Carousel.types'

// ---------- CLASSES

// ---------- CLASS: CAROUSEL CONTROLLER
export class CarouselController {
  // ---------- FIELDS AND CONSTANTS
  private props: CarouselProps

  // ---------- CONSTRUCTOR
  constructor(props: CarouselProps) {
    this.props = props
  }

  // ---------- METHODS

  // ---------- GET CAROUSEL CONTAINER CLASS NAME
  getCarouselClasses() {
    return 'ui-carousel'
  }

  // ---------- GET TRACK CLASS NAME
  getTrackClasses() {
    return 'ui-carousel__track'
  }

  // ---------- GET SLIDE CLASS NAME
  getSlideClasses() {
    return 'ui-carousel__slide'
  }

  // ---------- GET ARROW BUTTON CLASS NAME
  getArrowClasses() {
    return 'ui-carousel__arrow'
  }

  // ---------- GET PREVIOUS ARROW CLASS NAME
  getArrowPrevClasses() {
    return 'ui-carousel__arrow--prev'
  }

  // ---------- GET NEXT ARROW CLASS NAME
  getArrowNextClasses() {
    return 'ui-carousel__arrow--next'
  }

  // ---------- GET DOTS CONTAINER CLASS NAME
  getDotsClasses() {
    return 'ui-carousel__dots'
  }

  // ---------- GET INDIVIDUAL DOT CLASS NAME WITH ACTIVE STATE
  getDotClasses(isActive: boolean) {
    return ['ui-carousel__dot', isActive ? 'ui-carousel__dot--active' : ''].filter(Boolean).join(' ')
  }

  // ---------- BUILD ACCESSIBILITY ARIA ATTRIBUTES
  getAriaAttributes() {
    return {
      role: 'region',
      'aria-label': 'Carousel',
    }
  }

  // ---------- CHECK AUTOPLAY STATE
  isAutoplay() {
    return this.props.autoplay
  }

  // ---------- GET AUTOPLAY INTERVAL WITH FALLBACK
  getInterval() {
    return this.props.interval ?? 5000
  }

  // ---------- CHECK INFINITE LOOPING STATE
  isInfinite() {
    return this.props.infinite
  }

  // ---------- CHECK ARROWS VISIBILITY
  showArrows() {
    return this.props.showArrows !== false
  }

  // ---------- CHECK DOTS VISIBILITY
  showDots() {
    return this.props.showDots !== false
  }
}
