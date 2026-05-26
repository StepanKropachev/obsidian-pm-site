# Subtasks and dependencies

Two ways to link tasks. **Subtasks** are about breakdown — a parent contains children. **Dependencies** are about order — one task is blocked by another.

> [GIF: open task modal → subtasks panel → add a subtask → save → table shows the parent expanded with a child row.]

## Subtasks

Open any task and use the **subtasks** panel in the modal to add children. Nesting can go any depth — subtasks of subtasks of subtasks. There's no "subtask" type internally; a subtask is just a task whose `parentId` points at another task.

### Adding subtasks

1. Open a task.
2. In the **subtasks** panel, click **+ add subtask**.
3. Type a title and press **Enter**.

The new subtask is a real task file in the same `_tasks/` folder, with its `parentId` set to the parent's ID.

You can also use the command palette: **Create new subtask** prompts for the parent and creates a subtask under it.

### Progress rollup

A parent task's `progress` is computed from its children:

- If a task has subtasks, its progress is the average of its children's progress (which themselves roll up).
- If a task has no subtasks, its progress is whatever you set on it directly.

Setting progress manually on a parent that *has* subtasks is allowed, but the rollup will overwrite it next time anything in the tree changes.

### Collapsing

Each task has a `collapsed` flag that controls whether its subtasks are hidden in the table and kanban (when "show subtasks on board" is on). Click the chevron next to a parent row to toggle.

## Dependencies

A dependency is a "this task is blocked by these tasks" link. Open a task and use the **dependencies** field to add task IDs.

### Why dependencies matter

1. They show up as **arrows in the gantt view** — predecessor → dependent.
2. **Auto-schedule** uses them to shift dependent dates when a predecessor moves.

There's no "blocks" inverse field in storage — the relationship is stored once, on the dependent side, and the plugin computes the reverse when rendering.

## Auto-schedule

When **Auto-schedule** is on (Settings → Project Manager → Scheduling), changing a task's dates ripples to its dependents:

- For a normal task with both start and due dates: duration is preserved. If the new earliest-start (one day after the latest predecessor's due) is later than the current start, both dates shift forward by the same amount.
- For a milestone (only due is set): the milestone's due moves to one day after the latest predecessor's due.
- For a task with only one of start or due: that single date moves to the earliest-start.
- Archived predecessors are skipped — they don't trigger any cascade.
- Tasks whose status is marked complete are skipped — they aren't shifted, and they don't push dependents.

The plugin only shifts dates *forward*. If a predecessor moves earlier, dependents stay put.

If your graph has a cycle, the affected tasks are skipped rather than rescheduled into oblivion.

## Where to go next

- [Gantt view](10-gantt-view.md) — see dependency arrows visually.
- [Settings reference](12-settings-reference.md) — the auto-schedule toggle.

## Tips

> Subtasks vs. dependencies — use subtasks when work is *part of* a larger task, dependencies when work is *ordered after* another task. A subtask of "Launch v2" might be "Write release notes". A dependency of "Launch v2" might be "Sign off from legal."

> Auto-schedule is off-by-default-safe — it only moves dates forward and never deletes anything. Turn it off if you want full manual control.
