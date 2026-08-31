# Archived tasks

Archiving moves a task out of your active views without deleting it. Use it for finished work you want out of the way but not gone — or for tasks you've cancelled and might want to revisit later.

## Archive vs. delete

| | Archive | Delete |
|---|---|---|
| The file | Moved to the project's `_tasks/Archive/` | Permanently removed |
| Reversible | Yes — unarchive any time | Only via Obsidian's file-recovery / git |
| Shows in views | Hidden by default, toggleable | Gone |
| Searchable in vault | Yes (it's still a file) | No |
| Counts in project stats | No | No |

**Default to archive.** Delete only when you really want the file gone for good — e.g. test tasks, accidental duplicates, or sensitive content.

## How to archive

### From the task context menu

Right-click any task row (in the table, kanban, or gantt view) and choose **Archive**. The file moves to the project's `_tasks/Archive/` folder and the row disappears from active views.

A task never archives alone: its whole subtree moves with it, so a parent and its children stay together.

If a task is already archived, the menu shows **Unarchive** instead — which moves it back to the main `_tasks/` folder.

### In bulk

Select multiple tasks in the table view, then click **Archive** in the bulk action bar. Every selected task is moved to `Archive/` in one go. The bar also has **Unarchive** for the reverse direction. See [Bulk operations](15-bulk-operations.md).

## Where archived files live

For a project at `Projects/My Project/`:

- Active tasks: `Projects/My Project/_tasks/*.md`
- Archived tasks: `Projects/My Project/_tasks/Archive/*.md`

**Being in that folder is what archived means.** There's no `archived: true` field in the frontmatter — the plugin derives the state from the file's location every time it loads, and never writes it back.

So moving a file in or out of `Archive/` by hand is all it takes. Drag it out and the task is active again; there's no flag to keep in step.

## Showing archived tasks

By default, archived tasks are hidden from the table, kanban, and gantt views.

To see them:

- **Table view** — the filter bar has a **show archived** toggle. Turn it on to include archived rows (they render slightly dimmed). See [Table view](09-table-view.md).
- **Gantt view** — same toggle in the filter bar.
- **Kanban view** — same toggle.

The toggle is per-project and persists, so once you turn it on for a project, it stays on until you turn it off.

## Subtasks of archived parents

Archiving a parent archives its whole subtree in one move — every descendant's file goes to `Archive/` with it. Unarchiving does the reverse, bringing the branch back together.

You don't need to select the children yourself, and you can't archive a parent while leaving its subtasks in the active views.

## Auto-archive

Set **Settings → Project Manager → Archive → Auto-archive completed tasks** to 7, 14, 30, or 90 days and finished work moves itself out of the way that long after it was completed. `0` turns it off, which is the default. A project can set its own interval in its settings, so a support backlog can clear after a week while a research project keeps everything.

The sweep runs at most once a day, and it's careful about what it takes:

- A subtree moves as a unit. One unfinished descendant keeps the whole branch in place.
- A task with no completion date is never swept — there's nothing to measure its age against.
- A task that something still-active depends on waits until its dependents are archived too, so archiving never silently reschedules work you didn't touch.

**Archive completed tasks** in the command palette runs the same sweep immediately, using the same rules.

Prefer to do it by hand? Filter the table to a complete status, **select all**, **archive**.

## Where to go next

- [Bulk operations](15-bulk-operations.md) — archive many tasks at once.
- [Vault layout](04-vault-layout.md) — see exactly where archived files sit on disk.
- [Statuses and priorities](06-statuses-and-priorities.md) — archive is *not* a status; it's where the file sits.

## Tips

> Archive at the end of a sprint or release: filter to `done`, select all, archive. Your active board stays focused on what's next.

> If a project gets too crowded even with archive, consider splitting it — archive isn't a substitute for keeping projects scoped.

> Archived tasks don't disappear from Obsidian search. If you need to find a finished task to reference its description or comments, search across the vault as normal.
