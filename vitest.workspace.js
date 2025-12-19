/**
 * @file vitest.workspace.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @contributors
 * @license MIT
 *
 * @description
 * Vitests workspace configuration for monorepo project.
 *
 * @since 2025-12-18
 * @updated 2025-12-18
 *
 * @see {@link https://vitest.dev/config | Vitest configuration }
 */
// ---------- IMPORTS
import { defineWorkspace } from "vitest/config"

// ---------- CONFIGURATION
export default defineWorkspace([
  "./vitest.config.js"
])
