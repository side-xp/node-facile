import { defineConfig, defineProject } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**'],
      exclude: ['src/**/*.d.ts'],
    },
    projects: [
      defineProject({
        test: {
          name: 'node',
          environment: 'node',
          include: ['tests/**/*.test.ts'],
          exclude: ['tests/dom/**'],
        },
      }),
      defineProject({
        test: {
          name: 'jsdom',
          environment: 'jsdom',
          include: ['tests/**/*.test.ts'],
          exclude: ['tests/node/**'],
        },
      }),
    ],
  },
})
