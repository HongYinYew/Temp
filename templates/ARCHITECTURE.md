<!--
Per-repo architecture doc. Place at <repo-root>/ARCHITECTURE.md.

Only needed for repos with >~10 source files. For small repos, AGENTS.md is enough.
-->

# Architecture

## High-level

<!-- One paragraph: what this system does and the major moving parts. -->

<Insert ASCII diagram or Mermaid diagram showing the main components and data flow.>

## Modules

| Path | Responsibility |
|---|---|
| `src/<area-1>/` | <what it does> |
| `src/<area-2>/` | <what it does> |
| `src/<area-3>/` | <what it does> |

## Key flows

### 1. <Flow name, e.g. "Daily Instagram post at 9am">

1. `<trigger>` → `<entry point>`
2. `<step>` → `<step>` → `<step>`
3. `<output>`

### 2. <Another flow>

...

## Data model

<!-- For repos with persistent state. -->

- `<table/collection>`: <fields, purpose>
- `<table/collection>`: <fields, purpose>

## Key decisions

See `docs/adr/` for individual Architecture Decision Records.

Headline decisions:

- Chose `<X>` over `<Y>` because `<reason>` — see `docs/adr/0001-*.md`
- Chose `<X>` over `<Y>` because `<reason>` — see `docs/adr/0002-*.md`

## What this repo is NOT

<!-- Helps the agent (and humans) avoid scope creep. -->

- Not a `<thing>` — that lives in `<other repo>`.
- Does not handle `<thing>` — handled by `<service>`.
