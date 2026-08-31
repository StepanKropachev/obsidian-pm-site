# Troubleshooting and FAQ

The most common questions, in one place.

## My project doesn't show up in the project list

Projects are discovered vault-wide, wherever their files sit — the **New project folder** setting only decides where *new* ones are created, not where they're looked for. So check:

- The project note has `pm-project: true` in its frontmatter. That marker is the whole test.
- The folder it's in isn't listed under **Settings** → **Project Manager** → **Excluded folders**.
- If you've been moving a lot of files around, run **Rebuild project index** from the command palette.

If you opened an existing file with `pm-project: true` already in its frontmatter, run **Open current file as project** from the command palette to switch from the markdown editor into the project view. See [Importing existing notes](19-importing-notes.md) for how to add that marker and convert a note into a project.

## Why is every task a separate file?

Three reasons:

- **Git diffs are clean.** One change touches one file. No merge conflicts on a thousand-row task list.
- **Sync is conflict-free.** Two devices editing two different tasks edit two different files — nothing to reconcile.
- **You can grep it.** Plain markdown means every Unix-style tool works. So does the rest of your Obsidian setup (search, links, graph).

The trade-off is more files in your vault. Most projects don't approach the scale where this matters.

## I changed status colors but old tasks look wrong

Status colors and labels are read from the current **Settings** → **Statuses** every render. If a task still looks wrong, try:

1. Reload the plugin (settings → community plugins → toggle off/on).
2. Confirm the task's status ID matches one in your settings — or in the project's own status list, if it overrides the global one.

A status a task uses but no list defines is kept visible rather than dropped, so a renamed ID shows up as a status that never quite matches its settings entry. Re-add the ID, or bulk-set those tasks to a status that exists.

## Sync conflicts

The plugin is sync-friendly because each task is its own file. Conflicts only happen when:

- Two devices edit the *same task* before sync resolves.
- Two devices edit the *project file* (e.g. reordering tasks) simultaneously.

If you do get a conflict, treat the resulting `<file>.conflict-N.md` files like any other Obsidian sync conflict — diff, merge, delete the stale one.

## How do I back up?

Your vault *is* the backup target. Anything that backs up your vault (Obsidian Sync, iCloud, Time Machine, restic, git) backs up your project data too. No separate export needed.

## Mobile support

Yes — Obsidian's mobile apps run plugins. The plugin works on iOS and Android. Some interactions (gantt drag, multi-select with shift-click) are easier on desktop.

## Can I have multiple projects?

Yes. One project file per outcome. The project list shows all of them; switching is one click.

## How do I delete a project?

**Edit project** → the danger zone at the bottom, or right-click the project in the project list and pick **Delete project**. Either way the whole project folder goes to trash — note, tasks, and archive together.

The one exception is a project with a sub-project nested inside it: that child's folder survives, and only the parent's own note and `_tasks/` are removed.

## Where are my custom field values stored?

Inside each task's `customFields` map in its YAML frontmatter, keyed by field ID. See [Data format](17-data-format.md) for exact serialization per field type.

Deleting a field definition doesn't immediately delete values on existing tasks. The values stay in the YAML until the plugin next rewrites those task files (after any edit). If you re-add a field with the same ID before then, the values reappear.

## How do I report a bug?

File an issue on GitHub. Include:

- Your Obsidian version (Help → About).
- The plugin version (Settings → Community plugins → Project Manager).
- Steps to reproduce.
- A minimal sample if possible (a small project file + its task folder).

[Open an issue on GitHub](https://github.com/stepankropachev/obsidian-pm/issues) — link from the plugin's GitHub page.

## Where to go next

- [Data format](17-data-format.md) — the schema for hand-editing or scripting.
- [Vault layout](04-vault-layout.md) — where files live and how to move them.
- [Importing existing notes](19-importing-notes.md), [Archived tasks](20-archived-tasks.md), [Recurring tasks](21-recurring-tasks.md) — three workflows not covered in the main guide.
