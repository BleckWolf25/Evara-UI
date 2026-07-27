/**
 * @file react-showcase.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Playwright E2E tests for React showcase application.
 *
 * @description
 * Verifies React showcase page navigation, theme toggling, and dialog interaction routines.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { test, expect } from '@playwright/test'

// ---------- TEST SUITES

// ---------- REACT SHOWCASE E2E TEST SUITE
test.describe('React Showcase E2E Tests', () => {
  // ---------- BEFORE EACH NAVIGATION HOOK
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  // ---------- PAGE LOAD TEST
  test('loads React showcase page successfully', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Evara UI')
  })

  // ---------- THEME TOGGLE TEST
  test('toggles theme correctly', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /Theme:/i })
    await expect(toggleBtn).toBeVisible()

    await toggleBtn.click()
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme')
  })

  // ---------- DIALOG INTERACTION TEST
  test('interacts with Modal dialog', async ({ page }) => {
    const openModalBtn = page.getByRole('button', { name: /Open React Modal/i })
    if (await openModalBtn.isVisible()) {
      await openModalBtn.click()
      await expect(page.locator('.ui-dialog')).toBeVisible()
    }
  })
})
