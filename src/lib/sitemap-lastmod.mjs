import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'

const DOCS_DIR = 'src/content/docs'
const HOME_SOURCE = 'src/pages/index.astro'

/**
 * Last commit date for a path, as an ISO-8601 string.
 *
 * Returns null when git can't answer — no repo, no history for the path, or a
 * clone so shallow the file's commit isn't present. Callers omit `lastmod`
 * rather than substituting a wrong date: a missing hint costs a little crawl
 * freshness, a wrong one teaches Google to distrust the whole sitemap.
 */
function lastCommitISO(path) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || null
  } catch {
    return null
  }
}

/**
 * Map of canonical page URL -> ISO date of the last commit touching its source.
 *
 * Keys are slash-less to match what `@astrojs/sitemap` emits under
 * `trailingSlash: 'never'` (the homepage included, which it emits bare).
 */
export function buildLastmodMap(site) {
  const origin = new URL(site).href.replace(/\/$/, '')
  const map = new Map()

  const home = lastCommitISO(HOME_SOURCE)
  if (home) map.set(origin, home)

  for (const file of readdirSync(DOCS_DIR)) {
    if (!file.endsWith('.md')) continue
    // `01-install.md` -> `install`; the numeric prefix only orders the files.
    const slug = file.replace(/\.md$/, '').replace(/^\d+-/, '')
    const date = lastCommitISO(`${DOCS_DIR}/${file}`)
    if (date) map.set(`${origin}/docs/${slug}`, date)
  }

  return map
}
