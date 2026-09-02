# Agent operating guide

This repository is intentionally structured so Miguel can change the portfolio
through natural-language requests to an AI coding agent.

## Start here

Read these files before editing:

1. `README.md` — commands and deployment state
2. `DESIGN.md` — visual and interaction contract
3. `CONTENT_GUIDE.md` — content schema and proof rules

## Where changes belong

- General identity, biography, capabilities, principles, and links:
  `src/content/site.json`
- Projects and case-study claims: `src/content/projects.json`
- Published notes: `src/content/notes.json`
- Color, type, spacing, responsive behavior, and component styling:
  `src/styles/global.css`
- Reusable UI: `src/components/`
- Page composition and metadata: `src/pages/`
- Cloudflare hosting: `wrangler.jsonc`

Prefer editing the content JSON or top-level CSS tokens before changing page
markup. Keep data and presentation separate.

## Public-content rules

- This is a public repository and public website. Never add credentials,
  private-memory material, client-confidential details, personal contact data,
  or local research artifacts.
- A prototype, working local build, public deployment, launch, adoption result,
  and business outcome are separate proof states. Preserve that distinction.
- New project metrics or outcomes require a public source or Miguel's explicit
  confirmation. When uncertain, state the limit instead of filling the gap.
- Use only original, licensed, or explicitly approved imagery, audio, fonts,
  logos, and models.
- References are inspiration. Do not reproduce another studio, site, brand,
  photograph, logo, or signature interaction.

## Design rules

- Keep the direct work path visible before the spatial studio interaction.
- The studio must remain semantic DOM with real links; do not make WebGL or a
  canvas the only navigation surface.
- Preserve keyboard access, visible focus, reduced-motion behavior, mobile
  composition, and the day/night theme.
- Sound stays off unless Miguel explicitly requests it, and any sound must be
  opt-in.
- Do not add a CMS, analytics vendor, AI provider, database, or third-party
  runtime without a concrete need and an explicit decision record.

## Verification contract

Run this after every material change:

```bash
npm run verify
```

For visual changes, also run the local site and inspect desktop and mobile:

```bash
npm run dev
```

Capture browser artifacts under `output/playwright/`; that directory is
gitignored. Do not commit raw scrape or browser-session data.

## Deployment

The Cloudflare Worker name is `miguel-portfolio`. After Cloudflare authentication:

```bash
npm run deploy
```

Do not rename the Worker or change the canonical site URL without also updating
`astro.config.mjs`, `README.md`, and the deployment verification record.

After deployment, prove the public routes, canonical metadata, social image,
sitemap, robots file, and custom 404 against the exact production origin:

```bash
npm run verify:live -- https://miguel-portfolio.miguel-3d3.workers.dev
```
