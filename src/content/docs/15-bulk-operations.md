# Bulk operations

Select multiple tasks in the table view to act on all of them at once.

## Selecting tasks

In the table view:

- Click a row's **checkbox** to select.
- **Shift-click** another row's checkbox to select the range between.
- **Cmd/Ctrl-click** to add or remove a single row from the selection.
- Click **select all** in the header to select every visible row (filtered rows aren't included).

Subtask rows can be selected independently of their parent. Selecting a parent does *not* auto-select its subtasks — you have to select them yourself.

Archive is the exception: it always takes a task's whole subtree, selected or not.

## The bulk action bar

With at least one row selected, a bar appears with these actions:

- **Set status** — picks from the configured statuses.
- **Set priority** — picks from the configured priorities.
- **Set assignee** — assigns to one person, or **clear** to remove all assignees.
- **Set tag** — adds a tag, or **clear** to remove all tags.
- **Set due date** — applies the same date to all selected.
- **Set progress** — 0–100.
- **Set parent** — moves selected tasks to be subtasks of a chosen parent.
- **Remove parent** — promotes selected tasks to top-level.
- **Archive** — moves selected tasks to the project's `_tasks/Archive/` folder, each with its subtree.
- **Unarchive** — moves selected tasks out of `Archive/`.
- **Delete** — permanently removes selected tasks (files are deleted).

Each action writes to every selected task's file, one at a time. For very large selections this takes a moment — the UI stays responsive.

## What's *not* bulk-editable

- **Title and description** — these are per-task by nature.
- **Custom field values** — set per-task, since types differ. Sorry.
- **Dependencies** — also per-task.

## Undo

Most bulk actions are undoable via **undo last action** (command palette). Deletes are undoable too, as long as the file change is recent enough to be in the undo stack. Restart the plugin and the undo stack is gone.

### What's in the undo stack

The undo stack records writes the plugin makes to your task and project files. That covers:

- Inline edits in the table (title, status, priority, due, progress).
- Modal saves (any task edit through the task modal).
- Quick-add task creation.
- Bulk actions from the action bar (set status, archive, delete, the lot).
- Drag-to-reschedule in the gantt view, including auto-schedule ripple effects.
- Dependency links created in the gantt.

It does *not* cover:

- Settings changes (status list, custom field definitions, etc.).
- Files moved or renamed outside the plugin (Obsidian's own file explorer).
- Vault-level changes from other plugins.

### Lifetime

The stack lives in memory. It survives switching projects and switching views, but it does **not** survive:

- Reloading the plugin.
- Closing and reopening Obsidian.
- Disabling and re-enabling the plugin.

Once any of those happen, the stack starts empty — even an action you took 30 seconds ago is no longer undoable through the plugin. (Obsidian's own file-recovery may still help; see **Settings** → **File recovery**.)

### Redo

Mirrors undo. **Redo last action** in the command palette reapplies whatever undo just reversed. The redo stack clears the moment you take a new action — standard undo/redo semantics.

## Where to go next

- [Table view](09-table-view.md) — selection mechanics and the filter bar.

## Tips

> Filter first, then **select all** in the header — you'll often catch exactly the set you want without clicking each row.

> **Archive** beats **delete** unless you really want the file gone. Archived tasks are out of the way but still searchable and recoverable.
