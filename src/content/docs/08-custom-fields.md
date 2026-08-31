# Custom fields

Custom fields let you attach typed extra data to tasks: contract value, repo URL, blocker reason, sprint, customer name — anything specific to one project.

Fields can be defined once for the whole vault, on a parent project so its subtree picks them up, or on a single project. Where you define one decides how far it reaches.

## The field types

| Type | Stores | Editor in the modal |
| --- | --- | --- |
| Text | string | single-line text input |
| URL | string | URL input (HTML5 validation) |
| Number | number | numeric input |
| Date | string (`YYYY-MM-DD`) | date picker |
| Checkbox | boolean | checkbox |
| Select | string | dropdown with predefined options |
| Multi-select | string[] | chip list with a dropdown |
| Person | string | text input with autocomplete from team members |

## Where to define one

### For every project

**Settings** → **Project Manager** → **Task fields** → **Custom fields** → **+ add field**. Fields here reach every project in the vault.

This is the right home for anything you'd otherwise add to project after project — sprint, customer, contract value.

### For one project and its sub-projects

Open the project, **Edit project** → **Custom fields** → **+ add field**. The field applies to that project and flows down to every project nested under it.

Either way: give it a **name**, pick a **type**, optionally an **icon** (emoji or Lucide icon name), and for **select** or **multi-select** add the options.

The new field shows up in two places: on the **task editor** for every task in scope, and as an optional **column in the table view** via the column picker.

## Inheritance

A project's settings page splits its fields into two lists.

**Inherited** — everything coming from vault settings or an ancestor project, each row naming where it came from. Two buttons per row:

- The **eye** hides the field on this project. The definition upstream is untouched; this project just doesn't carry it.
- The **pencil** copies it down so this project can rename it or change its type. It then shows as *overrides `<source>`* in the list below.

**This project** — fields defined here. If one duplicates an inherited field of the same name and type, a **merge** button appears: it moves every task's values onto the inherited field and stops defining the local copy.

That merge is the way out of the usual mess — the same field created separately on three projects before anyone defined it once at the top.

Resolution runs root-most first: vault settings, then each ancestor, then the project itself. The nearest definition wins.

## Edit a field value on a task

Open any task in this project. The custom fields panel sits below the standard fields. Edit values like any other field — they save when you save the task (or on close, if **save tasks on close** is on).

## How values are stored

Each value lives under the field's ID in the task's `customFields` map:

```yaml
customFields:
  contract_value: 4200
  repo_url: "https://github.com/example/repo"
  sprint:
    - "Q3"
    - "Mobile"
  signed_off: true
```

Keys are field IDs (stable, even if you rename the field). Values match the field's type — number, string, string array, boolean, etc.

If a field has no value set on a task, the key may be absent entirely. Don't rely on `null` to mean unset.

## Where to go next

- [Table view](09-table-view.md) — show custom fields as columns.
- [Project overview and settings](/docs/project-overview) — the inherited and per-project field lists.
- [Data format](17-data-format.md) — exact serialization per type.

## Tips

> Adding the same field to every project is a sign it belongs in vault settings instead. Define it once at the top; any project that needs it differently can override or hide it in a click.

> Deleting a field deletes its definition, not the values stored on tasks. The values stay in the YAML until you edit those tasks (and the plugin drops orphaned keys on next save). If you add a field back with the same ID, the values come right back.
