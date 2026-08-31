# Create a project

A project is a folder in your vault. Inside it: one markdown note holding the project's settings, a `_tasks/` folder holding one file per task, and — once a project sits under another — a folder per sub-project.

> [Video: Creating a project — the new project dialog, then a second project nested under it by setting Parent, and the settings page that opens afterwards | projects-creating.mp4]

## Open the project list

Click the **Project manager** ribbon icon, or run **Open projects pane** from the command palette. The list opens in a tab and shows every project in the vault as a row: icon, name, progress, tasks done over total, members, and the last due date. Sub-projects are nested under their parent, and the parent row counts the whole group.

With no projects yet, you get a single **+ new project** button.

## Create a project

Click **+ new project**, or run **Create new project** from the command palette. One dialog asks for everything a project needs:

- **Name.** The big field at the top. The footer shows the exact file path the project will get, updating as you type. If a note of that name is already there, the field turns red and Create stays disabled.
- **Icon.** Any icon Obsidian knows, searchable in a grid. Paste an emoji into the search field to use that instead.
- **Color.** A full color picker. It tints the icon, the accent strip, the progress bars, and the project chip wherever the project shows up next to others.
- **Parent.** Leave it on **No parent** for a top-level project, or pick a project to nest under. See below.
- **Members.** Picked from the person notes already in your vault. Type a name nobody has a note for and the picker offers to create one, in the folder set by the people folder setting.
- **Description.** What the project covers and what done looks like. It renders as markdown on the project overview.

Press Enter in the name field, or Shift+Enter anywhere in the dialog, to create. The project opens on its overview page.

Nothing is written until you click Create. Close the dialog and no file appears.

## What you get

The project opens on its **overview**: progress and task counts across the top, your description, a milestone track, sub-projects, and a properties panel down the side. It's empty until you add work to it.

Three controls to know:

- **The project name** in the header opens the task views: table, timeline, or board.
- **Edit project** opens the settings page, where everything from the create dialog can be changed, plus statuses, priorities, scheduling, and custom fields.
- **The view switcher** in the task toolbar moves between table, gantt, and board. The pill beside the project name changes how many projects the view covers.

Prefer to land straight in the task list instead of the overview? Set **Settings → Project Manager → Open projects in** to **Tasks**.

## What lands on disk

```
Your Vault/
└── Projects/
    └── Website Redesign/
        ├── Website Redesign.md      project settings and metadata
        └── _tasks/
            ├── audit-current-site.md
            ├── new-homepage-copy.md
            └── Archive/
                └── old-task.md
```

The note carries `pm-project: true` in its frontmatter — that marker is what makes it a project. Everything else in the frontmatter is the project's own configuration: icon, color, parent, members, custom fields, saved views, task order.

`_tasks/` is created with the project. Archived tasks move to `_tasks/Archive/`; being in that folder is what archived means.

Projects made before version 2 sat as a loose note beside a `<Name>_tasks/` folder. They move into the new structure on their own the first time you open the vault after upgrading, keeping their filters, saved views, and open tabs.

## Where new projects go

**Settings → Project Manager → New project folder** decides where new top-level projects are created. Default is `Projects`. Leave it empty to create them in the vault root.

It doesn't decide which projects the plugin shows. Projects are listed wherever their files live, so you can move a project folder anywhere in your vault and it stays in the list. To keep a corner of the vault out of it, add that folder under **Settings → Project Manager → Excluded folders**.

If the list ever looks stale after a lot of moving around, run **Rebuild project index**.

## Sub-projects

A project can sit under another one. Set **Parent** in the new project dialog, or change it later in **Project settings → General → Parent**.

A sub-project's folder is created inside its parent's folder:

```
Projects/
└── Platform/
    ├── Platform.md
    ├── _tasks/
    ├── API v2/
    │   ├── API v2.md
    │   └── _tasks/
    └── Billing/
        ├── Billing.md
        └── _tasks/
```

Nesting goes as deep as you want. A project can't become its own ancestor — the Parent dropdown leaves out the project itself and everything already under it.

### What a sub-project gets from its parent

**Custom fields** flow downhill. A field defined in vault settings, or on any ancestor, shows up on every project underneath, listed as *Inherited* in the project settings. Each project can rename it, retype it, or hide it locally. If a project already had a field of its own that duplicates an inherited one, the merge button folds it in — task values and all.

**Statuses, priorities, and behavior settings don't flow downhill.** They come from the project's own overrides, or from the vault settings. A sub-project doesn't pick up its parent's custom status list.

### What nesting changes

- The project list nests the sub-project's row under its parent, joined by tree lines. Collapse the parent to fold the group away.
- The parent's row and its overview count the whole subtree — its own tasks plus everything under it.
- The table, timeline, and board gain a **With sub-projects** scope, which shows the parent and every project beneath it in one view. See [Working across projects](/docs/multi-project-views).

## Renaming and deleting

Rename a project from **Project settings → General → Name**. The note and the folder both take the new name, and the task files stay put.

Delete it from the danger zone at the bottom of the same page. The whole project folder goes to trash, tasks included — unless a sub-project is nested inside, in which case that folder survives and only the project's note and its `_tasks/` are removed.

## Where to go next

- [Create your first task](/docs/first-task) — add work to the project.
- [Project overview and settings](/docs/project-overview) — the page a project opens on, and every knob it carries.
- [Working across projects](/docs/multi-project-views) — one table, board, or timeline over many projects at once.

## Tips

Use one project per outcome, and sub-projects for the workstreams inside it. "Launch v2" with "Website", "Docs", and "Pricing" underneath beats one project with three hundred tasks and a tag column.

Turning an existing note into a project takes one line: add `pm-project: true` to its frontmatter, then run **Open current file as project**.
