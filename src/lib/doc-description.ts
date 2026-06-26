// Derive a meta description from a doc's markdown body: the first real
// paragraph after the H1, with markdown stripped and trimmed to a length
// search engines will actually show (~155 chars). Falls back to '' when a
// page has no prose intro, so the caller can use a sensible default.

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
      // Skip headings, images, blockquotes, code fences, list markers,
      // and blank lines until we reach the first prose line.
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
    // Once collecting, a blank line ends the paragraph.
    if (line === '') break
    paragraph.push(line)
  }

  const text = stripInline(paragraph.join(' '))
  if (text.length <= MAX) return text

  // Trim to the last word boundary before the limit, then add an ellipsis.
  const clipped = text.slice(0, MAX)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : MAX).trim()}…`
}
