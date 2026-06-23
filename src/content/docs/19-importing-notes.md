# Importing existing notes

You don't have to start fresh. If your vault already has notes that represent work — meeting actions, follow-ups, drafts, project briefs — you can pull them into Project Manager as tasks (or convert a note into a project) without losing any content.

> [Video: Importing notes as tasks — running the command, selecting files, choosing import options, then the tasks appearing in the project | import-notes.mp4]

## Import notes as tasks

Use this when you have one or more markdown notes that you'd like to track as tasks inside a project.

### Run the command

Open the command palette and run **Import notes as tasks**.

- If a project is currently open, the import goes into that project.
- If no project is open, you'll be asked to pick one first.

### Phase 1 — pick the notes

A modal opens listing every markdown file in your vault.

- **Search** — type in the top input to filter by filename or folder.
- Check the box next to each note you want to import.
- **Select all** selects every note currently matching the search.
- The counter at the top right shows how many you've picked.

Click **Next** when the selection looks right.

### Phase 2 — set defaults

For all the notes you're importing, pick:

- **Default status** — the status every new task starts in (usually `todo`).
- **Default priority** — `medium` by default.
- **File handling**:
  - **Move to tasks folder** (default) — the original file is moved into the project's `_tasks/` folder and rewritten as a task.
  - **Copy (keep original)** — leaves your original note alone and creates a new task file.

Click **Import**.

### What happens to each note

For every selected file:

1. The plugin reads the body and frontmatter.
2. It creates a new task with:
   - **Title** = the filename (without `.md`)
   - **Description** = the body of the note
   - **Status** and **priority** from the defaults you picked
3. The task file is written into the project's `_tasks/` folder.
4. If you chose **Move**, the original is moved there and overwritten with the new task YAML. If you chose **Copy**, the original stays put.

### What gets skipped

A note is skipped if it already has `pm-task: true` in its frontmatter — it's already a task, so importing it again would be a duplicate. The import summary at the end tells you how many were imported and how many were skipped.

### What's *not* preserved

The import is intentionally simple — it captures the title and the body. Existing frontmatter (other than `pm-task` detection) is replaced with task YAML. If your notes have metadata you care about, copy it into the task description or a custom field after import.

## Turn a note into a project

The import flow above creates *tasks*. If you have a note that should be a whole **project** instead, the workflow is manual:

1. Open the note.
2. Add this to the top of the file (above any existing content):
   ```yaml
   ---
   pm-project: true
   id: "<any unique string>"
   title: "<Project title>"
   icon: "📌"
   color: "#888888"
   teamMembers: []
   customFields: []
   createdAt: "2026-05-24T00:00:00.000Z"
   updatedAt: "2026-05-24T00:00:00.000Z"
   ---
   ```
3. Save the file.
4. Run **Open current file as project** from the command palette while the file is active. The plugin switches the view to the project pane.
5. From there, use **Import notes as tasks** to pull related notes in as tasks.

> **Note:** Project Manager doesn't auto-add the `pm-project` marker for you — the command only *opens* files that already have it. This keeps the plugin from claiming notes you didn't intend to convert.

The simpler path, if your "project note" is small: create a fresh project via **+ new project**, then paste the original note's content into the project file's body (below the `## Tasks` heading the plugin maintains).

## Where to go next

- [Vault layout](04-vault-layout.md) — see where imported files end up.
- [Bulk operations](15-bulk-operations.md) — clean up status, priority, or tags across the imported batch.
- [Custom fields](08-custom-fields.md) — add fields to capture metadata from your old notes.

## Tips

> Before a big import, **make a backup** (or commit your vault to git). The "move" option rewrites the original file with task YAML — it's not destructive, but it's not trivially reversible either.

> Run **Bulk operations** right after importing: select all the new tasks, set tags or due dates in one go, instead of editing each one.

> If you're importing dozens of files, expect the modal to take a second to load — it scans every `.md` file in your vault to build the picker.
