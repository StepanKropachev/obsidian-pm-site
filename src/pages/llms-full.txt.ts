import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { docsNav } from '../lib/docs-nav'

// llms-full.txt — the entire documentation set concatenated into one plain
// markdown file so an AI system can ingest all of it in a single fetch.
// Generated from docsNav at build time, in nav order. The full set is well
// within a single context window (~16K tokens). Served at
// /llms-full.txt.

const SITE = 'https://dotpm.pm'

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs')
  const bodyByFilename = new Map(docs.map((d) => [d.id, d.body ?? '']))

  const parts: string[] = [
    '# Obsidian Project Manager — full documentation',
    '',
    '> Project management inside Obsidian — table, gantt, and kanban views over tasks stored as plain markdown (YAML frontmatter) in your vault. Local-first, no lock-in.',
  ]

  for (const group of docsNav) {
    for (const item of group.items) {
      const body = bodyByFilename.get(item.filename)
      if (!body) continue
      parts.push('', '', '---', '', `Source: ${SITE}/docs/${item.slug}`, '', body.trim())
    }
  }

  return new Response(`${parts.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
