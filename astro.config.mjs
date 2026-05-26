// @ts-check
import { defineConfig } from 'astro/config'
import { rewriteDocsLinks, transformPlaceholders } from './src/lib/remark-docs.mjs'

const base = '/obsidian-pm-site'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://stepankropachev.github.io',
  base,
  trailingSlash: 'ignore',
  markdown: {
    remarkPlugins: [
      [rewriteDocsLinks, { base }],
      transformPlaceholders,
    ],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
})
