const author = {
  '@type': 'Person',
  name: 'Stepan Kropachev',
  url: 'https://github.com/StepanKropachev',
} as const

export interface DocsJsonLdInput {
  title: string
  description?: string
  // Absolute canonical URL of this doc page.
  url: string
  // Absolute site origin, no trailing slash.
  siteHome: string
}

export function techArticleJsonLd(input: DocsJsonLdInput): object {
  const { title, description, url, siteHome } = input
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    ...(description ? { description } : {}),
    url,
    inLanguage: 'en',
    author,
    publisher: author,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Obsidian Project Manager',
      url: siteHome,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Obsidian Project Manager',
      applicationCategory: 'ProductivityApplication',
    },
  }
}

export function breadcrumbJsonLd(input: DocsJsonLdInput): object {
  const { title, url, siteHome } = input
  // The nav group is deliberately not a crumb: groups have no landing page,
  // and every breadcrumb item needs a resolvable URL.
  const items = [
    { name: 'Obsidian Project Manager', item: siteHome },
    { name: 'Docs', item: `${siteHome}/docs` },
    { name: title, item: url },
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
}
