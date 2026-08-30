# How the data model works

The data model is small: a project is a container, a task is a unit of work. Each gets its own markdown file. Statuses, dependencies, custom fields, saved views, hierarchy — all of it hangs off those two.

If you've already followed the onboarding ([Create a project](/docs/first-project), [Create your first task](/docs/first-task)), this is the why behind what you saw on disk.

## What a project is

A project is a markdown note with `pm-project: true` in its frontmatter, sitting in a folder of the same name. Beyond identity — title, icon, color, description — the note holds:

- **Task IDs.** The ordered list of top-level tasks. That order is what the table shows before you sort.
- **Custom field definitions.** See [Custom fields](/docs/custom-fields).
- **Saved views.** Filter, sort, and view-mode combinations belonging to this project.
- **Team members.** The per-project assignee list, on top of the global one.
- **A parent link.** A wikilink to another project's note, if this one is nested.
- **A config block.** Only the settings this project overrides. Projects that override nothing don't have one.

Projects have no status, priority, or dates of their own. They're containers; the timeline comes from the tasks inside.

## What a task is

A task is a markdown file with `pm-task: true` in its frontmatter, inside a project's `_tasks/` folder. Every task carries:

- **Title**, and a **description** — the markdown body of the file.
- **Status**, from its project's workflow. See [Statuses and priorities](/docs/statuses-and-priorities).
- **Priority**, from its project's scale.
- **Start and due dates**, `YYYY-MM-DD`, both optional.
- **Progress**, 0 to 100, set directly or rolled up from subtasks.
- **Assignees and tags.**
- **A parent ID and subtask IDs**, and **dependencies**. See [Subtasks and dependencies](/docs/subtasks-and-dependencies).
- **Type** — `task` or `milestone`. Milestones are zero-duration and render as diamonds on the timeline.
- **A completed date**, once it lands in a terminal status. The views use it to say whether the task finished on time or how many days late.
- **Custom field values**, whatever its project defines.
- **A time estimate and time logs.** See [Time tracking](/docs/time-tracking).
- **Recurrence**, if it repeats.

A task can nest as deep as you like. There's no separate "subtask" thing — a subtask is a task whose parent ID points at another task.

## Where the hierarchy lives

Projects nest through the `parent` wikilink in the project note. Creating a sub-project puts its folder inside the parent's folder, which keeps the vault tidy, but the link is what the plugin reads. Move the folder and the relationship holds. A link pointing at a project that no longer exists, or one that closes a loop, is ignored and the project is treated as top-level.

Tasks nest through IDs instead: a parent ID on the child, a list of subtask IDs on the parent. Nesting has no bearing on where the file sits — every task in a project, at every depth, is a flat file in `_tasks/`.

Dependencies are IDs too, and they're resolved against the whole vault rather than one project's tree. That's what lets a task depend on work in another project. See [Working across projects](/docs/multi-project-views).

## Why one file per task

Three reasons:

**Git-friendly.** One change touches one file. Diffs are tiny and merges almost never conflict.

**Sync-friendly.** Obsidian Sync, iCloud, Dropbox, Syncthing — they all move file-shaped things between devices. Two devices editing two different tasks means two different files, and nothing to merge.

**Hand-editable.** You can grep your tasks. You can script against them. You can open one in any editor without launching Obsidian.

The trade-off: a project with a thousand tasks is a folder with a thousand files. Obsidian handles it fine, but file-explorer scrolling gets long. Most projects don't come close.

## Settings resolve per project

Statuses, priorities, priority icons, default view, auto-schedule, pull-forward, auto-archive, and the table and board display options all resolve the same way: **the project's own override if it has one, the vault settings otherwise**. A project's overrides don't reach its sub-projects — each project either overrides a setting or falls back to the global one.

**Custom fields are the exception.** They resolve down the chain: vault settings first, then each ancestor project root-most first, then the project's own. A field defined once at the top reaches everything underneath, and any project below can rename it, retype it, or hide it locally. See [Project overview and settings](/docs/project-overview).

Statuses and priorities that no list defines but tasks still use are kept visible anyway, so nothing vanishes from a board because a status was deleted out from under it.

## People

Assignees and members are picked from the person notes in your vault. A picked person is stored as a wikilink, so the task shows up in that note's backlinks and in the graph. Plain text still works — a name nobody has a note for stays a string.

The plugin treats a person written as a link, as an alias, and as plain text as one person, so filtering by assignee doesn't split someone across three spellings. **Link assignees to their person notes** converts typed names into links to notes of the same name.

Two lists feed every picker:

- **Global team members** — set under **Settings → Project Manager → Team members**. Available in every project.
- **Per-project members** — set on the project. Available in that project only, and shown on its overview.

They combine rather than replace, and the picker also offers anyone already assigned to a task in the project. There's no user system and no permissions; assignees are people you can filter on, click through to, and list with **Show tasks assigned to a person**.

## Tags

Free-form strings on a task, used for filtering and grouping, stored as a list in the task's frontmatter. They're separate from Obsidian's `#tag` system. A project's overview shows every tag its tasks use.

## Where to go next

- [Subtasks and dependencies](/docs/subtasks-and-dependencies) — nesting, blockers, and auto-schedule.
- [Custom fields](/docs/custom-fields) — field types and inheritance.
- [Vault layout](/docs/vault-layout) — exactly what gets stored where.

## Tips

Use a project per outcome, not per theme. "Launch v2 site" is a project. "Marketing" is not — that's a tag, or a parent project with real projects under it.

Global team members exist because the same people show up in most projects. Per-project members exist for the cases where they don't.
