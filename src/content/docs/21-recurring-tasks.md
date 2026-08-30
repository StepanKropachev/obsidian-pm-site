# Recurring tasks

Some work repeats on a schedule — weekly reviews, monthly invoices, quarterly planning. dotpm lets you mark a task as **recurring** so it's visible at a glance as a repeating commitment, with an interval and an optional end date.

## Setting a recurrence

1. Open a task (click its row, or right-click → **Edit task**).
2. Find the **Repeat** row in the task modal.
3. Click **+ set recurrence**.
4. Pick the interval:
   - **Every** *N* — a number between 1 and 365
   - **daily** / **weekly** / **monthly** / **yearly**
   - Optional **Until** — a date after which the recurrence ends
5. Save the task.

Examples:

| Goal | Set it to |
|---|---|
| Every Monday standup | every `1` `weekly` |
| Biweekly retro | every `2` `weekly` |
| Quarterly review | every `3` `monthly` |
| Annual planning | every `1` `yearly` |
| Daily journal entry | every `1` `daily` |

To remove the recurrence, open the task and click the **×** next to the recurrence row.

## Where it shows

A task with a recurrence set gets a small **R** badge:

- In the **table view** — next to the title.
- On **kanban cards** — next to the title in the card header.
- On **gantt bars** — a tiny repeat icon to the right of the bar.

Hover the badge to confirm — it reads "Recurring."

## What recurrence currently does

Today, recurrence is a **marker** — it stores the schedule on the task and shows the badge, but it does **not** automatically create the next occurrence when you complete the task. If you mark a recurring task as `done`, it stays `done` until you reset it yourself.

The intended workflow today is:

1. Set the recurrence on the task as a reminder of the cadence.
2. When you complete it, change the status back to `todo` (or `in-progress`) and bump the **Due date** to the next occurrence manually.

Automatic rollover — completion creates the next instance and resets the date — is on the roadmap. The schema (`interval`, `every`, `endDate`) is in place so existing recurring tasks will work with the feature when it ships.

## Underlying data

In the task's frontmatter:

```yaml
recurrence:
  interval: weekly
  every: 2
  endDate: 2026-12-31
```

`endDate` is optional. If omitted, the recurrence has no end. See [Data format](17-data-format.md) for the full schema.

## Where to go next

- [Statuses and priorities](06-statuses-and-priorities.md) — choose the status to reset a completed recurring task to.
- [Table view](09-table-view.md) — filter to show only recurring tasks (use the search on the **R** badge or a tag).
- [Data format](17-data-format.md) — the YAML schema for `recurrence`.

## Tips

> Tag recurring tasks (e.g. `#recurring` or `#weekly`) — until auto-rollover lands, a tag makes it easy to filter to "what's on a cadence" and bulk-reset their dates at the start of each period.

> Use the **Until** field for time-boxed recurrences (a 6-week onboarding series, a 3-month coaching cadence). Once the end date passes, you can keep or archive the task — the plugin won't act on the end date itself today.
