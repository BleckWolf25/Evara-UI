/**
 * @file ContextMenu.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContextMenu } from './ContextMenu'

describe('ContextMenu Component', () => {
  const items = [
    { label: 'Copy', onClick: vi.fn() },
    { label: 'Paste', onClick: vi.fn() }
  ]

  describe('Rendering', () => {
    it('renders menu items when open is true', () => {
      render(ContextMenu, {
        props: { items, open: true, x: 10, y: 20 }
      })
      expect(screen.getByText('Copy')).toBeInTheDocument()
      expect(screen.getByText('Paste')).toBeInTheDocument()
    })

    it('does not render when open is false', () => {
      render(ContextMenu, {
        props: { items, open: false }
      })
      expect(screen.queryByText('Copy')).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls item onClick when item is clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      const testItems = [{ label: 'Cut', onClick: handleClick }]

      render(ContextMenu, {
        props: { items: testItems, open: true }
      })

      const item = screen.getByText('Cut')
      await user.click(item)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
