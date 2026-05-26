# Kanban view

The kanban view is for *moving work*. One column per status, one card per task. Drag a card across to change its status.

> [Video, 30–60s: open kanban → drag a card from todo to in-progress → quick-add at the bottom of a column → toggle "show subtasks" → drag a subtask card.]

## Anatomy

- **One column per status**, in the order set under **Settings** → **Statuses**.
- **One card per task** in each column.
- **Filter bar** above the board — text search, status / priority / assignee / tag pills, due-date filter, archived toggle, and saved views. Shared across table, gantt, and kanban.

Each card shows: title, a priority color rail (for critical and high), parent task name (if the card is a subtask and "show subtasks" is on), a subtask progress badge (for parents with children), and logged time if any.

## Drag between columns

Drag any card to another column. The task's status updates on drop. If you drop on a column whose status is marked **complete**, the task is treated as done — notifications stop, auto-schedule stops shifting it.

## Quick-add per column

Each column has a **+** button at the bottom. Clicking creates a task pre-set to that column's status. Type a title, press **Enter**. The card appears at the bottom of the column.

## Showing subtasks as cards

By default, only top-level tasks appear on the board — subtasks are hidden, but their progress feeds a badge on the parent card.

Turn on **Settings** → **Project Manager** → **Show subtasks on board** to show subtasks as their own cards. The parent card still shows; the subtasks are independent cards that can be dragged separately.

## Filtering

The filter bar above the board is the same one shared across views — text search, status / priority / assignee / tag, due-date filter, archived toggle. Filter state persists per project across reloads.

The status filter still applies on kanban — hiding a status hides its entire column. (If that's not what you want, use the table view and filter by other categories.)

## Context menu

Right-click a card for actions: open, archive, delete, set priority, set assignee, etc.

## Where to go next

- [Statuses and priorities](06-statuses-and-priorities.md) — customize columns by reordering or editing statuses.
- [Settings reference](12-settings-reference.md) — the "show subtasks on board" toggle.

## Tips

> Kanban + filter by assignee = personal queue. Filter once, see your work, drag across as you finish.

> If your board feels cluttered, turn "show subtasks on board" off and use the table when you need to see the breakdown. The board is best when it's high-level outcomes per column.
