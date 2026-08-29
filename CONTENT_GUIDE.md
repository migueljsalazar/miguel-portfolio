# Natural-language content guide

The site is editable without a CMS. Ask an AI coding agent for a content or
design change in plain language; the agent should edit the files described
below, run `npm run verify`, inspect the result, and deploy only after checks
pass.

## Common requests

Examples that map cleanly to the repository:

- “Change my home-page positioning to …” → `src/content/site.json`
- “Add this public project and mark it as a prototype” →
  `src/content/projects.json`
- “Update AidSight with this verified outcome and source” → the AidSight object
  in `src/content/projects.json`
- “Publish this note about product research” → `src/content/notes.json`
- “Make the site warmer and less technical” → tokens and selected rules in
  `src/styles/global.css`, while preserving `DESIGN.md`
- “Change the studio's monitor interaction” →
  `src/components/StudioRoom.astro` plus visual verification
- “Ship these changes” → `npm run deploy`, followed by
  `npm run verify:live -- https://miguel-portfolio.migueljsalazar.workers.dev`

## Project fields

Every project requires:

- `slug` — lowercase URL identifier
- `title`, `year`, `eyebrow`, `summary`, `status`
- `problem` — the human or product problem
- `scope` — what was actually made
- `approach` — at least three concrete decisions
- `proof` — at least three labeled, defensible facts
- `outcome` — what the current artifact proves
- `limits` — what it does not prove
- `tags`, `visual`, and one or more public `links`

Allowed `visual` values are `signal`, `orbit`, and `score`. A new visual name
requires a matching implementation in `ProjectVisual.astro` and CSS.

## Note fields

Every published note requires a unique `slug`, ISO date, note number, title,
summary, at least two substantive body paragraphs, and an internal `related`
route.

## Proof discipline

Do not convert aspiration into evidence. Use these states consistently:

1. concept
2. prototype
3. working local build
4. public deployment
5. launch
6. observed adoption
7. measured outcome

When a source only proves state 2, do not write copy that implies states 5–7.

## Publication safety

Before adding material, confirm it is appropriate for a public GitHub repo and
public website. Do not paste private documents, credentials, hidden client
details, personal addresses, or unlicensed media into an agent prompt intended
for this project.
