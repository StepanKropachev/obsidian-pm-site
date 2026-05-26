# Saved views

A saved view is a named bundle of *filter + sort + view mode*. Switch between them in one click. Each project has its own.

> [GIF: set filters and sort → save view → name it → switch between two saved views.]

## What gets saved

A saved view captures three things:

1. **Filter state** — text search, status / priority / assignee / tag filters, due-date filter, archived toggle.
2. **Sort** — sort key (title / status / priority / assignee / due / progress) and direction (asc / desc).
3. **View mode** — table / gantt / kanban. Captured automatically when you save; selecting a saved view switches the project to that mode. Older saved views from before this was tracked may have the field unset — selecting one of those keeps the current view mode.

Saved views are stored on the **project** file (in its YAML frontmatter under `savedViews`). They travel with the project — share the project file and the views go with it.

> Filter state on its own (without saving as a named view) also persists per project across plugin reloads. Saved views are for switching between *different* combos; reload persistence keeps your last working state intact.

## Save the current state

1. Set up filters and sort the way you want them.
2. Open the **saved views bar** above the table.
3. Click **+ save view**.
4. Name it. Press **Enter**.

The view appears as a pill in the bar.

## Switch views

Click a saved view pill. Filters, sort, and view mode (if it was saved) apply immediately.

The currently active saved view is highlighted. Changing any filter while a view is active marks it as "modified" — you can re-save to overwrite, or save a new one with a different name.

## Edit and delete

Right-click a saved view pill (or use its menu) for:

- **Rename** — change the label.
- **Update** — overwrite with the current state.
- **Delete** — remove from this project.

## Where saved views live

In the project's YAML:

```yaml
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
```

Hand-editing is fine. The plugin re-reads on file change.

## Where to go next

- [Table view](09-table-view.md) — the filter bar and sort controls.
- [Data format](17-data-format.md) — the YAML schema.

## Tips

> One saved view per *question you keep asking*: "what's overdue?", "what's mine?", "what's blocked?". Don't try to capture every possible filter combination — start with the views you reach for daily.
