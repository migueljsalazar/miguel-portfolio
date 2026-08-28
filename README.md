# Miguel Portfolio

An original portfolio and brand site that treats the website as a working
creative space. It pairs a direct, evidence-led project index with an optional
spatial studio built entirely from semantic HTML and CSS.

## Status

The complete site is implemented. The production Cloudflare URL will be added
here after the first verified deployment.

- [Design contract](DESIGN.md)
- [Natural-language content guide](CONTENT_GUIDE.md)
- [Research synthesis](docs/RESEARCH.md)
- [Original implementation plan](docs/IMPLEMENTATION_PLAN.md)

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:4321` by default.

## Verification

```bash
npm run verify
```

That command validates public content, runs Astro's type/content checks, runs
the Node test suite, and creates the production build.

## Natural-language editing

Content and design are deliberately separate:

- `src/content/site.json` — identity, biography, capabilities, contact links
- `src/content/projects.json` — project index and case studies
- `src/content/notes.json` — field notes
- `src/styles/global.css` — visual tokens and component styling
- `DESIGN.md` — visual and interaction contract
- `AGENTS.md` — operating instructions for AI coding agents

See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for example prompts and proof rules.

## Cloudflare deployment

After authenticating Wrangler once with `npx wrangler login`:

```bash
npm run deploy
```

The production build is deployed as static assets under the Cloudflare Worker
named `miguel-portfolio`.

After deployment, verify the actual public origin rather than treating a
successful upload as proof that the site works:

```bash
npm run verify:live -- https://your-production-origin.example
```

## Public-repository boundary

This repository contains public-source project facts, original analysis,
original CSS artwork, and implementation code. It does not contain private
project details, credentials, client material, or third-party reference images.

Before portfolio content is committed, every case study and media asset should
be reviewed for confidentiality, attribution, and publication rights.

## License

No license has been selected. Public repository visibility does not grant
permission to reuse the contents.
