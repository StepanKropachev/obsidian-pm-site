import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { docsNav } from '../lib/docs-nav'
import { descriptionFromBody } from '../lib/doc-description'

// Convention: https://llmstxt.org

const SITE = 'https://dotpm.pm'

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs')
  const bodyByFilename = new Map(docs.map((d) => [d.id, d.body ?? '']))

  const lines: string[] = [
    '# dotpm',
    '',
    '> dotpm (formerly Obsidian Project Manager) is project management inside Obsidian — table, gantt, and kanban views over tasks stored as plain markdown (YAML frontmatter) in your vault. Local-first, no lock-in.',
    '',
    '## Start here',
    `- [Landing page](${SITE}/): what the plugin does, screenshots, and install links.`,
    `- [Documentation](${SITE}/docs): full user guide.`,
    `- [Full docs as one file](${SITE}/llms-full.txt): every doc page concatenated for direct ingestion.`,
    '',
  ]

  for (const group of docsNav) {
    lines.push(`## ${group.title}`)
    for (const item of group.items) {
      const desc = descriptionFromBody(bodyByFilename.get(item.filename) ?? '')
      const suffix = desc ? `: ${desc}` : ''
      lines.push(`- [${item.title}](${SITE}/docs/${item.slug})${suffix}`)
    }
    lines.push('')
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
