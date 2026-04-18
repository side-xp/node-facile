import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const apiDir = './docs/api'

for (const file of readdirSync(apiDir).filter((f) => f.endsWith('.md'))) {
  const filePath = join(apiDir, file)
  const original = readFileSync(filePath, 'utf-8')
  let count = 0
  const updated = original.replace(/^## Call [Ss]ignature$/gm, () => `## Overload ${++count}`)

  if (updated !== original) {
    writeFileSync(filePath, updated, 'utf-8')
  }
}
