/**
 * @file Pagination.test.tsx
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Pagination.
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
import { Pagination } from './Pagination'

describe('Pagination Component', () => {
  describe('Rendering', () => {
    it('renders page numbers correctly', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
        />
      )
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders total count info', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
        />
      )
      expect(screen.getByText(/Showing 1 to 10 of 50 items/)).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onPageChange when page is clicked', async () => {
      const user = userEvent.setup()
      const handlePageChange = vi.fn()

      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      )

      await user.click(screen.getByText('2'))
      expect(handlePageChange).toHaveBeenCalledWith(2)
    })

    it('calls onPageChange when next button is clicked', async () => {
      const user = userEvent.setup()
      const handlePageChange = vi.fn()

      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      )

      await user.click(screen.getByLabelText('Next page'))
      expect(handlePageChange).toHaveBeenCalledWith(2)
    })

    it('calls onPageChange when prev button is clicked', async () => {
      const user = userEvent.setup()
      const handlePageChange = vi.fn()

      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      )

      await user.click(screen.getByLabelText('Previous page'))
      expect(handlePageChange).toHaveBeenCalledWith(1)
    })
  })

  describe('CSS Classes', () => {
    it('applies size class correctly', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          size="lg"
        />
      )
      expect(screen.getByRole('navigation')).toHaveClass('ui-pagination--lg')
    })

    it('applies active class to current page', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
        />
      )
      const currentPageButton = screen.getByText('2').closest('button')
      expect(currentPageButton?.parentElement).toHaveClass('ui-pagination__item--active')
    })
  })

  describe('Accessibility', () => {
    it('sets role="navigation"', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
        />
      )
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('sets aria-label correctly', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
        />
      )
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination')
    })

    it('sets aria-current on active page', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
        />
      )
      const currentPageButton = screen.getByText('2')
      expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Pagination currentPage={1} totalPages={5} onPageChange={() => { /* noop */ }} />)
      expect(container).toMatchSnapshot()
    })
  })
})
