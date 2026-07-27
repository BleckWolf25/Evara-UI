/**
 * @file Pagination.test.ts
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
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination Component', () => {
  describe('Rendering', () => {
    it('renders current page and page buttons correctly', () => {
      render(Pagination, {
        props: { currentPage: 2, totalPages: 5 }
      })
      expect(screen.getByRole('button', { name: /previous page/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('emits pageChange when a page button is clicked', async () => {
      const user = userEvent.setup()
      const handlePageChange = vi.fn()
      render(Pagination, {
        props: { currentPage: 2, totalPages: 5, onPageChange: handlePageChange }
      })

      // Click on page 3
      const page3 = screen.getByText('3')
      await user.click(page3)
      expect(handlePageChange).toHaveBeenCalledWith(3)
    })
  })
})
