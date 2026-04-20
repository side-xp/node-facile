import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = dirname(fileURLToPath(import.meta.url))
const _require = createRequire(import.meta.url)

const sidebarPath = resolve(__dirname, '../api/typedoc-sidebar.json')
const apiSidebar = existsSync(sidebarPath) ? _require(sidebarPath) : []

export default defineConfig({
  title: 'FacileJS',
  description: 'Lightweight JavaScript utilities with simple, beginner-friendly APIs.',
  base: '/node-facile/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/' },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'API Reference',
          items: apiSidebar,
        },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/side-xp/node-facile' }],
  },
})
