# Kanban view

The kanban view is for *moving work*. One column per status, one card per task. Drag a card across to change its status.

> [Video: A kanban walkthrough — dragging a card from to-do to in-progress, quick-adding at the bottom of a column, toggling show subtasks, and dragging a subtask card | kanban-walkthrough.mp4]

## Anatomy

- **One column per status**, in the order set under **Settings** → **Project Manager** → **Task fields** → **Statuses** — or the project's own status list, if it overrides them.
- With several projects in scope, the columns are every status used across them, and each card carries a colored project chip. See [Working across projects](/docs/multi-project-views).
- **One card per task** in each column.
- **Filter bar** above the board — text search, status / priority / assignee / tag pills, due-date filter, archived toggle, and saved views. Shared across table, gantt, and kanban.

Each card shows: title, a priority color rail, parent task name (if the card is a subtask and **Show subtasks** is on), a subtask progress badge (for parents with children), and logged time if any. Turn on **Show description preview** to give each card the first few lines of its description.

## Drag between columns

Drag any card to another column. The task's status updates on drop. If you drop on a column whose status is marked **complete**, the task is treated as done — notifications stop, auto-schedule stops shifting it.

## Quick-add per column

Each column has a **+** button at the bottom. Clicking creates a task pre-set to that column's status. Type a title, press **Enter**. The card appears at the bottom of the column.

## Showing subtasks as cards

By default, only top-level tasks appear on the board — subtasks are hidden, but their progress feeds a badge on the parent card.

Turn on **Settings** → **Project Manager** → **Board** → **Show subtasks** to show subtasks as their own cards. The parent card still shows; the subtasks are independent cards that can be dragged separately.

A project can override this in its own settings, so one board can show subtasks while the rest don't.

## Filtering

The filter bar above the board is the same one shared across views — text search, status / priority / assignee / tag, due-date filter, archived toggle. Filter state persists per project across reloads.

The status filter still applies on kanban — hiding a status hides its entire column. (If that's not what you want, use the table view and filter by other categories.)

## Context menu

Right-click a card for actions: open, archive, delete, set priority, set assignee, etc.

## Where to go next

- [Statuses and priorities](06-statuses-and-priorities.md) — customize columns by reordering or editing statuses.
- [Working across projects](/docs/multi-project-views) — one board over several projects.
- [Settings reference](12-settings-reference.md) — the board toggles.

## Tips

> Kanban + filter by assignee = personal queue. Filter once, see your work, drag across as you finish.

> If your board feels cluttered, turn "show subtasks on board" off and use the table when you need to see the breakdown. The board is best when it's high-level outcomes per column.
