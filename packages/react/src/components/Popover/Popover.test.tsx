/**
 * @file Popover.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Popover.
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
import { Popover } from './Popover'

describe('Popover Component', () => {
  describe('Rendering', () => {
    it('renders content when open', () => {
      render(
        <Popover open>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      )
      expect(screen.getByText('Popover content')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <Popover open={false}>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      )
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
    })

    it('renders trigger when provided', () => {
      render(
        <Popover open={false} trigger={<button>Trigger</button>}>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      )
      expect(screen.getByText('Trigger')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('applies position class correctly', () => {
      render(
        <Popover open position="top">
          <Popover.Content>Content</Popover.Content>
        </Popover>
      )
      expect(screen.getByText('Content').closest('.ui-popover')).toHaveClass('ui-popover--top')
    })
  })

  describe('Accessibility', () => {
    it('sets role="dialog"', () => {
      render(
        <Popover open>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Popover open trigger={<button>Toggle</button>}>Popover content</Popover>)
      expect(container).toMatchSnapshot()
    })
  })
})
