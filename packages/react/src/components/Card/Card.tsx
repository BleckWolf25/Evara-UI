/**
 * @file Card.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Card UI component with sub-component sub-elements.
 *
 * @description
 * Renders structured container cards with customizable visual variants, elevation shadows,
 * and compound sub-components (Card.Header, Card.Body, Card.Footer).
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { CardController } from '@bleckwolf25/core'
import type { CardProps } from './Card.types'
import './Card.css'

// ---------- COMPONENTS

// ---------- BASE CARD COMPONENT
const CardComponent = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      elevation = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS CARD CONTROLLER INITIALIZATION
    const controller = new CardController({
      variant,
      elevation,
    })

    return (
      <div
        ref={ref}
        className={`${controller.getCardClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardComponent.displayName = 'Card'

// ---------- CARD HEADER SUB-COMPONENT
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-card__header${className ? ` ${className}` : ''}`} {...props} />
  )
)
CardHeader.displayName = 'Card.Header'

// ---------- CARD BODY SUB-COMPONENT
const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-card__body${className ? ` ${className}` : ''}`} {...props} />
  )
)
CardBody.displayName = 'Card.Body'

// ---------- CARD FOOTER SUB-COMPONENT
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`ui-card__footer${className ? ` ${className}` : ''}`} {...props} />
  )
)
CardFooter.displayName = 'Card.Footer'

// ---------- COMPOUND CARD EXPORT OBJECT
const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})

export { Card }
export type { CardProps }
