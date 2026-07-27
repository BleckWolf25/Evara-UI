/**
 * @file ContextMenu.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for ContextMenu.
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
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContextMenu } from './ContextMenu'

describe('ContextMenu Component', () => {
  describe('Rendering', () => {
    it('renders menu items when open', () => {
      render(
        <ContextMenu
          open
          items={[
            { label: 'Copy', onClick: vi.fn() },
            { label: 'Paste', onClick: vi.fn() }
          ]}
        />
      )
      expect(screen.getByText('Copy')).toBeInTheDocument()
      expect(screen.getByText('Paste')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(
        <ContextMenu
          open={false}
          items={[{ label: 'Copy', onClick: vi.fn() }]}
        />
      )
      expect(screen.queryByText('Copy')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when item is clicked', async () => {
      const user = userEvent.setup()
      const handleCopy = vi.fn()

      render(
        <ContextMenu
          open
          items={[{ label: 'Copy', onClick: handleCopy }]}
        />
      )

      await user.click(screen.getByText('Copy'))
      expect(handleCopy).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick for disabled items', async () => {
      const user = userEvent.setup()
      const handleCopy = vi.fn()

      render(
        <ContextMenu
          open
          items={[{ label: 'Copy', onClick: handleCopy, disabled: true }]}
        />
      )

      await user.click(screen.getByText('Copy'))
      expect(handleCopy).not.toHaveBeenCalled()
    })
  })

  describe('CSS Classes', () => {
    it('applies disabled class to disabled items', () => {
      render(
        <ContextMenu
          open
          items={[{ label: 'Copy', onClick: vi.fn(), disabled: true }]}
        />
      )
      expect(screen.getByText('Copy')).toHaveClass('ui-context-menu__item--disabled')
    })

    it('applies divider class to items with divider', () => {
      render(
        <ContextMenu
          open
          items={[{ label: 'Copy', onClick: vi.fn(), divider: true }]}
        />
      )
      expect(screen.getByText('Copy')).toHaveClass('ui-context-menu__item--divider')
    })
  })

  describe('Accessibility', () => {
    it('sets role="menu"', () => {
      render(
        <ContextMenu
          open
          items={[{ label: 'Copy', onClick: vi.fn() }]}
        />
      )
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('sets role="menuitem" on items', () => {
      render(
        <ContextMenu
          open
          items={[{ label: 'Copy', onClick: vi.fn() }]}
        />
      )
      expect(screen.getByText('Copy')).toHaveAttribute('role', 'menuitem')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<ContextMenu open items={[{ label: 'Copy', onClick: () => { /* noop */ } }]} x={10} y={10} />)
      expect(container).toMatchSnapshot()
    })
  })
})
