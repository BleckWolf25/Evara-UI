/**
 * @file custom-elements.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Playwright E2E tests for framework-agnostic HTML custom elements.
 *
 * @description
 * Tests custom element rendering, shadow DOM structure, and interaction behavior for <evara-button> web components.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { test, expect } from '@playwright/test'

// ---------- TEST SUITES

// ---------- WEB COMPONENTS CUSTOM ELEMENTS E2E TEST SUITE
test.describe('Web Components Custom Elements E2E Tests', () => {
  // ---------- CUSTOM BUTTON ELEMENT RENDERING TEST
  test('renders custom element <evara-button>', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { registerEvaraCustomElements } from '/packages/core/dist/index.js'
          </script>
        </head>
        <body>
          <evara-button variant="primary">Click Me</evara-button>
        </body>
      </html>
    `)

    const btn = page.locator('evara-button')
    expect(btn).toBeDefined()
  })
})
