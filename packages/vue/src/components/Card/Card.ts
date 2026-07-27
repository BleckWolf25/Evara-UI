/**
 * @file Card.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vue Card container component with Header, Body, and Footer sub-components.
 *
 * @description
 * Renders flexible container boxes with variant styles, box shadow elevations, and compound sub-components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineComponent, h, type PropType } from 'vue'
import { CardController } from '@evara-ui/core'
import type { CardProps } from './Card.types'
import './Card.css'

// ---------- COMPONENTS

// ---------- VUE CARD MAIN CONTAINER COMPONENT
const CardComponent = defineComponent({
  name: 'Card',
  props: {
    variant: {
      type: String as PropType<CardProps['variant']>,
      default: 'default',
    },
    elevation: {
      type: String as PropType<CardProps['elevation']>,
      default: 'md',
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      // ---------- HEADLESS CARD CONTROLLER INITIALIZATION
      const controller = new CardController({
        variant: props.variant,
        elevation: props.elevation,
      })

      return h(
        'div',
        {
          class: [controller.getCardClasses(), attrs.class],
          ...controller.getAriaAttributes(),
        },
        slots.default?.()
      )
    }
  },
})

// ---------- VUE CARD HEADER SUB-COMPONENT
const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-card__header', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE CARD BODY SUB-COMPONENT
const CardBody = defineComponent({
  name: 'CardBody',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-card__body', attrs.class] }, slots.default?.())
  },
})

// ---------- VUE CARD FOOTER SUB-COMPONENT
const CardFooter = defineComponent({
  name: 'CardFooter',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['ui-card__footer', attrs.class] }, slots.default?.())
  },
})

// ---------- COMPOUND CARD EXPORT
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
