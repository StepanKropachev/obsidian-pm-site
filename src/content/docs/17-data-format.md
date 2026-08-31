# Data format

Both projects and tasks are markdown files with YAML frontmatter. This page documents every key the plugin writes, what type it holds, and when it appears.

If you want to hand-edit, script against, or migrate your data — this is the contract.

## Project file

Path: `<project folder>/<Project name>.md` — a project owns the folder named after it, and its note sits inside under the same name. Frontmatter marker: `pm-project: true`.

### Frontmatter schema

| Key | Type | Always present | Notes |
| --- | --- | --- | --- |
| `pm-project` | boolean | yes | Always `true`. The marker. |
| `id` | string | yes | Stable project ID. |
| `title` | string | yes | |
| `description` | string | yes | Empty string if unset. |
| `color` | string | yes | Hex color, e.g. `#5ba0e2`. |
| `icon` | string | yes | Emoji. |
| `taskIds` | string[] | yes | Top-level task IDs, in display order. |
| `parent` | string | no | Wikilink to the parent project's note. Present only on a sub-project. |
| `customFields` | array | yes | See **Custom field definitions** below. Empty array if none. |
| `teamMembers` | string[] | yes | Per-project assignee list. Empty if none. |
| `savedViews` | array | yes | See **Saved views** below. Empty if none. |
| `createdAt` | string | yes | ISO 8601 timestamp. |
| `updatedAt` | string | yes | ISO 8601 timestamp. |
| `config` | object | no | Only the settings this project overrides. Omitted entirely when it overrides nothing. See **Project config** below. |

### Example

```yaml
---
pm-project: true
id: "p_a4f3c1"
title: "Website Redesign"
description: "Q3 site refresh"
color: "#5ba0e2"
icon: "🎨"
taskIds:
  - "t_111111"
  - "t_222222"
customFields:
  - id: "contract_value"
    name: "Contract value"
    type: "number"
teamMembers:
  - "Stepan"
  - "Jason"
savedViews:
  - id: "v_a1b2"
    name: "My open items"
    filter:
      text: ""
      statuses: ["todo", "in-progress"]
      priorities: []
      assignees: ["Stepan"]
      tags: []
      dueDateFilter: "any"
      showArchived: false
    sortKey: "due"
    sortDir: "asc"
    viewMode: "table"
createdAt: "2026-05-01T10:00:00.000Z"
updatedAt: "2026-05-23T14:31:02.000Z"
---

# 🎨 Website Redesign

Q3 site refresh

## Tasks
- [ ] [[audit-current-site|Audit current site]]
- [x] [[new-homepage-copy|New homepage copy]]
```

The plugin regenerates the body from the frontmatter on every save — the heading, the description, and the `## Tasks` list, checked off against each task's status. Anything else you write there is lost. Put project prose in the `description` field instead.

### Project config

Present only for settings this project overrides. Any absent key falls back to the vault settings.

```yaml
config:
  statuses: [...]          # same shape as the global status list
  priorities: [...]        # same shape as the global priority list
  priorityIcons: "arrows"  # chevrons | signal | arrows | alerts | none
  hiddenCustomFields: ["sprint"]   # inherited field ids this project leaves out
  defaultView: "gantt"     # table | gantt | kanban
  autoSchedule: true
  pullForwardOnEarlyFinish: false
  autoArchiveDays: 30
  showSubtreeConnections: true
  lineBorders: "horizontal"        # none | horizontal | vertical | both
  kanbanShowSubtasks: false
  kanbanShowDescriptionPreview: false
```

## Task file

Path: `<project folder>/_tasks/<slug>.md`. Frontmatter marker: `pm-task: true`.

### File naming

`<slug>.md`, where the slug is the title with the characters a filesystem won't take — `\ / : * ? " < > |` — replaced by `-`, then lowercased, whitespace turned to hyphens, and cut at 60 characters. Everything else survives, so `Fix API (v2)!` becomes `fix-api-(v2)!.md`.

Example: `audit-current-site.md`.

Slug collisions within the same project are rejected: the task editor shows an inline error and won't save until the title is changed. Tasks created before version 2 keep their old filenames — the 40-character cap, or the `<slug>-<short-id>.md` form from before version 1.5 — until the title changes.

### Frontmatter schema

| Key | Type | Always present | Notes |
| --- | --- | --- | --- |
| `pm-task` | boolean | yes | Always `true`. The marker. |
| `projectId` | string | yes | The owning project's ID. |
| `parentId` | string \| null | yes | Parent task's ID, or `null` for top-level. |
| `id` | string | yes | Stable task ID. |
| `title` | string | yes | |
| `type` | string | yes | `"task"` or `"milestone"`. |
| `status` | string | yes | Status ID, from the project's status list or the vault's. |
| `priority` | string | yes | Priority ID, from the project's priority list or the vault's. |
| `start` | string | yes | `YYYY-MM-DD` or `""` for unset. |
| `due` | string | yes | `YYYY-MM-DD` or `""` for unset. |
| `progress` | number | yes | 0–100. |
| `assignees` | string[] | yes | Names. Empty array if none. |
| `tags` | string[] | yes | Free-form tags. Empty if none. |
| `subtaskIds` | string[] | yes | Direct children's IDs. |
| `dependencies` | string[] | yes | IDs of tasks this task is blocked by. Resolved vault-wide, so they may point outside this project. |
| `createdAt` | string | yes | ISO 8601 timestamp. |
| `updatedAt` | string | yes | ISO 8601 timestamp. |
| `completed` | string | no | `YYYY-MM-DD`, stamped when the task lands in a complete status. Omitted until then. |
| `recurrence` | object | no | See **Recurrence** below. Omitted if not set. |
| `timeEstimate` | number | no | Hours. Omitted if unset. |
| `timeLogs` | array | no | See **Time logs** below. Omitted if empty. |
| `customFields` | object | no | Per-field values. Omitted if empty. |

The markdown body of the file is the task's **description**.

### Example

```yaml
---
pm-task: true
projectId: "p_a4f3c1"
parentId: null
id: "t_111111aabbcc"
title: "Audit current site"
type: "task"
status: "in-progress"
priority: "high"
start: "2026-05-20"
due: "2026-05-30"
progress: 40
assignees:
  - "Stepan"
tags:
  - "discovery"
subtaskIds:
  - "t_111111aabbdd"
dependencies: []
timeEstimate: 10
timeLogs:
  - date: "2026-05-22"
    hours: 1.5
    note: "First pass"
customFields:
  contract_value: 4200
createdAt: "2026-05-15T08:00:00.000Z"
updatedAt: "2026-05-23T14:00:00.000Z"
---

Audit the existing site against the redesign brief. Flag anything that doesn't carry over.

Project: [[Website Redesign|Website Redesign]]

## Subtasks
- [ ] [[check-legacy-redirects|Check legacy redirects]]
```

The body is the task's **description**, followed by content the plugin generates on every save: a `Project:` wikilink (or `Parent:` on a subtask) and a `## Subtasks` list if it has children. Write your description above those; they're rewritten each time.

### What isn't in the file

**`collapsed`** — whether a task's subtree is folded in the table. It's per-device UI state, kept in the plugin's `data.json`, so toggling a chevron doesn't rewrite task files or produce a sync conflict.

**`archived`** — see **Archive** below.

## Custom field definitions

Inside a project's `customFields` array. One entry per field:

```yaml
- id: "contract_value"
  name: "Contract value"
  type: "number"
- id: "sprint"
  name: "Sprint"
  type: "multiselect"
  options:
    - "Q3"
    - "Q4"
    - "Mobile"
  icon: "🏃"
```

Allowed `type` values: `text`, `number`, `date`, `select`, `multiselect`, `person`, `checkbox`, `url`.

**Options** is required for `select` and `multiselect`.

## Custom field values

Stored on each task under `customFields`, keyed by field ID:

| Field type | Stored value |
| --- | --- |
| `text`, `url`, `select`, `person` | string |
| `number` | number |
| `date` | string (`YYYY-MM-DD`) |
| `checkbox` | boolean |
| `multiselect` | string[] |

If a field has no value on a task, the key is omitted.

## Recurrence

Optional on a task. Storing it marks the task as recurring and shows a badge; it doesn't generate the next occurrence. See [Recurring tasks](21-recurring-tasks.md).

```yaml
recurrence:
  interval: "weekly"     # daily / weekly / monthly / yearly
  every: 2               # every N intervals
  endDate: "2026-12-31"  # optional
```

## Time logs

Each entry:

```yaml
timeLogs:
  - date: "2026-05-22"     # YYYY-MM-DD
    hours: 1.5             # number
    note: "First draft"    # free-form string
```

## Saved views

Stored on the project (see project example above). Schema:

```yaml
- id: string
  name: string
  filter:
    text: string
    statuses: string[]
    priorities: string[]              # priority ids
    assignees: string[]
    tags: string[]
    dueDateFilter: "any"|"overdue"|"this-week"|"this-month"|"no-date"
    showArchived: boolean
  sortKey: "title"|"status"|"priority"|"assignees"|"due"|"progress"
  sortDir: "asc"|"desc"
  viewMode: "table"|"gantt"|"kanban"   # optional
```

## Archive

There is no `archived: true` field. A task is archived when its file is inside the project's `_tasks/Archive/` folder. The plugin derives a runtime flag from the file's location on load and never writes it back, so moving the file is the whole operation.

## What's safe to hand-edit

- Everything in the markdown body (the description).
- Any standard frontmatter field. The plugin re-reads on file change.
- Custom field values.

What to be careful with:

- **IDs.** Must be unique within a project. Don't copy a file without changing its `id`.
- **Status / priority IDs.** Should match the project's lists, or the vault's. An unknown one is kept and shown rather than silently remapped, but it won't carry a color or a completion flag.
- **Date format.** Always `YYYY-MM-DD`. Use `""` (empty string), not `null`, for unset.

## Where to go next

- [Vault layout](04-vault-layout.md) — where these files sit.
- [How the data model works](05-projects-and-tasks.md) — what each field means at the model level.
- [TaskNotes integration](/docs/tasknotes) — what an imported TaskNotes task brings across.
