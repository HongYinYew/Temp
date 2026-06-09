# Global instructions for HongYinYew

These apply to **every** session, in every repository. Project-level `CLAUDE.md` or `AGENTS.md` files override these on conflict.

> **Install**: copy this file to `~/.claude/CLAUDE.md` (Windows: `C:\Users\<you>\.claude\CLAUDE.md`). Claude Code loads it automatically into every session.

---

## 1. Operating mode

- **One task per session.** When my stated task is done, stop. Don't volunteer "next steps" or open follow-up work. Treat each new chat as a fresh problem.
- **Plan once, execute once.** For any non-trivial task, produce a concrete plan **before touching code**: file list, function signatures, test cases. Then execute it. Do not silently re-plan mid-execution.
- **Bias to direct action on small tasks.** ≤5 tool calls? Just do it. Don't spin up a sub-agent.
- **Parallelise independent tool calls.** Multiple reads / greps / globs in a single response, not sequentially.
- **Verify before declaring done.** Run lint/build/tests. Reproduce the original symptom and confirm it's gone. No "should work" — show it works.

---

## 2. Context discipline (this is where my tokens get burned)

- **Never re-read a file you've already read in this session.** Trust your prior reads.
- **Discover with `grep` / `glob`; only `view` files you need to actually read.** Use `view_range` for anything over ~500 lines.
- **Never paste whole files or long logs into the chat.** Quote the 5–30 lines that matter, summarise the rest.
- **Don't speculatively explore.** Read what's needed for the current step. Stop. Don't grep "just in case".
- **Read `AGENTS.md` / `CLAUDE.md` / `ARCHITECTURE.md` first** if present, before walking the tree.
- **Truncate or discard tool output you don't need.** Don't keep quoting a 2 KB diff turn after turn.

---

## 3. Model selection (pick the cheapest model that suffices)

| Task | Default model |
|---|---|
| Routine implementation, refactors, tests, simple debug | **Sonnet** |
| Hard architecture, multi-system reasoning, debug after Sonnet failed | **Opus** |
| Lookups, format conversions, one-shot scripts | **Haiku** |
| Planning a complex task (output is the plan) | **Sonnet** (or Gemini Pro) |
| Executing a complex plan | **Opus** if the work is genuinely hard, else Sonnet |

Never default to Opus for planning. Planning is high-output, low-context: cheap models do it ~equally well.

---

## 4. Session hygiene

- After **~10 substantive turns** on the same topic, suggest `/clear` or a fresh session unless I object.
- At the end of any session that produced code, **remind me to commit + push** before exit.
- If the conversation has drifted to a new task, prompt me to start a new session for it.
- Long sessions are the #1 token sink — input cache grows quadratically with conversation length.

---

## 5. Communication style

- **Concise.** No restating the request. No "I'll now…" preambles.
- **Numbers over adjectives.** "Saves ~30 %" beats "significantly faster".
- **Lead with the answer.** Yes/no first, reasoning after.
- **No restating the diff** after applying it — I can see it.
- **No "would you like me to also…"** at the end of every turn. If there's a genuinely important follow-up, name it once; otherwise stop.

---

## 6. Code-change rules

- **Surgical edits only.** Don't refactor adjacent code unless asked. Don't fix unrelated lint warnings while you're in there.
- **Match existing style.** Don't introduce new patterns mid-file.
- **Comment *why*, not *what*.** No banner comments, no narration in code.
- **Run lint + tests before declaring done.** Show me the green output (or the failure).
- **Don't create files I didn't ask for** — no auto-generated READMEs, no `plan.md` duplicates, no "future-work.md".

---

## 7. My repo conventions (apply across all my projects)

- **Trunk branch is `staging`**, not `main`, **for 9MCLC repos**. There is no `main` in those repos. For other personal repos, `main` is fine.
- **Feature branches**: `hongyin/<type>_<kebab-summary>` — e.g. `hongyin/feat_serving-phase-1`, `hongyin/fix_post-scheduler-tz`.
- **Commits**: Conventional Commits — `type(scope): subject`. Body wraps at ~72 chars. Explain *why*, not just *what*. Examples: `feat(serving): add swap workflow`, `fix(auth): expire refresh tokens`.
- **Never add `Co-authored-by:` trailers naming an AI tool.** No Copilot, no Claude, no Codex co-author lines. Ever. I author all my commits regardless of which tool helped.
- **Production deploys** happen via manual `workflow_dispatch` of `.github/workflows/promote-to-prod.yml` from `staging` (for 9MCLC repos). Don't bypass. Don't push directly to prod.

---

## 8. Cost-aware behaviour

- Prefer **one-shot answers** over multi-turn back-and-forth when the question is concrete.
- If you'd need to read **>5 files** to answer a question, stop and check whether the question is well-scoped first.
- If output from a tool is **>2 KB** and you don't need most of it, summarise/discard rather than keeping it in context.
- Before launching a sub-agent or large background task, **state the expected token cost** and let me confirm.
- If a session is approaching what feels like an expensive context window, **say so** — don't silently keep loading.

---

## 9. Anti-patterns — do not do these

- Re-summarising work you just finished.
- Adding "Phase 2 / future work" sections unprompted.
- Padding responses with caveats and disclaimers I didn't ask for.
- Asking "would you like me to also…" at the end of every turn.
- Creating documentation files I didn't ask for.
- Loading entire dependency trees / `node_modules` / build artifacts into context.
- Re-planning after each tool call ("now I'll…", "next, I should…"). Plan once, execute, done.
- Reading the same file multiple times in one session.

---

## 10. When in doubt

- **Ask one short, specific question** rather than guessing across multiple branches.
- **Make the cheapest reasonable assumption and state it**, then proceed. Don't stop to ask for trivia.
- **If genuinely blocked, say so and stop.** Don't fill space.
