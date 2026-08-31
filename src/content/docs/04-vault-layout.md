# Vault layout

Everything dotpm creates is plain markdown in your vault. No database, no hidden state. Each project owns a folder, and everything belonging to that project lives inside it.

## The layout

```
Your Vault/
├── Projects/
│   ├── Website Redesign/
│   │   ├── Website Redesign.md          project note: settings and metadata
│   │   └── _tasks/
│   │       ├── audit-current-site.md    one file per task
│   │       ├── new-homepage-copy.md
│   │       ├── new-homepage-copy/
│   │       │   └── attachments/         files pasted into that task
│   │       │       └── Pasted-20260830-114233.png
│   │       └── Archive/
│   │           └── old-task.md          archived tasks
│   └── Platform/
│       ├── Platform.md
│       ├── _tasks/
│       ├── API v2/                      a sub-project, inside its parent
│       │   ├── API v2.md
│       │   └── _tasks/
│       └── Billing/
│           ├── Billing.md
│           └── _tasks/
└── People/
    ├── Ada Lovelace.md                  person notes, linked from assignees
    └── Grace Hopper.md
```

## The project folder

A project owns the folder named after it. Inside: the project note under the same name, a `_tasks/` folder, and a folder per sub-project.

The plugin doesn't care where that folder sits. Projects are listed wherever their files are, so you can file `Platform/` under `Work/`, `02 Areas/`, or the vault root and it stays in the list. Three settings shape this:

- **New project folder** — where newly created top-level projects go. Default `Projects`. Empty means the vault root.
- **Excluded folders** — folders the plugin doesn't look in at all.
- **People folder** — where person notes are looked for and created. Default `People`. Empty searches the whole vault.

If the list ever disagrees with the vault after a lot of moving, run **Rebuild project index**.

## The project note

`<Project name>.md`, inside the folder of the same name. Its frontmatter carries:

- `pm-project: true` — the marker the plugin looks for.
- Identity: `id`, `title`, `description`, `icon`, `color`.
- `taskIds` — top-level tasks in order. That order is the table's order before you sort.
- `parent` — a wikilink to the parent project's note, on a sub-project only.
- `customFields`, `teamMembers`, `savedViews`, `createdAt`, `updatedAt`.
- `config` — only the settings this project overrides. A project that overrides nothing has no `config` block at all.

The body has a heading and a `## Tasks` section of wikilinks, checked off as tasks finish. The plugin keeps that section in sync; edit the frontmatter, not the list.

## The tasks folder

`_tasks/`, created with the project. One file per task, including subtasks at any depth — nesting lives in the frontmatter, not in the folder structure.

Files are named `<slug>.md`: the title lowercased, with whitespace hyphenated and the characters a filesystem won't take — `\ / : * ? " < > |` — replaced by `-`, cut at 60 characters. Everything else survives, so `Fix API (v2)!` becomes `fix-api-(v2)!.md`. Rename a task and the file follows.

If a new task's slug collides with a file already in that project, the editor shows an inline error and the task won't save until the title changes.

Tasks created before version 2 keep their old names — the 40-character cap, or the `<slug>-<id>.md` form from before version 1.5 — until you change the title.

### Archive

`_tasks/Archive/`. Being in that folder is what archived means; there's no separate flag. Archived tasks are hidden from the views unless you turn on **Show archived** in the filter bar, don't trigger notifications, and are skipped by auto-schedule and by dependency arrows.

To restore one, drag the file out of `Archive/`, or use bulk **Unarchive**.

Tasks land here on their own if auto-archive is set, globally or on the project. **Archive completed tasks** does the same sweep on demand.

### Attachments

Paste or drop a file into a task's description and it's written to `_tasks/<task slug>/attachments/`, beside that task rather than in the vault's default attachment folder. The folder travels with the task when it's renamed, archived, or moved to another project.

## Sub-projects

A new sub-project's folder is created inside its parent's. That's where it lands, not what makes it a child — the hierarchy comes from the `parent` wikilink in the frontmatter. Move a sub-project's folder somewhere else and it stays a sub-project; clear the link and it becomes a top-level project wherever it sits.

A `parent` link that points at a missing project, or one that closes a loop, is ignored and the project is treated as a root.

## Upgrading from version 1

Version 1 kept a project as a loose note beside a `<Name>_tasks/` folder. On the first launch after upgrading, every project moves into a folder of its own — note and tasks together — and open tabs, filters, and saved views follow the move. It's idempotent, so a run interrupted halfway finishes on the next launch.

## Editing by hand

Open any of these files in Obsidian, or any other editor, and change the frontmatter. Two rules:

1. Task IDs must be unique. Don't copy a task file without changing its `id`.
2. Dates are `YYYY-MM-DD`. An empty string means unset; don't write `null`.

The plugin re-reads files on vault change events, so hand edits show up right away.

Moving a whole project to another vault means copying its folder — note, `_tasks/`, and any sub-project folders. Everything inside references everything else by ID, so the new location doesn't matter.

## Where to go next

- [How the data model works](/docs/projects-and-tasks) — what each field means.
- [Create a project](/docs/first-project) — parents, renaming, deleting.
- [Archived tasks](/docs/archived-tasks) — auto-archive and restoring.

## Tips

One file per task is what keeps sync conflicts rare. Two devices editing two tasks are editing two files, and there's nothing to merge.

Renaming a project from its settings page renames the note and its folder together. So does renaming the note in Obsidian's file explorer — the folder follows it. Drag the note somewhere else entirely and its `_tasks/` folder goes along as a sibling, so the pair never comes apart.
