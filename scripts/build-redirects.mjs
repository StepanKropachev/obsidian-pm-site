import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'

// Turns a built `dist/` into a tree of redirect stubs for the retired GitHub
// Pages host. Every page the old site served gets a stub at the same path
// pointing to its dotpm.pm equivalent, so the path list is derived from the
// real build rather than a hand-maintained copy that would drift.
//
// GitHub Pages cannot issue a 301, so these use `meta http-equiv="refresh"`
// with a 0 delay plus rel=canonical. Google treats that pair as a permanent
// redirect for indexing purposes.

const SRC = 'dist'
const OUT = 'redirect-dist'
const TARGET = 'https://dotpm.pm'

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const found = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return htmlFiles(full)
      return entry.name.endsWith('.html') ? [full] : []
    })
  )
  return found.flat()
}

function sitePath(file) {
  const rel = relative(SRC, file).split('\\').join('/')
  const stripped = rel.replace(/index\.html$/, '').replace(/\.html$/, '')
  return `/${stripped}`.replace(/\/{2,}/g, '/')
}

function stub(destination) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved to ${destination}</title>
<link rel="canonical" href="${destination}">
<meta http-equiv="refresh" content="0;url=${destination}">
</head>
<body>
<p>This page has moved to <a href="${destination}">${destination}</a>.</p>
</body>
</html>
`
}

const files = await htmlFiles(SRC)
await Promise.all(
  files.map(async (file) => {
    const destination = `${TARGET}${sitePath(file)}`
    const out = join(OUT, relative(SRC, file))
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, stub(destination))
  })
)

// Crawlers must be able to fetch the stubs to see the redirect, so no sitemap
// here — the old host should not advertise URLs, only forward them.
await writeFile(join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\n')

console.log(`wrote ${files.length} redirect stubs to ${OUT}/`)
