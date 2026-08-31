# Importing existing notes

You don't have to start fresh. Notes that already represent work — meeting actions, follow-ups, drafts, briefs — can be pulled into a project as tasks without losing their content.

## Import notes as tasks

Open the command palette and run **Import notes as tasks**.

If a project is open, the import goes into that project. If none is, you're asked to pick one first.

### Phase 1 — pick the notes

A modal lists every markdown file in the vault.

- **Search** filters by filename or folder.
- Check the box beside each note you want.
- **Select all** takes every note matching the current search.
- The counter at the top right shows how many are picked.

Click **Next**.

### Phase 2 — set the defaults

For the whole batch:

- **Default status** — where new tasks start. Usually To Do.
- **Default priority** — Medium by default.
- **File handling:**
  - **Move to tasks folder** (default) — the original file moves into the project's `_tasks/` folder and is rewritten as a task.
  - **Copy (keep original)** — your note stays where it is and a new task file is written.

Click **Import**. The summary tells you how many were imported and how many skipped.

## What lands in the task

For an ordinary note, the import is deliberately simple:

- **Title** — the filename, without `.md`.
- **Description** — the body of the note.
- **Status and priority** — the defaults you picked.

Existing frontmatter is replaced by task YAML. If your notes carry metadata you care about, move it into the description or a custom field after importing.

**Notes TaskNotes recognizes are a different story.** With TaskNotes 4.10 or newer installed, those come through its API with dates, tags, time estimates, recurrence, archive state, hierarchy, and dependencies intact. See [TaskNotes integration](/docs/tasknotes) — worth reading before a big import, because dependency and parent links only survive between notes imported in the same selection.

## What gets skipped

A note already carrying `pm-task: true` in its frontmatter. It's a task already, and importing it again would duplicate it.

## Turn a note into a project

The import above makes tasks. To promote a note to a whole project:

1. Add `pm-project: true` to its frontmatter. That one line is the marker.
2. Save.
3. Run **Open current file as project** with the note active.

Everything else — id, color, icon, timestamps — is filled in with defaults the first time the plugin writes the project, and the title falls back to the filename. Set them properly afterwards in **Edit project**.

The plugin never adds the marker on its own. That's what keeps it from claiming notes you didn't mean to convert.

A converted note starts outside the folder-per-project layout, since it's sitting wherever you left it. It's moved into a folder of its own — note and `_tasks/` together — the next time the vault opens. See [Vault layout](/docs/vault-layout).

Don't paste project content into the body of a project note. The plugin regenerates that body from the frontmatter on every save, so anything you add there is lost. The project's **description** field is the place for it: it survives saves and renders on the project overview.

## Where to go next

- [TaskNotes integration](/docs/tasknotes) — what a TaskNotes import brings across.
- [Vault layout](/docs/vault-layout) — where imported files end up.
- [Bulk operations](/docs/bulk-operations) — clean up the batch in one move.

## Tips

Back up, or commit your vault, before a large import with **Move** selected. It rewrites the original files, and the only way back is your version history.

Import, then bulk edit. Select the whole new batch and set tags, dates, or an assignee in one go rather than opening thirty tasks.

Importing dozens of files? Expect the picker to take a moment — it scans every markdown file in the vault to build the list.
