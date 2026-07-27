/**
 * @file InputGroup.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for InputGroup.
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
import { InputGroup } from './InputGroup'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'

describe('InputGroup Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <InputGroup>
          <Input placeholder="Search..." />
          <Button variant="primary">Search</Button>
        </InputGroup>
      )
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
      expect(screen.getByText('Search')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('sets aria-disabled when disabled', () => {
      render(
        <InputGroup disabled>
          <Input placeholder="Search..." />
          <Button variant="primary">Search</Button>
        </InputGroup>
      )
      expect(screen.getByPlaceholderText('Search...').closest('.ui-input-group')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(
        <InputGroup size="lg">
          <Input placeholder="Search..." />
        </InputGroup>
      )
      expect(screen.getByPlaceholderText('Search...').closest('.ui-input-group')).toHaveClass('ui-input-group--lg')
    })

    it('applies disabled class when disabled', () => {
      render(
        <InputGroup disabled>
          <Input placeholder="Search..." />
        </InputGroup>
      )
      expect(screen.getByPlaceholderText('Search...').closest('.ui-input-group')).toHaveClass('ui-input-group--disabled')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(
        <InputGroup>
          <span>https://</span>
          <Input />
        </InputGroup>
      )
      expect(container).toMatchSnapshot()
    })
  })
})
