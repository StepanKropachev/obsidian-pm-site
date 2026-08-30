# TaskNotes integration

[TaskNotes](https://github.com/callumalpass/tasknotes) is another task plugin for Obsidian, and plenty of vaults have both. dotpm reads TaskNotes through its public API and does two things with it: keeps your statuses and priorities in step, and imports TaskNotes tasks as real dotpm tasks — dates, hierarchy, dependencies and all.

It reads. It never writes back to TaskNotes.

## What you need

TaskNotes 4.10 or newer, installed and enabled. That's the version that exposes API v1 with the `catalog.read` capability, which is what dotpm asks for.

The **Settings → Project Manager → TaskNotes** page appears only when TaskNotes is installed. If it's there but reads **Update required**, TaskNotes is too old and neither half of the integration will run.

## Share statuses and priorities

TaskNotes has its own workflow, and typing the same six statuses into two plugins is a waste. Open **Settings → Project Manager → TaskNotes**. The page tells you where you stand:

- **Up to date** — your palettes already match TaskNotes.
- **3 changes** — that's how many entries an import would add or update.
- **Update required** — TaskNotes is older than 4.10.

Click the refresh button to import. What lands:

- **Statuses**, in TaskNotes' own order, with their label, color, and completion flag. A TaskNotes status marked completed becomes a dotpm status that counts as done — which drives progress, the overdue count, and auto-archive.
- **Priorities**, ordered by TaskNotes' weight, highest first, with their label and color.

The import patches rather than replaces. An entry you already have with the same id is updated in place; a new one is inserted after the last entry that matched, so TaskNotes' relative order carries over without shuffling entries it knows nothing about. **Nothing is ever deleted.** Statuses of your own that TaskNotes doesn't have survive untouched.

This writes to your global palettes. A project running its own custom statuses ([Project overview and settings](/docs/project-overview)) is unaffected until you turn its override off.

## Import TaskNotes tasks

Run **Import notes as tasks** and pick the notes as usual — see [Importing existing notes](/docs/importing-notes) for the two-phase modal. Any note you select that TaskNotes recognizes comes through its API instead of being read as plain markdown, and arrives with far more than a title and a body:

- **Title, status, and priority**, as TaskNotes has them. A task with no status or priority set falls back to the defaults you picked in the modal.
- **Dates.** TaskNotes' *scheduled* becomes the start date, *due* becomes the due date, and the completed date carries over.
- **Tags**, minus TaskNotes' own task tag and archive tag — those are plumbing, not tags you meant.
- **Time estimate**, converted from minutes to hours.
- **Recurrence**, for simple rules: a frequency of daily, weekly, monthly, or yearly, with an interval. Anything more elaborate is dropped rather than approximated.
- **Created and modified timestamps.**
- **Archived state.** An archived TaskNotes task lands straight in the project's `Archive/`.

### Hierarchy and dependencies

TaskNotes links a task to its project; dotpm reads those links as parent/child edges. If a task points at another task that's also in the selection, it's imported as that task's subtask. The first link that resolves wins, and one that would close a loop is ignored — that task lands at the top level instead of vanishing into a cycle.

TaskNotes' **blocked by** becomes dotpm's **depends on**, the same way: both ends have to be in the selection.

That's the one thing to plan for. **Links to notes outside the import are dropped.** Import a project's tasks in one selection, not a handful at a time, or you'll rebuild the graph by hand afterwards.

### Statuses the import needs

If an imported task uses a TaskNotes status or priority your settings don't define, that entry is appended to your palette during the import — with its real label, color, and completion flag. Tasks can't land in a status the board has no column for, so the import makes sure the column exists.

### What happens to the original note

The same **file handling** choice as any import:

- **Move** rewrites the original file as a dotpm task inside the project's `_tasks/` folder. It stops being a TaskNotes task.
- **Copy** leaves the TaskNotes note where it is and writes a new task file. You end up with two files describing the same work, drifting apart from the moment you edit either one.

Notes that already carry `pm-task: true` are skipped — they're dotpm tasks already.

## What this isn't

There's no live sync. The integration reads TaskNotes at the moment you click import, and that's the whole contract. Edit an imported task in dotpm and TaskNotes knows nothing about it; edit the TaskNotes side of a copied pair and dotpm knows nothing about that. Running the palette import again re-reads TaskNotes and updates your entries; nothing else re-runs on its own.

One task file appearing in both plugins, live, is a different feature. It isn't built yet.

## Where to go next

- [Importing existing notes](/docs/importing-notes) — the import modal, step by step.
- [Statuses and priorities](/docs/statuses-and-priorities) — what the palettes drive once they're in.
- [Subtasks and dependencies](/docs/subtasks-and-dependencies) — what the imported edges do on the timeline.

## Tips

Import the palettes first, tasks second. Statuses that arrive with the tasks are appended to the end of your list; statuses imported from the palette page arrive in TaskNotes' own order.

Commit your vault, or back it up, before a large import with **Move** selected. It rewrites the original files, and there's no undo for that beyond your version history.
