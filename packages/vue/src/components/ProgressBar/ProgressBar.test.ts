/**
 * @file ProgressBar.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for ProgressBar.
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
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar Component', () => {
  describe('Rendering', () => {
    it('has role="progressbar"', () => {
      render(ProgressBar, {
        props: { value: 45 }
      })
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('sets correct accessibility attributes based on props', () => {
      render(ProgressBar, {
        props: { value: 65 }
      })
      const progressbar = screen.getByRole('progressbar')
      expect(progressbar).toHaveAttribute('aria-valuenow', '65')
      expect(progressbar).toHaveAttribute('aria-valuemin', '0')
      expect(progressbar).toHaveAttribute('aria-valuemax', '100')
    })
  })
})
