# Claude Playbook — HongYinYew

Operating manual for getting maximum value from Claude (and any AI coding agent) at minimum token cost. Based on a real audit of June 2026 usage.

> **TL;DR** — Drop `CLAUDE.md` into `~/.claude/`. Drop `AGENTS.md` into every repo you work in. Start a fresh session per task. Default to Sonnet. Commit before exiting. Expected outcome: **5–10× lower spend** at equal productivity.

---

## What's in this repo

| File | Place at | Purpose |
|---|---|---|
| `CLAUDE.md` | `~/.claude/CLAUDE.md`<br>(Windows: `C:\Users\<you>\.claude\CLAUDE.md`) | Loaded into every Claude Code session globally. The behavioural ruleset. |
| `templates/AGENTS.md` | `<each repo>/AGENTS.md` | Per-repo file map, commands, stack, gotchas. Read by Claude / Cursor / Codex / Cline. |
| `templates/ARCHITECTURE.md` | `<each repo>/ARCHITECTURE.md` (only if repo has >~10 source files) | Module map + key flows. |
| `TOKEN-EFFICIENCY-GUIDE.md` | Stays here — reference doc | Full explanation, numbers, model ladder, subscription analysis. Read once. |
| `README.md` | This file | The playbook you're reading. |

---

## One-time setup (do this once, then forget about it)

1. **Install the global rules.**

   ```powershell
   Copy-Item .\CLAUDE.md "$env:USERPROFILE\.claude\CLAUDE.md" -Force
   ```

   Verify: open any Claude Code session and ask *"what instructions did you load globally?"* — it should mention session hygiene, model ladder, no AI co-author trailers.

2. **For every repo you actively work in:**

   ```powershell
   Copy-Item .\templates\AGENTS.md <repo>\AGENTS.md
   # Then edit AGENTS.md to fill in the stack, commands, file map.
   ```

3. **Cross-tool mirror (optional).** If you also use Cursor / Codex CLI / Cline:

   ```powershell
   Copy-Item "$env:USERPROFILE\.claude\CLAUDE.md" "$env:USERPROFILE\.claude\AGENTS.md"
   ```

---

## Per-task workflow (every time you start work)

The five-step loop. Do all of them. Skipping any costs you tokens.

### Before starting

- [ ] **Open a fresh session.** `/clear` if continuing from previous chat, or start a new terminal. No *"let me just continue this thread."*
- [ ] **Pick the model.** Default = **Sonnet**. Only open in **Opus** if the task is genuinely hard (architecture, multi-system debugging). See the model ladder in `TOKEN-EFFICIENCY-GUIDE.md`.
- [ ] **Open in the repo with `AGENTS.md` present.** If a repo doesn't have one, take 5 minutes to make one *before* doing the task — it pays back within the first session.

### While working

- [ ] **One task per session.** When the stated task is done, stop. Don't roll into *"and while we're here…"*.
- [ ] **Plan once, execute once.** For non-trivial work, demand a concrete plan first (file list, function signatures, test cases). Then say *"execute the plan, don't re-plan."* If the model starts re-planning mid-execution, push back.

### After the work

- [ ] **Run lint + tests.** Don't accept *"should work"* — verify.
- [ ] **Commit.** Conventional Commits. No AI co-author trailers. Push to your feature branch.
- [ ] **End the session.** Don't leave a long chat open hoping you'll need it later. You won't.

---

## Per-week ritual (5 minutes, Sunday)

1. Open this repo. Skim `TOKEN-EFFICIENCY-GUIDE.md` — section "Anti-patterns" only.
2. For any new repo you started this week, check it has an `AGENTS.md`. If not, add one.
3. If you used Opus more than ~5h this week, look at *why*. Was Sonnet failing, or did you just default to Opus out of habit?

## Per-month ritual (10 minutes, end of month)

1. In Copilot CLI, ask: `analyse my total usage this month, compare to last month`.
2. Compare against the previous month. Trending down = working. Trending up = something slipped (likely: too many long sessions, or Opus-by-default).
3. If you're **under $400/mo**, you're winning. Stop optimizing, focus on shipping.
4. If you're **over $1,000/mo**, re-read the guide. The behaviour is drifting.

---

## When something goes wrong

| Symptom | Most likely cause | Fix |
|---|---|---|
| Bill creeping up despite the playbook | Long rolling sessions | `/clear` between every task. No exceptions. |
| Claude keeps re-reading the same files | No `AGENTS.md` in the repo, or it's stale | Create / update it |
| Claude defaults to Opus | You opened the session in Opus | Open in Sonnet; escalate to Opus only on demand |
| Plans drift mid-execution | Plan wasn't concrete enough | Demand file paths + function signatures in the plan |
| Hitting Max 20x rate limits | You're using it for heavy work | Either change behaviour (Sonnet default, short sessions) or move that work to API |
| Forgot what file goes where | You're reading this | Bookmark this README |

---

## The five rules (memorise these — everything else is detail)

1. **Fresh session per task.** Long sessions are the #1 token sink.
2. **Sonnet by default.** Opus is for hard problems, not everyday work.
3. **`AGENTS.md` in every repo.** Stops the agent from rediscovering everything.
4. **Plan once, execute once.** No silent re-planning.
5. **Commit before exit.** If you can't show the diff in git, the session didn't really happen.

---

## Numbers to remember

- **Opus is 5× more expensive than Sonnet, 15× more than Haiku.**
- **Cache-read is 10× cheaper than fresh input** — so reading `AGENTS.md` repeatedly is nearly free, but reading the entire codebase repeatedly is not.
- **June 2026 baseline**: ~$1,400–2,800/mo equivalent. Target: $200–500/mo at equal productivity.
- **The `CLAUDE.md` alone**: ~1.3× improvement. **`CLAUDE.md` + the workflow above**: ~5–10× improvement.

---

## Where to learn more

- This repo's `TOKEN-EFFICIENCY-GUIDE.md` — the full reasoning behind every rule above.
- Anthropic docs — official `CLAUDE.md` spec: <https://docs.anthropic.com/en/docs/claude-code/memory>
- `agents.md` cross-tool convention: <https://agents.md>

---

**This is a living playbook.** If you discover a new pattern that saves tokens, add it to the rules. If a rule consistently fails, remove it. Don't let it rot.
