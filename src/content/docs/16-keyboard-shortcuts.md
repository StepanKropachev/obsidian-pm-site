# Keyboard shortcuts

The plugin ships with **no default hotkeys** — Obsidian's plugin guidelines disallow them. You can assign any of the plugin's commands to your own hotkey under **Settings** → **Hotkeys**.

This page lists what the plugin responds to.

## Commands (assignable hotkeys)

All accessible via the command palette. Search for the name to find each.

| Command | What it does |
| --- | --- |
| Open projects pane | Opens the project list. |
| Create new project | Opens the new-project modal. |
| Create new task | Asks which project, then opens the new-task modal. |
| Create new subtask | Asks for project and parent task, then creates a subtask. |
| Import notes as tasks | Bulk-converts vault notes into tasks. |
| Open current file as project | Treats the currently active markdown file as a project. |
| Undo last action | Undoes the most recent change made through the plugin. |
| Redo last action | Reapplies the most recent undone change. |

Assign hotkeys via **Settings** → **Hotkeys**, search the command, click the **+**, press your key combo.

## In-view keys (always active)

### Table view

| Key | Action |
| --- | --- |
| **Enter** | Open the focused row's task modal, or commit an inline edit. |
| **Escape** | Cancel an inline edit, or deselect everything. |
| **Shift-click** | Range-select rows. |
| **Cmd/Ctrl-click** | Toggle a single row in/out of selection. |

### Gantt view

| Key | Action |
| --- | --- |
| **Escape** | Cancel dependency linking mode. |
| **Cmd/Ctrl + Z** | Undo last drag. |
| **Cmd/Ctrl + Shift + Z** *or* **Cmd/Ctrl + Y** | Redo. |

### Task modal

| Key | Action |
| --- | --- |
| **Shift + Enter** | Save. |
| **Escape** | Close. (With **save tasks on close** on, this also saves.) |
| **Tab** | Move to the next field. |

### Inline editors (status pickers, date pickers, etc.)

| Key | Action |
| --- | --- |
| **Enter** | Commit. |
| **Escape** | Cancel. |

## Where to go next

- [Table view](09-table-view.md) — see selection keys in context.
- [Settings reference](12-settings-reference.md) — the "save tasks on close" setting.

## Tips

> If you reach for the mouse most often for **Create new task**, that's the one command worth a hotkey. Most other actions are one or two clicks away.
