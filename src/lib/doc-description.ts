// Returns '' when a page has no prose intro, so callers can supply a default.

// Roughly where search engines truncate a description.
const MAX = 155

const stripInline = (text: string): string =>
  text
    // links / images: keep the visible text, drop the target
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    // bold / italic / inline code markers
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export function descriptionFromBody(body: string): string {
  const lines = body.replace(/^---\n[\s\S]*?\n---\n/, '').split('\n')
  const paragraph: string[] = []
  let started = false

  for (const raw of lines) {
    const line = raw.trim()
    if (!started) {
      // Skip non-prose until the first real paragraph.
      if (
        line === '' ||
        line.startsWith('#') ||
        line.startsWith('![') ||
        line.startsWith('>') ||
        line.startsWith('```') ||
        line.startsWith('- ') ||
        line.startsWith('* ') ||
        /^\d+\.\s/.test(line)
      ) {
        continue
      }
      started = true
    }
    if (line === '') break
    paragraph.push(line)
  }

  const text = stripInline(paragraph.join(' '))
  if (text.length <= MAX) return text

  const clipped = text.slice(0, MAX)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : MAX).trim()}…`
}
