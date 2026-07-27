/**
 * @file Field.test.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Unit/integration tests for Field.
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
import { Field } from './Field'

describe('Field Component', () => {
    it('renders label and helper text correctly', () => {
      render(Field, {
        props: {
          label: 'Username',
          helperText: 'Choose a unique name'
        }
      })

      expect(screen.getByText('Username')).toBeInTheDocument()
      expect(screen.getByText('Choose a unique name')).toBeInTheDocument()
    })

    it('renders error text when error is provided', () => {
      render(Field, {
        props: {
          label: 'Username',
          error: 'Username is taken'
        }
      })
      expect(screen.getByText('Username is taken')).toBeInTheDocument()
    })

    it('displays required asterisk when required is true', () => {
      render(Field, {
        props: { label: 'Password', required: true }
      })
      const asterisk = screen.getByText('*')
      expect(asterisk).toBeInTheDocument()
      expect(asterisk).toHaveClass('ui-field__required-indicator')
    })
})
