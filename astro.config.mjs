// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { rewriteDocsLinks, transformPlaceholders } from './src/lib/remark-docs.mjs'

const base = '/obsidian-pm-site'

// `/docs` is a redirect stub to `/docs/install` — keep redirects out of the
// sitemap so Search Console doesn't flag them as "Page with redirect".
const docsIndex = `https://stepankropachev.github.io${base}/docs`

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://stepankropachev.github.io',
  base,
  trailingSlash: 'never',
  // Emit `docs/install.html` (not `docs/install/index.html`) so GitHub Pages
  // serves the slash-less canonical URLs at 200 instead of 301-redirecting
  // them to a trailing-slash variant.
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => page !== docsIndex,
      // Pages emit slash-less canonicals; match them so the sitemap doesn't
      // advertise URLs that all point elsewhere via rel=canonical.
      serialize: (item) => ({ ...item, url: item.url.replace(/\/$/, '') }),
    }),
  ],
  markdown: {
    remarkPlugins: [
      [rewriteDocsLinks, { base }],
      [transformPlaceholders, { base }],
    ],
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: true,
    },
  },
})
