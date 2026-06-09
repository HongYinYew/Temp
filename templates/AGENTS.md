<!--
Per-repo agent instructions. Place at <repo-root>/AGENTS.md.

EDIT THIS TEMPLATE — do not use as-is. Each section should be filled in with
the actual specifics of your repo. Keep it ≤ 200 lines (it's loaded into
every session).

If you also use Claude Code specifically, you can rename this file to
CLAUDE.md or symlink AGENTS.md → CLAUDE.md.
-->

# AGENTS.md

## Stack

- Language: <e.g. Python 3.12, TypeScript 5.3, Go 1.22>
- Framework: <e.g. FastAPI, Next.js 14, none>
- Package manager: <e.g. uv, pnpm, npm, go mod>
- Runtime: <e.g. Node 20, Python 3.12, Bun>

## Commands

| Action | Command |
|---|---|
| Install deps | `<cmd>` |
| Run dev server | `<cmd>` |
| Run tests | `<cmd>` |
| Run linter | `<cmd>` |
| Run formatter | `<cmd>` |
| Build / compile | `<cmd>` |
| Type check | `<cmd>` |

## Repo layout

<!-- Module-level only. Don't list individual files unless one is non-obvious. -->

- `src/<area-1>/` — <one-line description of what lives here>
- `src/<area-2>/` — <one-line description>
- `tests/` — <mirrors src/ unless stated>
- `scripts/` — <one-off scripts / ops>
- `docs/` — <design docs, ADRs>

## Conventions

- **Trunk branch**: `<main | staging>` (no other "main" exists)
- **Feature branches**: `hongyin/<type>_<kebab-summary>` (e.g. `hongyin/feat_user-auth`)
- **Commits**: Conventional Commits — `type(scope): subject`. Wrap body at ~72 chars. Explain *why*.
- **No `Co-authored-by:` AI trailers** under any circumstances.
- **Style**: <link to style guide or "match existing">
- **Tests required for**: <e.g. all new public functions, all bugfixes>

## Gotchas

<!-- Anything that would waste an agent's tokens to discover -->

- Env vars come from `<.env.local | secrets manager | ...>`, not `.env`.
- Tests require `<Postgres / Redis / etc>` running — start with `<cmd>`.
- `<framework>` does <unusual thing> — be aware before <action>.
- Avoid `<library / pattern>` — we tried it, it broke for <reason>.

## Out-of-scope for agents

- Do not modify `<dir>` without explicit ask (e.g. generated code, migrations).
- Do not commit secrets, even in tests.
- Do not bump dependency versions in passing.

## Deployment

- Trunk branch auto-deploys to <staging URL>.
- Production deploy: manual `workflow_dispatch` of `.github/workflows/promote-to-prod.yml`.
