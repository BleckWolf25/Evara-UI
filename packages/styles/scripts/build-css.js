#!/usr/bin/env node
/**
 * @file build-css.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary CSS build script copying stylesheet assets.
 *
 * @description
 * Copies CSS token stylesheets from src directory to output dist folder.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

// ---------- IMPORTS
/**
 * CSS Build Script
 * Copies CSS files from src to dist
 */

import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const copyDir = (src, dest) => {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
};

const srcDir = join(rootDir, 'src');
const distDir = join(rootDir, 'dist');

// eslint-disable-next-line no-console
console.log('Building CSS...');
copyDir(srcDir, distDir);
// eslint-disable-next-line no-console
console.log('CSS built successfully!');
