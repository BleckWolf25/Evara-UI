/**
 * @file .lintstagedrc.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Configures lint-staged tasks for Git pre-commit hooks.
 *
 * @description
 * Defines pre-commit task commands executed automatically on staged Git files,
 * filtering out environment declaration files, running ESLint automatic fixes,
 * and applying Prettier formatting across code and document assets.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */
// ---------- CONFIGURATION
export default {
  '*.{ts,tsx,js,jsx,vue}': (filenames) => {
    // Filter out generated next environment declaration files
    const filtered = filenames.filter((filename) => !filename.includes('next-env.d.ts'))
    if (filtered.length === 0) return []

    // Return fix and write commands for filtered staged files
    return [`eslint --fix ${filtered.join(' ')}`, `prettier --write ${filtered.join(' ')}`]
  },
  '*.{json,md,yml,yaml}': ['prettier --write'],
}
