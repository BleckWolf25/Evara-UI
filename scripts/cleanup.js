#!/usr/bin/env node
/**
 * @file cleanup.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @contributors
 * @license MIT
 *
 * @description
 * Cleanup script for Evara-UI monorepo. Removes unnecessary files and
 * directories to reset the project state, including package manager locks,
 * node_modules, build artifacts, caches, and TypeScript build info files.
 *
 * @since 2025-12-19
 * @updated 2025-12-19
 */
/* eslint-disable no-console */
// ---------- IMPORTS
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------- CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * ANSI color codes for terminal output
 * @type {Record<string, string>}
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

// ---------- FUNCTIONS
/**
 * Logs a message to console with optional color
 * @param {string} message - The message to log
 * @param {keyof typeof colors} [color='reset'] - The color to apply
 * @returns {void}
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Logs a section header
 * @param {string} title - The section title
 * @returns {void}
 */
function logSection(title) {
  log(`\n${'='.repeat(60)}`, 'bright');
  log(`  ${title}`, 'bright');
  log(`${'='.repeat(60)}`, 'bright');
}

/**
 * Logs a cleanup item with status indicator
 * @param {string} item - The item path or name
 * @param {string} status - The status indicator ('✓', '✗', or '?')
 * @returns {void}
 */
function logItem(item, status) {
  const statusColor = status === '✓' ? 'green' : status === '✗' ? 'red' : 'yellow';
  console.log(`  ${colors[statusColor]}${status}${colors.reset} ${item}`);
}

/**
 * Checks if a file or directory exists
 * @param {string} filePath - The file path to check
 * @returns {Promise<boolean>} True if the path exists
 */
async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes a directory recursively
 * @param {string} dirPath - The directory path to remove
 * @returns {Promise<boolean>} True if successful
 */
async function removeDirectory(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  Error removing ${dirPath}:`, message);
    return false;
  }
}

/**
 * Removes a file
 * @param {string} filePath - The file path to remove
 * @returns {Promise<boolean>} True if successful
 */
async function removeFile(filePath) {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  Error removing ${filePath}:`, message);
    return false;
  }
}

/**
 * Finds and removes all files/directories matching a pattern recursively
 * @param {string} pattern - The pattern to search for
 * @param {string} baseDir - The base directory to search in
 * @returns {Promise<string[]>} Array of removed item paths
 */
async function findAndRemove(pattern, baseDir) {
  const items = [];
  try {
    const entries = await fs.readdir(baseDir, { recursive: true });
    for (const entry of entries) {
      if (entry.includes(pattern)) {
        const fullPath = path.join(baseDir, entry);
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          if (await removeDirectory(fullPath)) {
            items.push(fullPath);
          }
        } else if (stat.isFile()) {
          if (await removeFile(fullPath)) {
            items.push(fullPath);
          }
        }
      }
    }
  } catch {
    // Ignore errors during recursive search
  }
  return items;
}

/**
 * Main cleanup function that removes all unnecessary files and directories
 * @returns {Promise<void>}
 */
async function cleanup() {
  log(`\n🧹 Evara-UI Cleanup Script`, 'cyan');
  log(`Root directory: ${rootDir}`, 'dim');

  let removedCount = 0;
  let errorCount = 0;

  // 1. pnpm lock and node_modules
  logSection('Removing pnpm and dependencies');
  const lockFile = path.join(rootDir, 'pnpm-lock.yaml');
  const nodeModules = path.join(rootDir, 'node_modules');

  if (await pathExists(lockFile)) {
    if (await removeFile(lockFile)) {
      logItem('pnpm-lock.yaml', '✓');
      removedCount++;
    } else {
      logItem('pnpm-lock.yaml', '✗');
      errorCount++;
    }
  }

  if (await pathExists(nodeModules)) {
    if (await removeDirectory(nodeModules)) {
      logItem('node_modules/', '✓');
      removedCount++;
    } else {
      logItem('node_modules/', '✗');
      errorCount++;
    }
  }

  // 2. Package node_modules and locks
  logSection('Removing package-level dependencies');
  const packagesDir = path.join(rootDir, 'packages');
  try {
    const packages = await fs.readdir(packagesDir);
    for (const pkg of packages) {
      const pkgPath = path.join(packagesDir, pkg);
      const stat = await fs.stat(pkgPath);
      if (!stat.isDirectory()) continue;

      const pkgNodeModules = path.join(pkgPath, 'node_modules');
      if (await pathExists(pkgNodeModules)) {
        if (await removeDirectory(pkgNodeModules)) {
          logItem(`packages/${pkg}/node_modules/`, '✓');
          removedCount++;
        } else {
          logItem(`packages/${pkg}/node_modules/`, '✗');
          errorCount++;
        }
      }
    }
  } catch {
    // packages dir might not exist yet
  }

  // 3. Build and dist directories
  logSection('Removing build artifacts');
  const buildPatterns = ['dist', 'build', '.next', 'out'];
  for (const pattern of buildPatterns) {
    const removed = await findAndRemove(pattern, rootDir);
    for (const item of removed) {
      logItem(item.replace(rootDir, '.'), '✓');
      removedCount++;
    }
  }

  // 4. Cache directories
  logSection('Removing caches');
  const cacheDirs = [
    path.join(rootDir, '.turbo'),
    path.join(rootDir, '.vitest'),
    path.join(rootDir, '.eslintcache'),
    path.join(rootDir, '.vite'),
  ];

  for (const dir of cacheDirs) {
    if (await pathExists(dir)) {
      if (await removeDirectory(dir)) {
        logItem(dir.replace(rootDir, '.'), '✓');
        removedCount++;
      } else {
        logItem(dir.replace(rootDir, '.'), '✗');
        errorCount++;
      }
    }
  }

  // 5. TypeScript cache
  logSection('Removing TypeScript caches');
  const tsCacheDirs = [
    path.join(rootDir, '.tsbuildinfo'),
    path.join(rootDir, 'tsconfig.tsbuildinfo'),
  ];

  for (const dir of tsCacheDirs) {
    if (await pathExists(dir)) {
      const stat = await fs.stat(dir);
      if (stat.isFile() ? await removeFile(dir) : await removeDirectory(dir)) {
        logItem(dir.replace(rootDir, '.'), '✓');
        removedCount++;
      } else {
        logItem(dir.replace(rootDir, '.'), '✗');
        errorCount++;
      }
    }
  }

  // 6. Framework-specific caches
  logSection('Removing framework caches');
  const frameworkCaches = [
    '.nuxt',
    '.vue',
    '.vuepress',
    '.next',
    '.react',
    '.rollup.cache',
  ];

  for (const pattern of frameworkCaches) {
    const removed = await findAndRemove(pattern, rootDir);
    for (const item of removed) {
      logItem(item.replace(rootDir, '.'), '✓');
      removedCount++;
    }
  }

  // 7. Summary
  logSection('Summary');
  log(`Total items removed: ${removedCount}`, 'green');
  if (errorCount > 0) {
    log(`Errors encountered: ${errorCount}`, 'red');
  }

  log(
    `\n✨ Cleanup complete! Run 'pnpm install' to reinstall dependencies.\n`,
    'cyan'
  );

  process.exit(errorCount > 0 ? 1 : 0);
}

// ---------- EXECUTION
cleanup().catch((error) => {
  log(
    `\n❌ Fatal error: ${error instanceof Error ? error.message : String(error)}`,
    'red'
  );
  process.exit(1);
});
