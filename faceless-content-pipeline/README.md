# Faceless Content Pipeline

Turn a content calendar into **7 ready-to-schedule Instagram assets per week** (reels + carousels) for a faceless personal-finance account — with one command. You then drag the finished assets + captions into **Meta Business Suite** and schedule.

Built to run with **zero dependencies** and **zero API keys** in mock mode, so you can see exactly what it produces before spending a cent.

---

## What you get each week

For every post the pipeline produces a self-contained folder:

```
output/week-01/
├── INDEX.md                         ← summary table + your next steps
├── manifest.json                    ← machine-readable run record
├── 1-reel-vanishing-paycheck/
│   ├── caption.txt                  ← paste-ready IG caption + hashtags
│   ├── overlays.txt                 ← timestamped on-screen text
│   ├── voiceover.mp3                ← ElevenLabs audio (or .NARRATION.txt in mock)
│   ├── broll.txt                    ← shot list (Phase 2 auto-fetches these)
│   └── script.json                  ← archived script
├── 2-carousel-spending-leaks/
│   ├── caption.txt
│   ├── slides.txt                   ← slide-by-slide text
│   └── script.json
└── ...
```

---

## Quick start (no keys needed)

```powershell
node src/index.js --week 1 --mock
```

This runs the whole pipeline with **no API calls** — voiceovers are written out as the exact narration text that *would* be synthesised. Open `output/week-01/INDEX.md` to review the pack.

## Going live (real voiceovers)

1. Copy `.env.example` to `.env` and add your ElevenLabs key:
   ```
   ELEVENLABS_API_KEY=sk_...
   ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB   # your locked brand voice
   ELEVENLABS_MODEL_ID=eleven_flash_v2_5      # ~half the credits per char
   ```
2. Run with the key loaded:
   ```powershell
   node --env-file=.env src/index.js --week 1
   ```
   Now each reel folder gets a real `voiceover.mp3`. Drop `--mock` is automatic — live mode activates whenever `ELEVENLABS_API_KEY` is present.

> 🔐 **Never commit `.env`.** It is git-ignored. Keys live only in your environment.

---

## How it works

| Stage | What it does | Tool | Phase |
|------|--------------|------|-------|
| Plan | Reads the week's 7 posts | `content/calendar.json` | ✅ 1 |
| Script | Loads the reusable script (no re-writing) | `content/scripts/*.json` | ✅ 1 |
| Caption | Writes paste-ready caption + hashtags | built-in | ✅ 1 |
| Overlays | Emits timestamped on-screen text | built-in | ✅ 1 |
| Voiceover | Synthesises narration | ElevenLabs API (Flash) | ✅ 1 |
| B-roll | Writes a shot list / auto-fetches clips | Pexels API | 🔜 2 |
| Subtitles | Word-timed burned captions | Whisper (local) | 🔜 2 |
| Render | Composites reel.mp4 / carousel PNGs | Remotion / FFmpeg | 🔜 3 |
| Schedule | Auto-publish | Instagram Graph API | 🔜 5 (optional) |

The **mock/library-first** design means topics you've already scripted cost **zero** LLM/API usage — the pipeline just reuses `content/scripts/`.

---

## Adding content

**1. Add a week to `content/calendar.json`:**
```json
"2": [
  { "day": 8, "format": "reel", "scriptId": "passive-income-myths", "cta": "save-follow" }
]
```

**2. Add the matching script** at `content/scripts/passive-income-myths.json`:
- **Reel:** `{ hook, beats:[{ t, overlay, vo, broll:[] }], cta:{ overlay, vo }, caption, hashtags }`
- **Carousel:** `{ hook, slides:[{ n, title, body }], caption, hashtags }`

If a `scriptId` has no file, the pipeline flags it (`TODO-author-script.txt`) instead of failing — so you always get a partial pack.

---

## Roadmap

- [x] **Phase 1 (MVP)** — calendar → scripts → captions → overlays → ElevenLabs VO → packaged folders
- [ ] **Phase 2** — Pexels auto-fetch B-roll + Whisper subtitles
- [ ] **Phase 3** — Remotion render → finished `reel.mp4` + carousel PNGs
- [ ] **Phase 4** — Windows Task Scheduler: auto-generate next week every Thursday night
- [ ] **Phase 5 (optional)** — auto-publish via Instagram Graph API (skip Meta Business Suite)

## Added cost

ElevenLabs (Starter $6/mo) · Pexels (free) · Whisper (free, local) · Remotion (free OSS) · Task Scheduler (free).

## Commands

```powershell
node src/index.js --week 1 --mock     # dry run, no keys
node --env-file=.env src/index.js --week 1   # live voiceovers
node src/index.js --week 1 --out D:\drops     # custom output dir
```
