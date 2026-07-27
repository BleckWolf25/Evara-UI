/**
 * @file playwright.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Playwright End-to-End test configuration for multi-framework web applications.
 *
 * @description
 * Configures Playwright E2E test execution, specifying test directories, browser projects, dev servers, and base URLs.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
import { defineConfig, devices } from '@playwright/test'

// ---------- CONFIGURATION
export default defineConfig({
  // ---------- TEST DIRECTORY AND CONCURRENCY
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',

  // ---------- BROWSER CONTEXT OPTIONS
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  // ---------- TARGET BROWSER PROJECTS
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // ---------- SHOWCASE DEV WEB SERVERS
  webServer: [
    {
      command: 'pnpm --filter @bleckwolf25/react-vite-showcase dev --port 5173',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
    },
    {
      command: 'pnpm --filter @bleckwolf25/vue-vite-showcase dev --port 5174',
      url: 'http://localhost:5174',
      reuseExistingServer: true,
    },
    {
      command: 'pnpm --filter @bleckwolf25/svelte-vite-showcase dev --port 5175',
      url: 'http://localhost:5175',
      reuseExistingServer: true,
    },
  ],
})
