import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    clean: true,
    entry: 'src/index.ts',
    format: 'esm',
    dts: true,
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  },
  {
    clean: true,
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'facile',
    dts: false,
  },
])
