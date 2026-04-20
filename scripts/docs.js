// This script is invoked after generating the API documentation with TypeDoc, in order to process the generated
// MarkDown files to apply custom behavior.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Processes the MarkDown files of a directory.
 * @param {string} dir The path of the directory to process.
 */
function processDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = join(dir, entry.name)
    // Process directories recursively
    if (entry.isDirectory()) {
      processDir(entryPath)
    }
    // If the current item is a MarkDown file
    else if (entry.isFile() && entry.name.endsWith('.md')) {
      const original = readFileSync(entryPath, 'utf-8')

      // Replace TypeDoc's `## Call Signature` for function overloads headers with a counter
      let overloadsCount = 0
      const content = original.replace(/^## Call [Ss]ignature$/gm, () => `## Overload ${++overloadsCount}`)

      // Overwrite file if the content has changed
      if (content !== original) {
        writeFileSync(entryPath, content, 'utf-8')
      }
    }
  }
}

processDir('./docs/api')
