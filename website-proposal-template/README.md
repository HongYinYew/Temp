# Website Proposal Template

A reusable, opinionated proposal template for selling websites to SMEs — built around an AI-assisted production pipeline (e.g. Claude for strategy/copy/code + Higgsfield for cinematic visuals).

## What's in this folder

| File | Purpose |
|---|---|
| `PROPOSAL.md` | The proposal template itself. Duplicate per client, fill placeholders, export to PDF. |
| `README.md` | This file. How to use and customize the template. |

## How to use

1. **Duplicate** `PROPOSAL.md` into a per-client file: `proposals/{{client-slug}}-proposal.md`.
2. **Find & replace** every `{{PLACEHOLDER}}` token. A quick list:
   - `{{CLIENT_NAME}}`, `{{CLIENT_COMPANY}}`, `{{CLIENT_CONTACT}}`
   - `{{YOUR_AGENCY_NAME}}`, `{{YOUR_NAME}}`, `{{YOUR_EMAIL}}`, `{{YOUR_PHONE}}`
   - `{{DATE}}`, `{{VALID_UNTIL_DATE}}` (recommend 14 days out)
   - `{{TIER_NAME}}`, `{{TIER_PRICE}}`, `{{PAGE_COUNT}}`, `{{TECH_STACK}}`
   - `{{CURRENCY}}` (defaults to MYR — change if selling abroad)
   - `{{SST_STATUS}}` (state whether you're SST-registered)
   - `{{STATE}}` (e.g. Kuala Lumpur, Selangor — for jurisdiction)
   - `{{TIMELINE_WEEKS}}`, `{{START_DATE}}`, `{{LAUNCH_DATE}}`
3. **Delete** the tier rows / add-ons the client isn't getting (or keep them visible as anchors).
4. **Update prices** to current rates. Recurring-cost figures are 2026 ballpark estimates — verify against the provider before sending.
5. **Export to PDF** (recommended: VS Code "Markdown PDF" extension, or Pandoc, or paste into Google Docs).
6. **Send via Loom + PDF** — a 5-minute walkthrough of the proposal closes 2-3× better than the PDF alone.

## Pricing philosophy baked in

- **Three tiers** (Starter / Growth / Authority) — Growth is the anchor and should win ~70% of the time.
- **Care plan is non-optional** for the Growth and Authority tiers. It's where the real LTV lives.
- **One-time fee + monthly recurring** — never sell a one-off site with no ongoing relationship.
- **Direct third-party costs** (domain, email, etc.) are itemized transparently so the client never feels surprise-billed.

## Customization tips

- This template is **Malaysia-localized** by default: prices in MYR, SST 8% references, FPX/DuitNow payment methods, .com.my domain guidance, Malaysian jurisdiction. If you sell into Singapore or international markets, duplicate `PROPOSAL.md`, convert prices using your *list price* in the target market (don't just FX-convert — round to nice local-feeling numbers, e.g. `RM 12,800 MYR → S$4,200 SGD → $3,800 USD`).
- If you don't use Higgsfield/AI video, delete the "Cinematic Hero Film" line items and rename the Growth tier.
- If you're a solo operator, soften the "team" language in section 12.
- For regulated industries (legal, medical, financial) remove AI-generated imagery references and add a compliance-review line item.
- If you're not yet SST-registered (under RM 500,000 annual turnover), update Section 5.4 accordingly and remove the SST line from 5.2.

## Legal note

This is a sales proposal, not a contract. Always pair it with a separate signed master services agreement (MSA) or statement of work (SOW) before starting work. The "Acceptance" block at the end of the proposal is a non-binding intent indicator unless your jurisdiction recognizes it otherwise — consult a lawyer for your local market.
