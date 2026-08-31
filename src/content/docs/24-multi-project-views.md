# Working across projects

The table, the timeline, and the board don't have to show one project. Each of them renders a *scope*: this project, this project with everything under it, a folder, or the whole vault. The view stays the same — same filters, same inline editing, same drag — it just covers more work.

## The scope switcher

Next to the project name at the top of the table, timeline, or board there's a pill saying what the view currently covers. Click it for four options:

- **This project.** Its own tasks and nothing else. The default.
- **With sub-projects.** The project plus every project nested under it, at any depth. The title reads "Platform and sub-projects".
- **Folder: `<name>`.** Every project in the folder that holds this project's folder, including projects nested deeper inside it.
- **All projects.** Every project in the vault. The title reads "All projects".

The scope is part of the view's state, so a tab reopens on the scope you left it on. To jump straight to everything, run **Open all projects in one view** from the command palette. From the project list, right-click a project that has children and pick **Open with sub-projects**.

## What changes with several projects on screen

**Rows say where they belong.** The table gains a Project column. Timeline labels and board cards get a colored project chip. Click either one to open that project.

**Statuses and priorities are pooled.** The board's columns are every status used by every project in scope, the first project's list first, then anything the others add. A project running a custom workflow keeps its own columns and its tasks land in them; moving a card puts that task in that status, whether or not the project it belongs to defined it.

**Custom fields are pooled too.** The table shows one column per field across the scope, so projects line up on one header row. Editing a value still uses the owning project's definition — an overridden field keeps its own type and options.

**Adding a task asks which project.** The **+ add task** button opens a menu of the projects in scope. Pick one and the task editor opens against it.

**Everything else works normally.** Inline editing, drag-to-reschedule, bulk selection across projects, archive, delete. A bulk edit spanning four projects writes to four project files; you don't have to think about it.

**Project settings are per project.** The settings gear leaves the toolbar in a multi-project view, since there's no single project to configure. Open the project itself for that.

## Filters and saved views belong to the scope

Each scope keeps its own filter state and its own saved views. "Platform" and "Platform and sub-projects" are two different sets of filters, and neither disturbs the other. Switch scope and the filter bar changes with it.

Saved views on a single project live in the project's note, so they travel with the file. Saved views on a group — a subtree, a folder, all projects — live in the plugin's settings, since a group has no file of its own to keep them in.

## Dependencies across projects

A dependency doesn't have to stay inside a project. Open a task, add **Depends on**, and the picker searches every task in the vault: this project's tasks first by title, then everything else labelled with the project it belongs to.

Cycle protection follows the links wherever they go. A chain that leaves a project, passes through two others, and comes back is still a cycle, and the picker won't offer the task that would close it.

### Blocks

The **Blocks** row in the task editor lists the tasks waiting on this one, wherever they live. It's the other side of the same link — dependencies are stored once, on the dependent task, and the reverse is computed. Without it, a dependency declared in another project would be invisible from the task it blocks. Each entry names its project on hover and opens in the task editor when clicked.

### Auto-scheduling across the boundary

With auto-schedule on, moving a task shifts its dependents forward to keep the order valid — and it doesn't stop at the project's edge. A dependent in another project is loaded, rescheduled, and saved along with the rest.

The usual rules still hold: dates only move forward, completed and archived predecessors are skipped, and a cycle is left alone rather than rescheduled into oblivion. Auto-schedule is resolved per project, so a project that has turned it off in its own settings won't be reshuffled by a predecessor in a project that has it on.

### Dependencies you can't see

The timeline draws an arrow between two bars only when both are on screen. A predecessor outside the current scope has no bar to draw from, so the row says so instead: a small **Depends on 2 elsewhere** chip next to the task name. Hover it for the task names and their projects, click it for a menu that opens any of them.

Widen the scope and the chip disappears — the arrows are drawn instead.

## Where to go next

- [Create a project](/docs/first-project) — parents, sub-projects, and where files land.
- [Project overview and settings](/docs/project-overview) — per-project statuses, priorities, and scheduling.
- [Subtasks and dependencies](/docs/subtasks-and-dependencies) — how auto-schedule decides what moves.

## Tips

A portfolio view is one command away: **Open all projects in one view**, filter to the current quarter, save it. That saved view is attached to the vault scope, so it survives every project you add later.

Moving a task to another project keeps its dependencies intact. Right-click the task, **Move to project**, pick the target — the task and its subtasks move, and anything depending on it now depends across the boundary.
