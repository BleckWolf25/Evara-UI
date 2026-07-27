/**
 * @file css.d.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Ambient module declaration that silences TypeScript's CSS import error.
 *
 * @description
 * Declares a wildcard module for all `.css` files so TypeScript does not report
 * TS2882 when a file performs a side-effect import such as `import './globals.css'`.
 * The declaration exports nothing; it only asserts the module exists.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- CSS MODULE DECLARATION
declare module '*.css' {}
