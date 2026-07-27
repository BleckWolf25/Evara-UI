/**
 * @file ButtonGroup.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for ButtonGroup.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ButtonGroup } from './ButtonGroup'
import { Button } from '../Button/Button'

describe('ButtonGroup Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <ButtonGroup>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      )
      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByText('Third')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies orientation class correctly', () => {
      render(
        <ButtonGroup orientation="vertical">
          <Button>Button</Button>
        </ButtonGroup>
      )
      expect(screen.getByText('Button').closest('.ui-button-group')).toHaveClass('ui-button-group--vertical')
    })

    it('applies size class correctly', () => {
      render(
        <ButtonGroup size="lg">
          <Button>Button</Button>
        </ButtonGroup>
      )
      expect(screen.getByText('Button').closest('.ui-button-group')).toHaveClass('ui-button-group--lg')
    })
  })

  describe('Accessibility', () => {
    it('sets role="group"', () => {
      render(
        <ButtonGroup>
          <Button>Button</Button>
        </ButtonGroup>
      )
      expect(screen.getByText('Button').closest('.ui-button-group')).toHaveAttribute('role', 'group')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<ButtonGroup><Button>First</Button><Button>Second</Button></ButtonGroup>)
      expect(container).toMatchSnapshot()
    })
  })
})
