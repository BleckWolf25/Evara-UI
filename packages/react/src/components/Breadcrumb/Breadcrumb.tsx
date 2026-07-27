/**
 * @file Breadcrumb.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary React Breadcrumb UI component.
 *
 * @description
 * Renders structured navigation breadcrumbs with customizable separator characters, link targets, and ARIA current page indicators.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { forwardRef } from 'react'
import { BreadcrumbController } from '@bleckwolf25/core'
import type { BreadcrumbProps } from './Breadcrumb.types'
import './Breadcrumb.css'

// ---------- COMPONENTS

// ---------- REACT BREADCRUMB COMPONENT
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      className,
      ...props
    },
    ref
  ) => {
    // ---------- HEADLESS BREADCRUMB CONTROLLER INITIALIZATION
    const controller = new BreadcrumbController({
      items,
      separator,
    })

    return (
      <nav
        ref={ref}
        className={`${controller.getBreadcrumbClasses()}${className ? ` ${className}` : ''}`}
        {...controller.getAriaAttributes()}
        {...props}
      >
        <ol className={controller.getListClasses()}>
          {controller.getItems().map((item, index) => {
            const isLast = index === controller.getItems().length - 1
            const isCurrent = item.current ?? isLast

            return (
              <li
                key={index}
                className={controller.getItemClasses(isCurrent)}
              >
                {item.href && !isCurrent ? (
                  <a
                    href={item.href}
                    className={controller.getLinkClasses()}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className={controller.getCurrentClasses()}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className={controller.getSeparatorClasses()}>
                    {controller.getSeparator()}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'
export type { BreadcrumbProps }
