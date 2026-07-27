#!/usr/bin/env node
/**
 * @file cleanup.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Monorepo workspace cleanup utility script.
 *
 * @description
 * Recursively scans and purges monorepo build artifacts, node_modules dependencies,
 * package lockfiles, framework caches, and TypeScript build state files across all workspace packages.
 *
 * @since 10/06/2026
 * @updated 27/07/2026
 */

/* eslint-disable no-console */

// ---------- IMPORTS
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ---------- CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ---------- ROOT PATH RESOLUTION
const rootDir = path.resolve(__dirname, '..')

// ---------- ANSI TERMINAL STYLING CODES
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
}

// ---------- LOGGING UTILITIES

// ---------- MESSAGE LOGGING
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// ---------- SECTION HEADER LOGGING
function logSection(title) {
  log(`\n${'='.repeat(60)}`, 'bright')
  log(`  ${title}`, 'bright')
  log(`${'='.repeat(60)}`, 'bright')
}

// ---------- ITEM STATUS LOGGING
function logItem(item, status) {
  const statusColor = status === '✓' ? 'green' : status === '✗' ? 'red' : 'yellow'
  console.log(`  ${colors[statusColor]}${status}${colors.reset} ${item}`)
}

// ---------- FILESYSTEM OPERATIONAL HELPERS

// ---------- PATH EXISTENCE CHECK
async function pathExists(filePath) {
  try {
    await fs.access(filePath)
    return true;
  } catch {
    return false
  }
}

// ---------- RECURSIVE DIRECTORY REMOVAL
async function removeDirectory(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true })
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`  Error removing ${dirPath}:`, message)
    return false
  }
}

// ---------- SINGLE FILE REMOVAL
async function removeFile(filePath) {
  try {
    await fs.unlink(filePath)
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`  Error removing ${filePath}:`, message)
    return false
  }
}

// ---------- PATTERN SEARCH AND PURGE
async function findAndRemove(pattern, baseDir) {
  const items = []
  try {
    const entries = await fs.readdir(baseDir, { recursive: true })
    for (const entry of entries) {
      if (entry.includes(pattern)) {
        const fullPath = path.join(baseDir, entry)
        const stat = await fs.stat(fullPath)
        if (stat.isDirectory()) {
          if (await removeDirectory(fullPath)) {
            items.push(fullPath)
          }
        } else if (stat.isFile()) {
          if (await removeFile(fullPath)) {
            items.push(fullPath)
          }
        }
      }
    }
  } catch {
    // Ignore inaccessible subdirectories during search
  }
  return items
}

// ---------- MAIN CLEANUP ROUTINE
async function cleanup() {
  log(`\n🧹 Evara-UI Cleanup Script`, 'cyan')
  log(`Root directory: ${rootDir}`, 'dim')

  let removedCount = 0
  let errorCount = 0

  // ---------- ROOT DEPENDENCIES AND LOCKFILES
  logSection('Removing pnpm and dependencies')
  const lockFile = path.join(rootDir, 'pnpm-lock.yaml')
  const nodeModules = path.join(rootDir, 'node_modules')

  if (await pathExists(lockFile)) {
    if (await removeFile(lockFile)) {
      logItem('pnpm-lock.yaml', '✓')
      removedCount++
    } else {
      logItem('pnpm-lock.yaml', '✗')
      errorCount++
    }
  }

  if (await pathExists(nodeModules)) {
    if (await removeDirectory(nodeModules)) {
      logItem('node_modules/', '✓')
      removedCount++
    } else {
      logItem('node_modules/', '✗')
      errorCount++
    }
  }

  // ---------- PACKAGE DEPENDENCIES PURGE
  logSection('Removing package-level dependencies')
  const packagesDir = path.join(rootDir, 'packages')
  try {
    const packages = await fs.readdir(packagesDir)
    for (const pkg of packages) {
      const pkgPath = path.join(packagesDir, pkg)
      const stat = await fs.stat(pkgPath)
      if (!stat.isDirectory()) continue

      const pkgNodeModules = path.join(pkgPath, 'node_modules')
      if (await pathExists(pkgNodeModules)) {
        if (await removeDirectory(pkgNodeModules)) {
          logItem(`packages/${pkg}/node_modules/`, '✓')
          removedCount++
        } else {
          logItem(`packages/${pkg}/node_modules/`, '✗')
          errorCount++
        }
      }
    }
  } catch {
    // Skip if packages directory doesn't exist
  }

  // ---------- BUILD ARTIFACTS PURGE
  logSection('Removing build artifacts')
  const buildPatterns = ['dist', 'build', '.next', 'out']
  for (const pattern of buildPatterns) {
    const removed = await findAndRemove(pattern, rootDir)
    for (const item of removed) {
      logItem(item.replace(rootDir, '.'), '✓')
      removedCount++
    }
  }

  // ---------- TOOLING CACHES PURGE
  logSection('Removing caches')
  const cacheDirs = [
    path.join(rootDir, '.turbo'),
    path.join(rootDir, '.vitest'),
    path.join(rootDir, '.eslintcache'),
    path.join(rootDir, '.vite'),
  ]

  for (const dir of cacheDirs) {
    if (await pathExists(dir)) {
      if (await removeDirectory(dir)) {
        logItem(dir.replace(rootDir, '.'), '✓')
        removedCount++
      } else {
        logItem(dir.replace(rootDir, '.'), '✗')
        errorCount++
      }
    }
  }

  // ---------- TYPESCRIPT BUILD CACHES PURGE
  logSection('Removing TypeScript caches')
  const tsCacheDirs = [
    path.join(rootDir, '.tsbuildinfo'),
    path.join(rootDir, 'tsconfig.tsbuildinfo'),
  ]

  for (const dir of tsCacheDirs) {
    if (await pathExists(dir)) {
      const stat = await fs.stat(dir)
      if (stat.isFile() ? await removeFile(dir) : await removeDirectory(dir)) {
        logItem(dir.replace(rootDir, '.'), '✓')
        removedCount++
      } else {
        logItem(dir.replace(rootDir, '.'), '✗')
        errorCount++
      }
    }
  }

  // ---------- FRAMEWORK SPECIFIC CACHES PURGE
  logSection('Removing framework caches')
  const frameworkCaches = [
    '.nuxt',
    '.vue',
    '.vuepress',
    '.next',
    '.react',
    '.rollup.cache',
  ]

  for (const pattern of frameworkCaches) {
    const removed = await findAndRemove(pattern, rootDir)
    for (const item of removed) {
      logItem(item.replace(rootDir, '.'), '✓')
      removedCount++
    }
  }

  // ---------- CLEANUP SUMMARY OUTPUT
  logSection('Summary')
  log(`Total items removed: ${removedCount}`, 'green')
  if (errorCount > 0) {
    log(`Errors encountered: ${errorCount}`, 'red')
  }

  log(`\n✨ Cleanup complete! Run 'pnpm install' to reinstall dependencies.\n`, 'cyan')

  process.exit(errorCount > 0 ? 1 : 0)
}

// ---------- EXECUTION TRIGGER
cleanup().catch((error) => {
  log(`\n❌ Fatal error: ${error instanceof Error ? error.message : String(error)}`, 'red')
  process.exit(1)
})
