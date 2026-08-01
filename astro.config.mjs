// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { rewriteDocsLinks, transformPlaceholders } from './src/lib/remark-docs.mjs'

// `/docs` is a redirect stub to `/docs/install` — keep redirects out of the
// sitemap so Search Console doesn't flag them as "Page with redirect".
const docsIndex = 'https://dotpm.pm/docs'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://dotpm.pm',
  trailingSlash: 'never',
  // Emit `docs/install.html` (not `docs/install/index.html`). Workers static
  // assets defaults to `html_handling: auto-trailing-slash`, which serves
  // those at the slash-less canonical URL with a 200.
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => page !== docsIndex,
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
