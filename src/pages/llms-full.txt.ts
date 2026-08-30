import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { docsNav } from '../lib/docs-nav'

// Every doc concatenated in nav order, for ingestion in a single fetch.

const SITE = 'https://dotpm.pm'

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs')
  const bodyByFilename = new Map(docs.map((d) => [d.id, d.body ?? '']))

  const parts: string[] = [
    '# dotpm — full documentation',
    '',
    '> dotpm (formerly Obsidian Project Manager) is project management inside Obsidian — table, gantt, and kanban views over tasks stored as plain markdown (YAML frontmatter) in your vault. Local-first, no lock-in.',
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
