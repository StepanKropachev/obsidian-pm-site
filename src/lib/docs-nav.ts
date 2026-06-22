export interface DocItem {
  slug: string
  title: string
  filename: string
}

export interface DocGroup {
  title: string
  items: DocItem[]
}

export const docsNav: DocGroup[] = [
  {
    title: 'Getting started',
    items: [
      { slug: 'install', title: 'Install', filename: '01-install' },
      { slug: 'first-project', title: 'Create your first project', filename: '02-first-project' },
      { slug: 'first-task', title: 'Create your first task', filename: '03-first-task' },
      { slug: 'vault-layout', title: 'Vault layout', filename: '04-vault-layout' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { slug: 'projects-and-tasks', title: 'How the data model works', filename: '05-projects-and-tasks' },
      { slug: 'statuses-and-priorities', title: 'Statuses and priorities', filename: '06-statuses-and-priorities' },
      { slug: 'subtasks-and-dependencies', title: 'Subtasks and dependencies', filename: '07-subtasks-and-dependencies' },
      { slug: 'custom-fields', title: 'Custom fields', filename: '08-custom-fields' },
    ],
  },
  {
    title: 'Views',
    items: [
      { slug: 'table-view', title: 'Table view', filename: '09-table-view' },
      { slug: 'gantt-view', title: 'Gantt view', filename: '10-gantt-view' },
      { slug: 'kanban-view', title: 'Kanban view', filename: '11-kanban-view' },
    ],
  },
  {
    title: 'Power features',
    items: [
      { slug: 'saved-views', title: 'Saved views', filename: '13-saved-views' },
      { slug: 'time-tracking', title: 'Time tracking', filename: '14-time-tracking' },
      { slug: 'bulk-operations', title: 'Bulk operations', filename: '15-bulk-operations' },
      { slug: 'keyboard-shortcuts', title: 'Keyboard shortcuts', filename: '16-keyboard-shortcuts' },
      { slug: 'archived-tasks', title: 'Archived tasks', filename: '20-archived-tasks' },
      { slug: 'recurring-tasks', title: 'Recurring tasks', filename: '21-recurring-tasks' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { slug: 'settings-reference', title: 'Settings reference', filename: '12-settings-reference' },
      { slug: 'data-format', title: 'Data format', filename: '17-data-format' },
      { slug: 'importing-notes', title: 'Importing existing notes', filename: '19-importing-notes' },
    ],
  },
  {
    title: 'Troubleshooting',
    items: [
      { slug: 'faq', title: 'Troubleshooting and FAQ', filename: '18-faq' },
    ],
  },
]

export const docsBySlug = new Map(
  docsNav.flatMap((g) => g.items.map((it) => [it.slug, it] as const))
)

export const docsByFilename = new Map(
  docsNav.flatMap((g) => g.items.map((it) => [it.filename, it] as const))
)

export const docsGroupBySlug = new Map(
  docsNav.flatMap((g) => g.items.map((it) => [it.slug, g.title] as const))
)

export const allDocItems = docsNav.flatMap((g) => g.items)
