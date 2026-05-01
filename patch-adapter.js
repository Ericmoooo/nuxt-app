/**
 * patch-adapter.js
 *
 * Resolves symlinks created by Nitro's dependency deduplication in
 * .output/server/node_modules. Nitro >= 2.11 deduplicates shared deps
 * into .output/server/node_modules/.nitro/<pkg>@<version>/ and replaces
 * the original directories with symlinks. Tools that reject symlinks
 * pointing outside a given root (e.g. OmegaCLI's copyDirectory) will
 * fail on these.
 *
 * This script walks .output/server/node_modules, finds every symlink,
 * resolves it to its real path, removes the symlink, and copies the
 * target directory in its place. Run after `nuxt build` and before
 * any packaging step.
 *
 * Usage:
 *   node patch-adapter.js
 */

import { readdir, lstat, readlink, rm, cp, stat } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'

const TARGETS = [
  resolve('.omega/compute/default/server/node_modules'),
]

async function findSymlinks(dir) {
  const symlinks = []

  async function walk(current) {
    let entries
    try {
      entries = await readdir(current)
    } catch {
      return
    }

    for (const entry of entries) {
      const fullPath = join(current, entry)
      const stats = await lstat(fullPath)

      if (stats.isSymbolicLink()) {
        symlinks.push(fullPath)
      } else if (stats.isDirectory() && entry !== '.nitro') {
        // Skip .nitro — that's the dedup source, not something to recurse into
        await walk(fullPath)
      }
    }
  }

  await walk(dir)
  return symlinks
}

async function resolveSymlink(linkPath) {
  const rawTarget = await readlink(linkPath)
  // Resolve relative symlink targets against the link's parent directory
  return resolve(dirname(linkPath), rawTarget)
}

async function patchSymlinks() {
  for (const nodeModulesDir of TARGETS) {
    // Check if the directory exists
    try {
      await stat(nodeModulesDir)
    } catch {
      continue
    }

    console.log(`\nScanning for symlinks in ${nodeModulesDir} ...`)

    const symlinks = await findSymlinks(nodeModulesDir)

    if (symlinks.length === 0) {
      console.log('No symlinks found. Nothing to patch.')
      continue
    }

    console.log(`Found ${symlinks.length} symlink(s) to resolve:\n`)

    for (const linkPath of symlinks) {
      const target = await resolveSymlink(linkPath)

      // Verify the target actually exists
      try {
        await stat(target)
      } catch {
        console.warn(`  SKIP ${linkPath} -> target does not exist: ${target}`)
        continue
      }

      console.log(`  ${linkPath}`)
      console.log(`    -> ${target}`)

      // Remove the symlink
      await rm(linkPath, { force: true })

      // Copy the resolved target into the symlink's former location
      await cp(target, linkPath, { recursive: true })
    }

    // Clean up the .nitro dedup directory since it's no longer needed
    const nitroDedupDir = join(nodeModulesDir, '.nitro')
    try {
      await stat(nitroDedupDir)
      await rm(nitroDedupDir, { recursive: true, force: true })
      console.log(`\nRemoved dedup directory: ${nitroDedupDir}`)
    } catch {
      // .nitro dir doesn't exist, nothing to clean up
    }
  }

  console.log('\nDone. All symlinks resolved to real copies.')
}

patchSymlinks().catch((err) => {
  console.error('patch-adapter failed:', err)
  process.exit(1)
})
