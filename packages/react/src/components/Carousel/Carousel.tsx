/**
 * @file Carousel.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Carousel UI component.
 *
 * @description
 * Renders touch-enabled slider carousels supporting autoplay intervals, infinite looping, prev/next arrows, and pagination dots.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { CarouselController } from '@evara-ui/core'
import type { CarouselProps } from './Carousel.types'
import './Carousel.css'

// ---------- COMPONENTS

// ---------- REACT CAROUSEL COMPONENT
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      autoplay = false,
      interval = 5000,
      infinite = false,
      showArrows = true,
      showDots = true,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS CAROUSEL CONTROLLER MEMOIZATION
    const controller = useMemo(
      () =>
        new CarouselController({
          children,
          autoplay,
          interval,
          infinite,
          showArrows,
          showDots,
        }),
      [children, autoplay, interval, infinite, showArrows, showDots],
    )

    // ---------- REACTIVE STATE INITIALIZATION
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    // ---------- SLIDE ARRAY COMPUTATION
    const slides = Array.isArray(children) ? children : [children]
    const slideCount = slides.length

    // ---------- NEXT SLIDE NAVIGATION HANDLER
    const nextSlide = useCallback(() => {
      if (controller.isInfinite()) {
        setCurrentIndex((prev) => (prev + 1) % slideCount)
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, slideCount - 1))
      }
    }, [controller, slideCount])

    // ---------- PREVIOUS SLIDE NAVIGATION HANDLER
    const prevSlide = useCallback(() => {
      if (controller.isInfinite()) {
        setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount)
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
    }, [controller, slideCount])

    // ---------- GO TO SLIDE DIRECT HANDLER
    const goToSlide = useCallback((index: number) => {
      setCurrentIndex(index)
    }, [])

    // ---------- SIDE EFFECT: AUTOPLAY INTERVAL TIMER
    useEffect(() => {
      // Early return guard clause for disabled autoplay or paused state
      if (!controller.isAutoplay() || isPaused) return

      const timer = setInterval(() => {
        nextSlide()
      }, controller.getInterval())

      return () => {
        clearInterval(timer)
      }
    }, [controller, nextSlide, isPaused])

    // ---------- TOUCH EVENT HANDLERS
    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX
    }

    const handleTouchEnd = () => {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 50) {
        nextSlide()
      } else if (diff < -50) {
        prevSlide()
      }
    }

    // ---------- MOUSE HOVER PAUSE HANDLERS
    const handleMouseEnter = () => {
      setIsPaused(true)
    }
    const handleMouseLeave = () => {
      setIsPaused(false)
    }

    return (
      <div
        ref={ref}
        className={`${controller.getCarouselClasses()}${className ? ` ${className}` : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...controller.getAriaAttributes()}
        {...props}
      >
        <div
          ref={trackRef}
          className={controller.getTrackClasses()}
          style={{
            transform: `translateX(-${(currentIndex * 100).toString()}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={controller.getSlideClasses()}>
              {slide}
            </div>
          ))}
        </div>

        {controller.showArrows() && slideCount > 1 && (
          <>
            <button
              type="button"
              className={`${controller.getArrowClasses()} ${controller.getArrowPrevClasses()}`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className={`${controller.getArrowClasses()} ${controller.getArrowNextClasses()}`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}

        {controller.showDots() && slideCount > 1 && (
          <div className={controller.getDotsClasses()}>
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={controller.getDotClasses(index === currentIndex)}
                onClick={() => {
                  goToSlide(index)
                }}
                aria-label={`Go to slide ${(index + 1).toString()}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'
export type { CarouselProps }
