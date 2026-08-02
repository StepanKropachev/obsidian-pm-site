// Each H2 becomes a question; the prose and list content until the next H2
// becomes the plain-text answer (markdown stripped, per schema.org guidance).

const stripInline = (text: string): string =>
  text
    // links / images: keep the visible text, drop the target
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    // bold / italic / inline code markers
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()

// H2s that are navigation rather than genuine questions.
const NON_FAQ = new Set(['Where to go next'])

export interface FaqEntry {
  question: string
  answer: string
}

const answerText = (lines: string[]): string => {
  const out: string[] = []
  let inFence = false
  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence || line === '' || line.startsWith('#') || line.startsWith('![')) continue
    // Drop leading list markers, ordered-list numbers, and blockquote arrows.
    const text = stripInline(line.replace(/^([-*]|\d+\.)\s+/, '').replace(/^>\s?/, ''))
    if (text) out.push(text)
  }
  return out.join(' ')
}

export function faqEntriesFromBody(body: string): FaqEntry[] {
  const lines = body.replace(/^---\n[\s\S]*?\n---\n/, '').split('\n')
  const entries: FaqEntry[] = []
  let current: { question: string; lines: string[] } | null = null

  const flush = () => {
    if (!current) return
    if (!NON_FAQ.has(current.question)) {
      const answer = answerText(current.lines)
      if (answer) entries.push({ question: current.question, answer })
    }
    current = null
  }

  for (const raw of lines) {
    const h2 = raw.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      flush()
      current = { question: stripInline(h2[1]), lines: [] }
      continue
    }
    if (current) current.lines.push(raw)
  }
  flush()
  return entries
}

export function faqPageJsonLd(body: string): object | null {
  const entries = faqEntriesFromBody(body)
  if (entries.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: e.answer,
      },
    })),
  }
}
