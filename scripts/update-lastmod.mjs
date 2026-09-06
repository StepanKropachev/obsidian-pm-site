/**
 * Regenerates `src/lib/docs-lastmod.json` from git history.
 *
 * Run this after editing page content, then commit the JSON alongside it:
 *
 *     node scripts/update-lastmod.mjs
 *
 * Deliberately NOT part of `astro build`. The build runs on Cloudflare from a
 * depth-1 clone, where `git log -1 -- <path>` reports the tip commit for every
 * file that exists — so building the map there stamps every page with the
 * deploy time and tells Google the whole site changed at once. Reading a
 * checked-in map keeps the sitemap identical wherever it is built.
 *
 * A date that has gone stale because someone forgot to rerun this only costs
 * some crawl freshness. A date that moves on every deploy teaches Google to
 * ignore `lastmod` sitewide, so staleness is the failure we choose.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, writeFileSync } from 'node:fs'

const DOCS_DIR = 'src/content/docs'
const HOME_SOURCE = 'src/pages/index.astro'
const OUT = 'src/lib/docs-lastmod.json'

if (execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true') {
  console.error('Refusing to run in a shallow clone: every path would resolve to the tip commit.')
  console.error('Run `git fetch --unshallow` first.')
  process.exit(1)
}

function lastCommitISO(path) {
  const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
    encoding: 'utf8',
  }).trim()
  return out || null
}

const map = {}

const home = lastCommitISO(HOME_SOURCE)
if (home) map['/'] = home

for (const file of readdirSync(DOCS_DIR).sort()) {
  if (!file.endsWith('.md')) continue
  // `01-install.md` -> `install`; the numeric prefix only orders the files.
  const slug = file.replace(/\.md$/, '').replace(/^\d+-/, '')
  const date = lastCommitISO(`${DOCS_DIR}/${file}`)
  if (date) map[`/docs/${slug}`] = date
}

const distinct = new Set(Object.values(map)).size
if (distinct === 1 && Object.keys(map).length > 1) {
  console.error(`Refusing to write: all ${Object.keys(map).length} pages resolved to one date.`)
  console.error('That is the shallow-clone signature; the history here looks incomplete.')
  process.exit(1)
}

writeFileSync(OUT, JSON.stringify(map, null, 2) + '\n')
console.log(`Wrote ${OUT}: ${Object.keys(map).length} pages, ${distinct} distinct dates.`)
