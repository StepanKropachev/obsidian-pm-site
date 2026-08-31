# Statuses and priorities

Statuses and priorities are both fully customizable, per vault and per project. They're used everywhere — filters, sort order, kanban columns, the gantt left panel.

![The settings tab with the status list — color swatches and per-status controls](../../assets/screenshots/status-settings.png)

## Default statuses

| ID | Label | Marked as "done" |
| --- | --- | --- |
| `todo` | To Do | no |
| `in-progress` | In Progress | no |
| `blocked` | Blocked | no |
| `review` | In Review | no |
| `done` | Done | yes |
| `cancelled` | Cancelled | yes |

Each status has a label, a color (used for badges and the kanban column header), an optional icon, and a **complete** flag.

The complete flag matters for two behaviors:

- **Notifications** are suppressed for tasks whose status is marked complete.
- **Auto-schedule** ignores tasks whose status is marked complete when shifting dependent dates.

That's it. Status IDs themselves aren't special — the plugin doesn't hard-code "done" anywhere. The "done" *flag* is what counts.

## Customize statuses

Under **Settings** → **Project Manager** → **Task fields** → **Statuses**:

1. **Reorder** by dragging the handle on the left. Order in this list = order in kanban columns and the table view's status sort.
2. **Edit** the label, icon, or color by clicking on the row.
3. **Toggle the "complete" flag** for any status.
4. **Delete** a status with the trash icon.
5. **Add** a new status with **+ add status**.

## What happens when you delete a status

Tasks that were using the deleted status get remapped to the first status in the list. The mapping is automatic — no prompt, no migration step.

If you want to keep history clean, change those tasks' status manually *before* deleting.

## Priorities

Priorities work the same way, under **Settings** → **Project Manager** → **Task fields** → **Priorities**. Each has a **label**, a **color**, and an optional **icon**, and the list is reorderable.

Order is rank, highest first. It drives the sort order, and it decides which icon each priority gets from the icon set.

Ships with four: Critical, High, Medium, Low. Add, rename, recolor, and reorder them freely.

### Priority icons

A priority with no icon of its own borrows one from the set chosen under **Settings** → **Project Manager** → **Style** → **Priority icons**: chevrons, signal bars, arrows, alerts, or none. Icons are handed out by rank, so the top priority gets the strongest icon.

A scale longer than five leaves its lowest ranks without an icon. Give those a `#` emoji or a Lucide icon name of their own if you want one.

## Per-project overrides

Both lists are vault-wide defaults. A project can run its own instead — open **Edit project** → **Statuses** or **Priorities** and turn on the override. The project gets a copy of the global list to edit however it likes.

The override is per project, not per subtree: a sub-project keeps using the global lists unless you turn its own on too. Turn the toggle back off and the project returns to the global list.

A status or priority that no list defines any more, but that tasks still use, stays visible anyway — nothing vanishes from a board because an entry was removed out from under it.

## Where to go next

- [Kanban view](11-kanban-view.md) — one column per status.
- [Project overview and settings](/docs/project-overview) — turning on a project's own lists.
- [TaskNotes integration](/docs/tasknotes) — import statuses and priorities from TaskNotes.
- [Settings reference](12-settings-reference.md) — the full status and priority editors.

## Tips

> Keep the status list short. Five to seven is plenty. Long status lists mean long kanban scrolls and harder filtering.

> If you want a "won't fix" or "deferred" outcome, add a status with the "done" flag turned on. It'll behave like done for notifications and scheduling, without using the literal "Done" label.
