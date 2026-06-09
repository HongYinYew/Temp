# Token Efficiency Guide

The full reasoning behind the playbook in `README.md`. Read this once to internalise *why* the rules exist. Then forget it and follow the playbook.

---

## Part 1 — The diagnosis (June 2026 audit)

| Metric | Value |
|---|---:|
| Sessions | 26 |
| Active days | 6 |
| Turns | 196 |
| Model used | `claude-opus-4.7-1m-internal` (Opus, 1M context) |
| **Input tokens** | **414,014,441** |
| – of which cache reads | 377,499,850 (91 %) |
| – of which cache writes | 36,434,762 |
| – of which fresh input | ~80,000 |
| **Output tokens** | **2,000,755** |
| **Input : Output ratio** | **207 : 1** |
| Estimated API cost (std Opus rates) | **~$1,400** |
| Estimated API cost (1M-tier premium) | **~$2,800** |

### What this profile tells us

A 207:1 input:output ratio means 207 tokens were spent *loading context* for every 1 token of work *produced*. That's not "doing too much" — it's "doing the same loading over and over." The 91 % cache-read share confirms it: Claude was rebuilding the same conversation context across long-running sessions.

Translation: **you weren't paying for thinking. You were paying for re-reading.**

---

## Part 2 — Where tokens actually get burned

Four categories. In order of typical impact:

### 1. Conversation length (the biggest)

Every turn re-sends the entire prior conversation through the cache. A 50-turn session sends 50× the original prompt size. Cache reads are cheap (~$1.50/MTok) but not free, and they compound.

**Fix**: `/clear` between tasks. One task ≈ one session.

### 2. Codebase rediscovery

Without an `AGENTS.md`, the agent runs grep/glob to figure out where things live — every session, from scratch. With one, it reads the file once and knows.

**Fix**: One-time `AGENTS.md` per repo. ~10 minutes to create, saves tokens for the lifetime of the repo.

### 3. Speculative reads & padding

The agent reads files "just in case", and pads responses with *"would you like me to also…"* or restates the plan. Both are pure waste.

**Fix**: Global `CLAUDE.md` with explicit anti-padding rules.

### 4. Wrong model

Opus on a routine refactor costs 5× what Sonnet would for the same output.

**Fix**: Sonnet by default. Escalate when (and only when) Sonnet visibly struggles.

---

## Part 3 — The optimization stack (ranked by ROI on the June pattern)

| # | Lever | Expected savings | Effort | Notes |
|---|---|---:|---|---|
| 1 | Add `AGENTS.md` per repo | 30–50 % | 10 min/repo (once) | Highest single lever |
| 2 | One task per session (`/clear` discipline) | 20–30 % | Free, requires habit | Behaviour change |
| 3 | Sonnet by default | 50–70 % on $ (less on tokens) | Free | Open sessions in Sonnet, escalate manually |
| 4 | Global `CLAUDE.md` | 15–25 % | One-time copy | You have it |
| 5 | `ARCHITECTURE.md` for large repos | 10–20 % | 30 min/repo | Only repos with >~10 files |
| 6 | Commit at end of session | 5–10 % | Free | Stops you having to "remind" Claude next time |
| 7 | Truncate large tool output | 5–10 % | Free, automatic via rules | In your `CLAUDE.md` already |

**Stacked outcome**:

- File alone (`CLAUDE.md`): **~1.3×**
- + behaviour (per-task sessions): **~3×**
- + per-repo `AGENTS.md`: **~6×**
- + model discipline (Sonnet default): **~8–10×**

---

## Part 4 — The model selection ladder

| Task type | First-choice model | Why |
|---|---|---|
| Quick lookup, format conversion, one-shot script | **Haiku** | 15× cheaper than Opus, plenty for trivial work |
| Routine implementation, simple refactor, test writing | **Sonnet** | The default workhorse. 5× cheaper than Opus, 80 %+ as good for routine code |
| Architecture decisions, multi-system reasoning, hard debugging | **Opus** | Worth the premium where extra reasoning quality matters |
| **Planning** any task (even hard ones) | **Sonnet** or **Gemini Pro** | Planning is output-heavy and concrete; cheap models do it ~equally well |
| Executing a complex plan | Whichever the task needs | If the plan is concrete enough, Sonnet executes Opus's plan well |

**Rule of thumb**: ask *"would I notice the difference?"* If unsure, try Sonnet first. Escalate only on visible failure.

### The planner/executor split

You can use a cheap model to plan and Opus to execute. But:

- Inside Copilot CLI / Claude Code: use `/model` to switch within one session — no tool-switching overhead.
- Across tools (Gemini CLI → Claude Code): adds ~5 min context-shuffling per task. Only worth it for very large plans.
- **The plan must be structurally concrete** (file paths, function signatures, test names). Vague plans get silently re-planned by the executor → no savings.

---

## Part 5 — Subscription vs API

| Plan | $/mo | Per 5h window (Opus, approx) | Fits the June pattern? |
|---|---|---|---|
| Claude Pro | $20 | ~50 K tokens | No — one short task/day |
| Claude Max 5x | $100 | ~250 K tokens | No — capped daily |
| Claude Max 20x | $200 | ~1 M tokens | No — peak was ~100M/5h |
| API (pay-as-you-go) | ~$1,400–2,800 at June rate | Unlimited | Yes, but expensive |
| **API + this playbook** | **~$200–500** | Unlimited | **Recommended** |

**Why Max 20x doesn't fit**: peak day (Jun 5) burned 159 M input tokens in ~8h ≈ 100 M per 5h window. Max 20x caps at roughly 1 M Opus tokens per 5h. You'd hit the wall in minutes.

**The honest path**: stay on the API, apply the playbook, target $200–500/mo. Cheaper than Max 20x at equal-or-better throughput, with no rate-limit headaches.

---

## Part 6 — Free credits

| Program | Amount | Worth pursuing? |
|---|---|---|
| New-account welcome credit | $5 | No (≈ 25 min of work) |
| Hackathon promo codes | $25–500 | Marginal |
| Make-good incident credits | Variable | Auto-applied |
| Cloud marketplace trials (Bedrock/Vertex) | Variable | Only if you use those clouds |
| **Anthropic for Startups** | **up to $25K** | **Yes, if you have a real product** |
| Claude for Education | Variable | If you're a verified student/faculty |

**Bottom line**: the Startup program is the only one large enough to matter at this scale. ~9–18 months of coverage at June rates, ~24+ months after the playbook. Apply at <https://anthropic.com/startups> if `insta-ai-agent` (or any project) is shipping as a real service.

---

## Part 7 — Verification

End of each month, run this in Copilot CLI:

```
analyse my total usage this month, compare to last month
```

Targets:

- **Month 1 after playbook**: 3–5× reduction vs June. If less, behaviour isn't sticking.
- **Month 3**: steady state ~$200–500/mo.
- **If you slip back**: re-read the README in this repo. The rules don't change; adherence does.

---

## Part 8 — Anti-patterns (do not do these)

- Keep one giant rolling session for "all my work today"
- Open Claude in Opus by default
- Skip the `AGENTS.md` because "this repo is small"
- Accept vague plans like *"I'll add a function that handles X"*
- Let Claude commit on your behalf with `Co-authored-by:` AI trailers
- Read entire log files / build outputs into context
- Ask Claude to *"explore the codebase"* before giving it a concrete task
- Re-prompt the same question with slight rewordings — give the model better context instead
- Refuse to use Haiku for trivial tasks because *"Opus might do it better"*

---

## Part 9 — A worked example

**Bad workflow** (typical June session):

1. Open Claude Code in Opus, in a repo with no `AGENTS.md`.
2. Ask: *"help me improve my Instagram poster"*
3. Claude reads ~30 files to figure out the codebase (~500 K tokens of cache write).
4. Iterate over 25 turns: build, debug, refactor, add tests, all in one session.
5. By turn 25, each new turn re-reads ~5 M tokens of cached context.
6. Total: ~50 M input tokens for a half-day's work. ≈ $80–150 for that one session.

**Good workflow** (post-playbook):

1. Open Claude Code in Sonnet, in a repo *with* `AGENTS.md`.
2. Ask: *"add a retry mechanism to the post uploader. Plan first (file paths, signatures, test names), then execute."*
3. Sonnet reads the `AGENTS.md` (~2 K tokens), navigates straight to `src/uploader.py`.
4. Produces a 3-file plan in ~5 turns. Executes in ~6 turns. Tests pass.
5. Commit. `/clear`.
6. Open new session for the next task.
7. Total: ~3 M input tokens. ≈ $1–2 for the same work.

Same outcome. ~40× cheaper.

---

## Closing thought

The single most useful belief shift: **Claude is a paid tool, and the bill is mostly about hygiene, not capability.** Productive sessions are short, focused, well-fed (`AGENTS.md`), and end with a commit. Expensive sessions are long, exploratory, model-overpowered, and end with *"let me know if you want anything else."*

You now have everything you need. Stop reading. Go ship.
