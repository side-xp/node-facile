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
    entry: 'src/index.ts',
    format: 'cjs',
    dts: true,
    outExtensions: () => ({ js: '.cjs', dts: '.d.cts' }),
  },
  {
    clean: true,
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'facile',
    dts: false,
  },
])
