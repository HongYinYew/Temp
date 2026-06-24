# Faceless Finance Instagram — Project Context

> The complete brief for this project: the goal, the strategy, the workflow, the toolstack, and the automation that ties it together. Exported from the planning session so anyone (or any tool) can pick this up with full context.

---

## 1. The goal

Build a **faceless personal-finance Instagram account** that produces **buyers, not just followers**, and monetise it **without ever showing my face**.

**Hard constraints:**
- **Faceless** — voiceover + B-roll + screen recordings + text overlays only. No face, ever.
- **Buyer-focused** — content attracts people who *spend*, not vanity followers.
- **≤ 4 hours/day**, solo operator. The system must be efficient and batchable.
- **Lean budget** — start at ~$6/mo of tooling; add cost only after revenue.

**Why this niche:** Personal finance & side hustles ranked #1 for *ease of faceless monetisation* — highest-paying affiliate programs (brokerages, fintech, credit tools), easy faceless format (text + B-roll + screen demos), and constant buyer intent.

---

## 2. The audience & their pain (content pillars)

Content is built around **20 real pain points**, in the audience's own voice. These are the permanent content pillars — each spins into ~5 posts.

**Debt & credit**
1. Drowning in credit-card debt, only paying minimums
2. Credit score stuck under 600, keep getting denied
3. Student loans feel like a life sentence

**Saving & cash**
4. Paycheck gone by the 15th
5. Groceries & rent eat everything — can't save
6. Money sitting in checking earning 0%
7. No emergency fund — one repair from disaster
8. Every budget falls apart in a week

**Investing**
9. Terrified to start, don't know the first click
10. 401k / Roth / employer match confusion (leaving free money)
11. 35+ with nothing saved — "too late?"

**Side income**
12. "Passive income" myths & scams
13. Tried side hustles, made nothing
14. Need a second income but zero spare time
15. How to turn an existing skill into money
16. Surprise tax bill from side-hustle income

**Income & career**
17. Underpaid, scared to ask for a raise
18. Want to quit the 9–5, don't know the number

**Big goals & mindset**
19. First home feels impossible
20. Impulse spending / money anxiety

---

## 3. The content system

**Formats:** Reels (reach), Carousels (saves), Stories (trust/warm-up). ~1 main post/day + daily stories.

**Hook = everything.** Bold, curiosity-driven, on-screen in the first 2 seconds. Reusable hook bank:
1. "Your bank is quietly betting you never read this."
2. "Broke by the 15th? It's not your salary."
3. "This $0 side hustle outearned my full-time job."
4. "Delete this one app. Save $400 a month."
5. "Your 'useless' skill is worth $1,000 a week."
6. "35 with nothing saved? Good. Here's why."
7. "The richest people keep money here, not checking."
8. "You're underpaid by $11,000. Here's the proof."
9. "One sentence cut my credit card interest in half."
10. "Stop saving money. Do this instead."

**Reel formula:** Hook (0–2s) → 3-beat value → CTA. Growth-phase CTA = *"Save + follow."* Money-phase CTA = *"Link in bio."* 80/20 value-to-ask even in monetisation weeks.

20 detailed 60-second reel scripts (one per pain point) and 7 seeded scripts (4 reels + 3 carousels) live in `content/scripts/`.

---

## 4. The 30-day launch calendar

**Weeks 1–2 = growth** (reach/saves/shares, zero selling). **Weeks 3–4 = monetisation** (affiliate links, then product). Never sell before Day 15 — the first two weeks *earn* the trust the last two *cash in*.

| Day | Format | Hook | Phase |
|----|--------|------|-------|
| 1 | Reel | Broke by the 15th? It's not your salary. | Growth |
| 2 | Carousel | 7 silent expenses draining your account. | Growth |
| 3 | Reel | Your money is losing $400 a year right now. | Growth |
| 4 | Carousel | The budget that finally stuck — steal it. | Growth |
| 5 | Reel | Your credit score isn't low because you're broke. | Growth |
| 6 | Reel | You're one $600 repair from disaster. | Growth |
| 7 | Carousel | 5 money wins you can do this weekend. | Growth |
| 8 | Reel | Every passive income guru is lying to you. | Growth |
| 9 | Carousel | 5 money mistakes keeping you poor. | Growth |
| 10 | Reel | You're not bad with money — your brain is wired to spend. | Growth |
| 11 | Carousel | Investing for people who hate investing. | Growth |
| 12 | Reel | Your budget didn't fail. It was built to fail. | Growth |
| 13 | Reel | 35 with nothing saved? Good. Here's why. | Growth |
| 14 | Carousel | Start here if you're broke and tired of it. (pin) | Growth |
| 15 | Reel | The account rich people use instead of checking. | Money (HYSA affiliate) |
| 16 | Carousel | I tested 3 budgeting apps so you don't have to. | Money (affiliate) |
| 17 | Reel | You're one click from your first investment. | Money (brokerage affiliate) |
| 18 | Carousel | The 5 free apps managing all my money. | Money (multi-affiliate) |
| 19 | Reel | One app raised my credit 40 points. | Money (affiliate) |
| 20 | Carousel | Made side money? The tax bill is coming. | Money (tax-software affiliate) |
| 21 | Reel | This $0 side hustle outearned my full-time job. | Money (UGC/soft offer) |
| 22 | Carousel | I'm giving away my entire budget template. | Money (lead magnet) |
| 23 | Reel | This is what 30 days of tracking money looks like. | Money (social proof) |
| 24 | Reel | You don't need more money. You need this system. | Money (bridge) |
| 25 | Carousel | The exact system I used to save my first $5k. | Money (resell product) |
| 26 | Reel | "I don't earn enough to save" — watch this. | Money (objection) |
| 27 | Carousel | Everything you asked me about money, answered. | Money (FAQ/trust) |
| 28 | Reel | Last chance before this comes down. | Money (scarcity) |
| 29 | Reel | Save this before your next paycheck. | Money (re-trigger) |
| 30 | Carousel | Your entire money turnaround in one post. | Money (mega-recap) |

**Stories** run daily as a 3-frame layer (Hook/poll → value → CTA), with anchor moments on Days 4, 10, 17, 21, 24, 28.

---

## 5. Monetisation strategy (no own product required)

Four income streams, stacked in this order:

1. **Affiliate marketing — START HERE (Day 1).** Zero followers, zero cost, passive, highest payouts in this niche (brokerages, HYSAs, budgeting apps, credit tools, tax software via Impact/CJ/FlexOffers). Links in bio + comments.
2. **UGC (Weeks 2–4).** Get paid $50–$500/video to create faceless content *for brands' own channels*. Needs a 2–3 video portfolio + outreach; no audience required. Fastest real cash.
3. **Digital products with resell rights (~1k+ followers).** Buy MRR/PLR finance products (spreadsheets, ebooks), sell as your own. Be selective — avoid the MLM-ish recycled stuff.
4. **Brand deals (5k–10k+ followers).** ~$100 per 10k followers/post. Requires an audience first — the payoff, not the starting move.

**Principle:** affiliate + UGC fund you *immediately* with no audience; resell products and brand deals scale *after* you've built one.

---

## 6. Production workflow (≤ 4 hrs/day)

**Core rule: batch by task type, produce one week ahead.** Never script, film, and edit the same day. Reuse the script library — adapt, don't rewrite.

| Day | Batch task | ~Time (+ daily layer) |
|-----|-----------|------------------------|
| Mon | Plan + script all 7 (reuse library) + captions | 3.0 h |
| Tue | Gather all B-roll + batch all voiceovers + music | 3.0 h |
| Wed | Edit reels — batch 1 (one CapCut template) | 3.5 h |
| Thu | Edit reels — batch 2 + carousels (Canva) | 3.5 h |
| Fri | Schedule all 7 in Meta Business Suite + stories | 2.0 h |
| Sat | Stories + engagement only | 0.75 h |
| Sun | Stories + engagement + analytics review | 1.0 h |

**≈ 17.5 hrs/week** — well under the 28-hr ceiling.

**Daily non-negotiable (~30–45 min):** verify the scheduled post is live → 1–3 story frames → engagement window (reply to every comment/DM in the first 60 min + comment on 10 bigger niche accounts).

---

## 7. Toolstack & costs

| Need | Tool | Cost | Notes |
|------|------|------|-------|
| Voiceover | **ElevenLabs Starter** | **$6/mo** | Commercial license (required for monetised use). Use **Flash v2.5** model (~0.5 credit/char). 30 reels ≈ ~30k credits; Flash + free same-text regenerations make Starter comfortably enough. Lock ONE voice (e.g. Adam for authority, or Chris/Sarah for relatable) for brand recognition. |
| B-roll (free) | Pexels, Pixabay, Mixkit, Coverr, Videvo | $0 | Commercial-safe. LottieFiles for animated finance icons. Check Videvo's per-clip license. |
| Editing — reels | CapCut | $0 | One reusable template, assembly-line. |
| Editing — carousels | Canva | $0 | One reusable template. |
| Scheduling | Meta Business Suite | $0 | Auto-publishes; you only do engagement live. |
| AI video (selective) | Higgsfield | paid | Only the ~10% stock can't give (cinematic/signature shots). Not for everything. |

**B-roll sourcing split:** ~60% free stock · ~15% your own screen recordings (most valuable — real app demos build trust, AI mangles on-screen numbers) · ~15% motion graphics in CapCut/Canva/Lottie · ~10% AI-generated. Don't AI-generate everything: cost, render time, artifacts on text/hands/numbers, and Instagram down-ranks obvious-AI content.

---

## 8. The automation pipeline

A **zero-dependency Node pipeline** (this repo) turns the content calendar into **7 ready-to-schedule post folders per week** with one command. You then drag the assets + captions into Meta Business Suite.

**Flow:** `calendar.json` → load script from library → write `caption.txt` + `overlays.txt` → ElevenLabs voiceover (`voiceover.mp3`) → B-roll shot list → package `week-XX/` folders.

**Runs with zero keys in mock mode** (writes narration text instead of audio), so it's safe to run and inspect before spending anything. See `README.md` for setup and the API keys to add.

**Roadmap:**
- [x] **Phase 1 (MVP)** — calendar → scripts → captions → overlays → ElevenLabs VO → packaged folders
- [ ] **Phase 2** — Pexels auto-fetch B-roll + Whisper subtitles
- [ ] **Phase 3** — Remotion render → finished `reel.mp4` + carousel PNGs
- [ ] **Phase 4** — Windows Task Scheduler: auto-generate next week every Thursday night
- [ ] **Phase 5 (optional)** — auto-publish via Instagram Graph API (skip Meta Business Suite)

**What stays manual (by design):** recording app/screen demos, a ~10-min taste/compliance review (finance claims need a sanity check), and — for now — scheduling in Meta Business Suite.

---

## 9. Definition of success

By **Friday each week**: 7 finished, on-brand, scheduled posts — produced in under 4 hrs/day, faceless, with an affiliate or product link in the path. Growth compounds in Weeks 1–2; revenue starts in Weeks 3–4 via affiliate links, then UGC, then a resell-rights product.
