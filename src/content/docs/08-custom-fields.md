# Custom fields

Custom fields let you attach typed extra data to tasks: contract value, repo URL, blocker reason, sprint, customer name — anything specific to one project.

Custom fields are defined **per project**. A field added to "Website Redesign" doesn't appear on tasks in other projects.

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

## Add a custom field

1. Open the project.
2. Go to the project's settings (gear icon on the project header or via the toolbar).
3. Under **custom fields**, click **+ add field**.
4. Give it a **name**, pick a **type**, optionally pick an **icon** (emoji or lucide icon name).
5. For **select** or **multi-select**: add the options, one per line.
6. Save.

The new field appears in two places:

- On the **task modal** for every task in this project.
- As an optional **column in the table view** — show it via the column picker.

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
- [Data format](17-data-format.md) — exact serialization per type.

## Tips

> If you find yourself adding the same fields to every project, that's a hint they're really *tags* or *status* — not custom fields. Keep custom fields for project-specific data.

> Deleting a field deletes its definition, not the values stored on tasks. The values stay in the YAML until you edit those tasks (and the plugin drops orphaned keys on next save). If you add a field back with the same ID, the values come right back.
