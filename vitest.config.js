/**
 * @file vitest.config.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @contributors
 * @license MIT
 *
 * @description
 * Vitests configuration for monorepo project.
 *
 * @since 2025-12-18
 * @updated 2025-12-18
 *
 * @see {@link https://vitest.dev/config | Vitest configuration }
 */
// ---------- IMPORTS
import tsconfigPaths from "vite-tsconfig-paths"
import { configDefaults, defineConfig } from "vitest/config"

// ---------- CONFIGURATION
export default defineConfig({
  // Tests
  test: {
    exclude: [
      ...configDefaults.exclude,
      "**/node_modules/**",
      "**/fixtures/**",
      "**/templates/**",
      "**/packages/tests/**",
    ],
  },
  // Plugins
  plugins: [
    tsconfigPaths({
      ignoreConfigErrors: true,
    }),
  ],
})
