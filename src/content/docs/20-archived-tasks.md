# Archived tasks

Archiving moves a task out of your active views without deleting it. Use it for finished work you want out of the way but not gone — or for tasks you've cancelled and might want to revisit later.

> [GIF: right-click task → archive → row disappears → toggle "show archived" → it reappears greyed out.]

## Archive vs. delete

| | Archive | Delete |
|---|---|---|
| The file | Moved to `<project>_tasks/Archive/` | Permanently removed |
| Reversible | Yes — unarchive any time | Only via Obsidian's file-recovery / git |
| Shows in views | Hidden by default, toggleable | Gone |
| Searchable in vault | Yes (it's still a file) | No |
| Counts in project stats | No | No |

**Default to archive.** Delete only when you really want the file gone for good — e.g. test tasks, accidental duplicates, or sensitive content.

## How to archive

### From the task context menu

Right-click any task row (in the table, kanban, or gantt view) and choose **Archive**. The file is moved to the project's `Archive/` subfolder and the row disappears from active views.

If a task is already archived, the menu shows **Unarchive** instead — which moves it back to the main `_tasks/` folder.

### In bulk

Select multiple tasks in the table view, then click **Archive** in the bulk action bar. Every selected task is moved to `Archive/` in one go. The bar also has **Unarchive** for the reverse direction. See [Bulk operations](15-bulk-operations.md).

## Where archived files live

For a project at `Projects/My Project.md`:

- Active tasks: `Projects/My Project_tasks/*.md`
- Archived tasks: `Projects/My Project_tasks/Archive/*.md`

Inside each archived task file, the frontmatter gains:

```yaml
archived: true
```

That flag is what the plugin uses to decide whether a task is "archived" — the folder location is mostly for tidiness in the file explorer. If you manually move a file in or out of `Archive/`, also flip the `archived:` flag in its frontmatter, or the views will get out of sync.

## Showing archived tasks

By default, archived tasks are hidden from the table, kanban, and gantt views.

To see them:

- **Table view** — the filter bar has a **show archived** toggle. Turn it on to include archived rows (they render slightly dimmed). See [Table view](09-table-view.md).
- **Gantt view** — same toggle in the filter bar.
- **Kanban view** — same toggle.

The toggle is per-project and persists, so once you turn it on for a project, it stays on until you turn it off.

## Subtasks of archived parents

Archiving a parent task does **not** automatically archive its subtasks. Each task's `archived` flag is independent. If you want a whole branch archived:

1. Expand the parent.
2. Select the parent and all its subtasks (Shift-click in the table).
3. Bulk **Archive**.

Same applies to unarchiving — bring the parent and its children back together.

## Auto-archive on completion?

Not currently. Tasks stay in active views when you mark them `done` — you have to archive them yourself (individually or in bulk). The most common workflow is: filter the table to status = `done`, **select all**, **archive**.

## Where to go next

- [Bulk operations](15-bulk-operations.md) — archive many tasks at once.
- [Vault layout](04-vault-layout.md) — see exactly where archived files sit on disk.
- [Statuses and priorities](06-statuses-and-priorities.md) — archive is *not* a status; it's a separate flag.

## Tips

> Archive at the end of a sprint or release: filter to `done`, select all, archive. Your active board stays focused on what's next.

> If a project gets too crowded even with archive, consider splitting it — archive isn't a substitute for keeping projects scoped.

> Archived tasks don't disappear from Obsidian search. If you need to find a finished task to reference its description or comments, search across the vault as normal.
