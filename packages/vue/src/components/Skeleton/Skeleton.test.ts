/**
 * @file Skeleton.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Skeleton.
 *
 * @description
 * Executes test assertions validating behavior, accessibility attributes, and props.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
// @vitest-environment jsdom
import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './Skeleton'

describe('Skeleton Component', () => {
  describe('Rendering', () => {
    it('applies shape classes correctly', () => {
      const { container } = render(Skeleton, {
        props: { shape: 'circle' }
      })
      expect(container.firstChild).toHaveClass('ui-skeleton--circle')
    })

    it('applies animation classes by default', () => {
      const { container } = render(Skeleton)
      expect(container.firstChild).toHaveClass('ui-skeleton--animated')
    })
  })
})
