import lastmodByPath from './docs-lastmod.json' with { type: 'json' }

/**
 * Map of canonical page URL -> ISO date the page's source last changed.
 *
 * Dates come from `src/lib/docs-lastmod.json`, regenerated from git history by
 * `scripts/update-lastmod.mjs`. They are read from a checked-in file rather
 * than resolved at build time because the production build runs from a
 * depth-1 clone, where git reports the tip commit for every path — which would
 * stamp the whole site with the deploy time on every deploy.
 *
 * Keys are slash-less to match what `@astrojs/sitemap` emits under
 * `trailingSlash: 'never'` (the homepage included, which it emits bare).
 */
export function buildLastmodMap(site) {
  const origin = new URL(site).href.replace(/\/$/, '')
  const map = new Map()

  for (const [path, date] of Object.entries(lastmodByPath)) {
    map.set(path === '/' ? origin : `${origin}${path}`, date)
  }

  return map
}
