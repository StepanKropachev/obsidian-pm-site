// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { rewriteDocsLinks, transformPlaceholders } from './src/lib/remark-docs.mjs'
import { buildLastmodMap } from './src/lib/sitemap-lastmod.mjs'

// A redirect stub to `/docs/install`, excluded below so Search Console does
// not flag it as "Page with redirect".
const docsIndex = 'https://dotpm.pm/docs'

const site = 'https://dotpm.pm'
const lastmod = buildLastmodMap(site)

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site,
  trailingSlash: 'never',
  // Emits `docs/install.html`, which Workers static assets serves at the
  // slash-less `/docs/install` with a 200 under its default html_handling.
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => page !== docsIndex,
      serialize: (item) => {
        const date = lastmod.get(item.url.replace(/\/$/, ''))
        return date ? { ...item, lastmod: date } : item
      },
    }),
  ],
  markdown: {
    remarkPlugins: [rewriteDocsLinks, transformPlaceholders],
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
})
