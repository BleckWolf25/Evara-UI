/**
 * @file svelte-showcase.spec.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Playwright E2E tests for Svelte showcase application.
 *
 * @description
 * Verifies Svelte showcase page loading, theme store toggling, and interactive element behavior.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { test, expect } from '@playwright/test'

// ---------- TEST SUITES

// ---------- SVELTE SHOWCASE E2E TEST SUITE
test.describe('Svelte Showcase E2E Tests', () => {
  // ---------- BEFORE EACH NAVIGATION HOOK
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5175')
  })

  // ---------- PAGE LOAD TEST
  test('loads Svelte showcase page successfully', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Evara UI')
  })

  // ---------- THEME TOGGLE TEST
  test('toggles Svelte theme store', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /Theme:/i })
    await expect(toggleBtn).toBeVisible()

    await toggleBtn.click()
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme')
  })
})
