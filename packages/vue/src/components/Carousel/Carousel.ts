/**
 * @file Carousel.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Carousel interactive slideshow slider component.
 *
 * @description
 * Renders slide carousels supporting touch gestures, infinite loops, autoplay timers, arrow navigation, and dot indicators.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, ref, onBeforeUnmount, type VNodeChild } from 'vue'
import { CarouselController } from '@bleckwolf25/core'
import './Carousel.css'

// ---------- COMPONENTS

// ---------- VUE CAROUSEL COMPONENT
export const Carousel = defineComponent({
  name: 'Carousel',
  props: {
    autoplay: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 5000,
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    showArrows: {
      type: Boolean,
      default: true,
    },
    showDots: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    // ---------- REACTIVE STATE AND REFS
    const currentIndex = ref(0)
    const isPaused = ref(false)
    const trackRef = ref<HTMLDivElement | null>(null)
    const touchStartX = ref(0)
    const touchEndX = ref(0)
    let timer: ReturnType<typeof setInterval> | null = null

    // ---------- CLEAR AUTOPLAY TIMER
    const clearAutoTimer = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    // ---------- START AUTOPLAY TIMER
    const startAutoTimer = (controller: CarouselController, slideCount: number) => {
      clearAutoTimer()
      // Guard clause for disabled autoplay or insufficient slides
      if (!controller.isAutoplay() || isPaused.value || slideCount <= 1) return
      timer = setInterval(() => {
        if (controller.isInfinite()) {
          currentIndex.value = (currentIndex.value + 1) % slideCount
        } else {
          currentIndex.value = Math.min(currentIndex.value + 1, slideCount - 1)
        }
      }, controller.getInterval())
    }

    // ---------- LIFECYCLE CLEANUP
    onBeforeUnmount(() => {
      clearAutoTimer()
    })

    // ---------- TOUCH START HANDLER
    const handleTouchStart = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) touchStartX.value = e.changedTouches[0].screenX
    }

    // ---------- TOUCH MOVE HANDLER
    const handleTouchMove = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) touchEndX.value = e.changedTouches[0].screenX
    }

    return () => {
      const childrenSlot = slots.default ? slots.default() : []
      const slides: VNodeChild[] = Array.isArray(childrenSlot) ? childrenSlot : [childrenSlot]
      const slideCount = slides.length

      // ---------- HEADLESS CAROUSEL CONTROLLER INITIALIZATION
      const controller = new CarouselController({
        autoplay: props.autoplay,
        interval: props.interval,
        infinite: props.infinite,
        showArrows: props.showArrows,
        showDots: props.showDots,
      })

      startAutoTimer(controller, slideCount)

      // ---------- NEXT SLIDE HANDLER
      const nextSlide = () => {
        if (controller.isInfinite()) {
          currentIndex.value = (currentIndex.value + 1) % slideCount
        } else {
          currentIndex.value = Math.min(currentIndex.value + 1, slideCount - 1)
        }
      }

      // ---------- PREVIOUS SLIDE HANDLER
      const prevSlide = () => {
        if (controller.isInfinite()) {
          currentIndex.value = (currentIndex.value - 1 + slideCount) % slideCount
        } else {
          currentIndex.value = Math.max(currentIndex.value - 1, 0)
        }
      }

      // ---------- GO TO SPECIFIC SLIDE HANDLER
      const goToSlide = (index: number) => {
        currentIndex.value = index
      }

      // ---------- TOUCH END SWIPE HANDLER
      const handleTouchEnd = () => {
        const diff = touchStartX.value - touchEndX.value
        if (diff > 50) nextSlide()
        else if (diff < -50) prevSlide()
      }

      return h(
        'div',
        {
          class: [controller.getCarouselClasses(), attrs.class],
          onMouseEnter: () => {
            isPaused.value = true
          },
          onMouseLeave: () => {
            isPaused.value = false
          },
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          ...controller.getAriaAttributes(),
        },
        [
          h(
            'div',
            {
              ref: trackRef,
              class: controller.getTrackClasses(),
              style: {
                transform: `translateX(-${currentIndex.value * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
              },
            },
            slides.map((slide, index) => h('div', { key: index, class: controller.getSlideClasses() }, slide as any))
          ),
          controller.showArrows() && slideCount > 1
            ? [
                h(
                  'button',
                  {
                    type: 'button',
                    class: `${controller.getArrowClasses()} ${controller.getArrowPrevClasses()}`,
                    onClick: prevSlide,
                    'aria-label': 'Previous slide',
                  },
                  '‹'
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    class: `${controller.getArrowClasses()} ${controller.getArrowNextClasses()}`,
                    onClick: nextSlide,
                    'aria-label': 'Next slide',
                  },
                  '›'
                ),
              ]
            : null,
          controller.showDots() && slideCount > 1
            ? h(
                'div',
                { class: controller.getDotsClasses() },
                slides.map((_, index) =>
                  h('button', {
                    key: index,
                    type: 'button',
                    class: controller.getDotClasses(index === currentIndex.value),
                    onClick: () => { goToSlide(index); },
                    'aria-label': `Go to slide ${index + 1}`,
                  })
                )
              )
            : null,
        ]
      )
    }
  },
})
