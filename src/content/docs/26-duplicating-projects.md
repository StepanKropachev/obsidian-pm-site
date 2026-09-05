# Duplicating projects

**Duplicate project** copies a project and everything in it — settings, tasks, subtasks, milestones, dependencies — into a new project. It's the closest thing to a project template: set one project up the way you want it, then duplicate it for every client, release, or onboarding that follows.

> [Video: Duplicating a project — the ⋯ menu on a project row, the name dialog, then the copy opening on its own overview with the same description, milestones, members and task tree | projects-duplicate.mp4]

## Making a copy

1. Open the project list.
2. Hover the project's row and open its **⋯** menu, or right-click the row.
3. Pick **Duplicate project**.
4. The dialog reads *Duplicate "Name" as*. The name comes pre-filled as `Name copy` and already selected, so type straight over it and hit **OK**.

The copy opens on its own overview right away, and takes its place in the project list next to the original.

## What's copied

**Project settings** — icon, color, description, members, tags, and the custom fields defined on the project.

**Every task in the project**, with its subtasks: statuses, priorities, assignees, progress, dates, estimates, and custom field values.

**Milestones**, on their original dates.

**Dependencies between the copied tasks.** The whole task set moves at once, so the links between those tasks survive. That's where this differs from **Duplicate task** in the table view, which drops dependencies because the task on the other end of the arrow isn't part of a one-task copy. See [Table view](09-table-view.md).

## What isn't

**Sub-projects.** Duplicating a parent copies that project and the tasks that sit in it directly. Its children stay where they are, and none of their tasks come along. To copy a child, duplicate the child.

## A copy, not a reset

The copy arrives in the state the original was in — same statuses, same progress, same due dates. Half-finished work stays half-finished, and anything overdue in the original is overdue in the copy.

That's what you want when you're forking a live project. When you're starting from a template it's one pass through [Bulk operations](15-bulk-operations.md): select all, set the status back to `todo`, clear the dates.

## Using a project as a template

Build the template once: the task tree, the subtasks, the dependencies, the estimates, the custom fields. Leave every status at `todo` and every due date empty, and there's nothing to undo on the other side. Each new run is then three steps.

1. Duplicate the template. Name the copy after the real thing.
2. If your templates live under a parent project, open **Edit project** on the copy and set **Parent** to move it where the work happens.
3. In the copy's table view, **select all**, then set the dates and assignees for this run.

## Where to go next

- [Project overview and settings](23-project-overview.md) — everything the copy carries over, and where to change it afterwards.
- [Bulk operations](15-bulk-operations.md) — reset statuses, dates and assignees across the copy in one pass.
- [Table view](09-table-view.md) — **Duplicate task**, for when one task is all you need.
- [Vault layout](04-vault-layout.md) — the copy is an ordinary project folder, yours to move or rename in Obsidian.

## Tips

> Prefix your templates so they sort together: `Template — onboarding`, `Template — release`. The duplicate dialog selects the whole name for you, so the real project name goes straight over the top.

> A duplicate is also how you try a restructure you're not sure about. Copy the project, tear the copy apart, keep it or throw it away. The original never moved.
