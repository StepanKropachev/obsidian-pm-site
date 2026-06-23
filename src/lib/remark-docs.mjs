import { visit } from 'unist-util-visit'

export function rewriteDocsLinks({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '')
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (!node.url) return
      const m = node.url.match(/^(?:\.\/)?(?:\d+-)?([a-z0-9-]+)\.md(#.*)?$/i)
      if (m) {
        node.url = `${prefix}/docs/${m[1]}${m[2] || ''}`
      }
    })
  }
}

export function transformPlaceholders({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '')
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!parent || index === undefined) return
      const firstChild = node.children?.[0]
      if (firstChild?.type !== 'paragraph') return
      const text = collectText(firstChild)
      const m = text.match(/^\[(Screenshot strip|Screenshot|Video|GIF|Diagram)([^\]]*)\]\s*$/i)
      if (!m) return

      const kind = m[1].toLowerCase().split(' ')[0]
      const detail = (m[2] || '').replace(/^[:,]\s*/, '').trim()
      const labelMap = { screenshot: 'Screenshot', video: 'Video', gif: 'GIF', diagram: 'Diagram' }
      const label = labelMap[kind] || m[1]

      // If the detail ends in a media filename (optionally "alt | file.ext"),
      // render the real asset from /demos instead of a placeholder.
      const fileMatch = detail.match(/^(?:(.*?)\s*\|\s*)?([\w./-]+\.(?:mp4|webm|gif|png|jpe?g|webp))$/i)
      if (fileMatch) {
        const alt = (fileMatch[1] || label).trim()
        const file = fileMatch[2]
        const src = /^https?:|^\//.test(file) ? file : `${prefix}/demos/${file}`
        const isVideo = /\.(mp4|webm)$/i.test(file)
        const media = isVideo
          ? `<video src="${escapeHtml(src)}" autoplay muted loop playsinline aria-label="${escapeHtml(alt)}"></video>`
          : `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`
        parent.children.splice(index, 1, { type: 'html', value: media })
        return
      }

      const html = `<div class="doc-placeholder" data-kind="${kind}"><span class="doc-placeholder-label">${escapeHtml(label)}</span><span class="doc-placeholder-desc">${escapeHtml(detail || 'Visual asset placeholder.')}</span></div>`
      parent.children.splice(index, 1, { type: 'html', value: html })
    })
  }
}

function collectText(node) {
  if (node.type === 'text') return node.value
  if (!node.children) return ''
  return node.children.map(collectText).join('')
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
