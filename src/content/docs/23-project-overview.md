# Project overview and settings

Clicking a project in the list opens its overview by default: where the project stands, what it's about, what's coming, and what sits underneath it.

If you prefer to skip the overview and land in the task list, set **Settings → Project Manager → Open projects in** to **Tasks**. Every project link then opens the table, timeline, or board directly, and the overview is still reachable from the project name in the toolbar and from the right-click menu in the project list.

## The overview page

**Breadcrumbs.** A nested project shows its ancestors above the title. Each one opens that project's overview.

**Header.** Icon, name, and a subline reading how many tasks are done, how many sub-projects there are, and how many members. Click the name to open the tasks — table, timeline, or board, whichever this project defaults to. The **Edit project** button opens the settings page.

**Metrics.** Four numbers across the top:

- **Progress** — the share of tasks in a terminal status, with a bar tinted the project's color.
- **Tasks** — done over total.
- **Overdue** — tasks past due and not finished. It turns red when it isn't zero.
- **Time** — hours logged against hours estimated, summed over the project.

Archived tasks are left out of all four.

**Description.** The project's description, rendered as markdown. Wikilinks, embeds, and formatting all work.

**Milestones.** Every milestone with a due date, laid out on one track in date order, with today marked. Done milestones are filled, the next one up is highlighted, the rest are plain. The section header counts how many are done.

**Sub-projects.** One row per child: icon, name, progress bar, and its task count. Click a row to open that project.

**Properties.** Down the right side: members, the tags used across the project's tasks, the latest due date, logged and estimated time, the parent project, and everyone assigned to anything in the project. Below that, the custom fields the project carries, each with its type.

## Project settings

Open them with **Edit project** on the overview, the gear in the task toolbar, or **Edit project** from the project list's right-click menu. Settings open as a full page, and every change is saved as you make it. **Done** takes you back to the overview.

> [Video: Opening project settings from the project list, then working down the page — name, icon, color and description, members, the status and priority overrides, the view and scheduling rows, and the inherited and per-project custom fields | projects-setting-up.mp4]

### General

Name, icon, color, parent, and description. Renaming here renames both the project note and the folder it owns, so the two stay matching. The parent dropdown lists every project except this one and its own descendants.

### Members

Who is on this project, picked from the person notes in your vault. These sit on top of the global team members from vault settings — they don't replace them. The picker also offers anyone already assigned to a task in the project, so you can promote a name that arrived through a task.

### Statuses

Off by default, and the project uses the vault's workflow. Turn on **Use custom statuses instead of the global ones** and the project gets its own copy of the global list to edit: add, rename, recolor, reorder, pick an icon, and mark which ones count as complete.

The override is per project, not per subtree. A sub-project keeps using the global statuses unless you turn its own on too.

Turn the toggle back off and the project returns to the global list. A status still in use by a task is kept visible either way, so nothing vanishes from a board because a status was removed under it.

### Priorities

Same shape as statuses: off means the vault's priority scale, on gives the project its own to add, rename, recolor, and reorder.

### View and scheduling

Each row is either **Use global** or an explicit choice for this project:

- **Default tasks view** — table, gantt, or board.
- **Priority icons** — chevrons, signal bars, arrows, alerts, or none.
- **Auto-schedule** — whether moving a task shifts its dependents forward.
- **Pull forward on early finish** — whether finishing early lets dependents move up.
- **Auto-archive completed tasks** — never, or after 7, 14, 30, or 90 days.
- **Subtree connections in table** — the tree lines joining subtasks to their parent.
- **Line borders in table** — none, horizontal, vertical, or both.
- **Subtasks on board** — whether subtask cards appear in columns.
- **Description preview on board** — whether cards show the first lines of the description.

A project with a tight release calendar can run auto-schedule while the rest of the vault doesn't, and a support backlog can archive after seven days while a research project keeps everything.

### Custom fields

Fields split into two lists.

**Inherited** — everything defined in vault settings or on an ancestor project, each row naming where it came from. Two buttons per row: the eye hides the field on this project without touching the definition, and the pencil copies it down so this project can rename or retype it. An overridden field then shows as *overrides `<source>`* in the list below.

**This project** — fields defined here. If one duplicates an inherited field of the same name and type, a merge button appears: it moves every task's values onto the inherited field and stops defining the local one. That's the way out of the mess you get when the same field was created separately on three projects before you defined it once at the top.

### Delete project

At the bottom, behind a confirmation. It trashes the whole project folder — note, tasks, archive. If a sub-project sits inside, that folder stays and only this project's note and `_tasks/` go.

## Where to go next

- [Create a project](/docs/first-project) — the new project dialog and the folder layout.
- [Working across projects](/docs/multi-project-views) — one view over a subtree, a folder, or the whole vault.
- [Custom fields](/docs/custom-fields) — field types and where they show up.

## Tips

Define custom fields once, as high as they go. A field on vault settings reaches every project; a field on a parent reaches its subtree. Overriding it on one project is a click, and un-defining it later is a merge.

The overview is a good weekly-review page. Progress, overdue count, next milestone, and the state of every sub-project, without opening a single task.
