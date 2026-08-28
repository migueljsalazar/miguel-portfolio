# Implementation plan

## Outcome

Build a fast, accessible portfolio that introduces Miguel's positioning and
best work immediately, then rewards exploration through an optional studio-like
spatial layer.

The experience should answer three questions in roughly 20 seconds:

1. Who is Miguel and what kind of work does he do?
2. Which projects best prove it?
3. How can a visitor continue the conversation?

Primary audience is provisionally defined as collaborators, clients, and
hiring teams. That should be confirmed before final copy is written.

## Experience model

```text
Home
├── View work now ──> Work index ──> Case study
└── Enter the room ─> Labeled objects ─┬─> Work
                                      ├─> About
                                      ├─> Notes / process
                                      └─> Contact
```

Both paths resolve to the same semantic pages. The room adds meaning and
memory; it does not hide content.

## Information architecture

- `/` — positioning, selected work, direct index action, optional room
- `/work` — filterable but simple selected-work index
- `/work/[slug]` — individual case study
- `/about` — biography, working principles, capabilities, and selected proof
- `/notes` — optional process notes, experiments, or studio log
- `/contact` — clear contact method and external profiles
- `/colophon` — credits, accessibility notes, and build provenance

Do not launch `/notes` empty. Hide it until at least three worthwhile entries
exist.

## Content contract

Each public case study should contain:

- title, year, one-sentence premise, and status;
- Miguel's exact role and collaborators;
- problem or opportunity;
- constraints and meaningful decisions;
- selected process evidence;
- outcome with defensible proof or an explicit limit on what is known;
- rights-approved media and credits;
- relevant live, repository, press, or demo links.

Never turn aspiration into an outcome claim. A prototype, local build, launch,
deployment, adoption result, and business result are separate proof states.

## Recommended technical approach

### Core

- Current stable Next.js with React and TypeScript.
- Server-rendered semantic routes for the content layer.
- MDX or typed local content files for the first version; no CMS until editing
  frequency justifies one.
- CSS custom properties plus CSS Modules for an intentionally bespoke visual
  system.
- Responsive images, self-hosted licensed fonts, and static metadata.

### Spatial enhancement

- A separately loaded React Three Fiber scene for capable desktop devices.
- Drei helpers only where they reduce custom code and bundle cost is measured.
- DOM-based labels and navigation over the canvas for accessibility.
- A designed static or lightweight 2D room for mobile, reduced-motion, data
  saver, WebGL failure, and low-power devices.
- Controlled project previews rather than live third-party iframes by default.

Why this split: it preserves DORF's memorable spatial idea while keeping the
portfolio readable, indexable, testable, and usable when 3D is unavailable.

### Strong alternative

Astro plus vanilla Three.js is a credible lower-JavaScript alternative. Choose
it if the first prototype shows that the portfolio is mostly editorial and the
scene needs little shared React state. Do not switch stacks before that
representative prototype is measured.

### Quality tooling

- unit tests for content utilities and interaction state;
- component tests for navigation, dialogs, filters, and fallbacks;
- Playwright flows for direct-work and enter-room paths;
- automated accessibility checks plus keyboard and screen-reader review;
- Lighthouse and real-device checks for performance;
- link, metadata, and rights/credit validation before launch.

Hosting and analytics remain deliberately unselected until preview behavior,
domain needs, privacy requirements, and cost are known.

## Build phases and gates

| Phase | Work | Exit gate |
| --- | --- | --- |
| 0. Public content audit | Select 3–6 case studies; confirm confidentiality, proof, media rights, credits, links, positioning, and contact path. | Every proposed public claim and asset has an owner and publication status. |
| 1. Experience prototype | Create two low-fidelity flows: direct work index and optional room. Test desktop and mobile with representative content. | A new visitor can reach a strong case study in two actions or fewer. |
| 2. Semantic foundation | Scaffold routes, content schema, tokens, navigation, metadata, image pipeline, and plain fallback pages. | Complete site works without WebGL and with keyboard-only navigation. |
| 3. Visual system | Apply the original material palette, typography, image direction, grids, focus states, and motion rules. | Two representative pages pass visual, responsive, contrast, and reduced-motion review. |
| 4. Spatial room | Model only the few objects that carry narrative meaning; add hotspots, loading/failure states, static fallback, and optional transitions. | Scene improves recall without slowing or blocking access to work. |
| 5. Case-study production | Finish selected stories, proof, captions, alt text, credits, and outbound links. | No placeholder claims or unapproved media remain. |
| 6. QA and launch | Cross-browser/device testing, performance tuning, SEO/share cards, accessibility review, domain and deployment verification. | Production URL, domain, routes, forms/links, analytics choice, and rollback path are verified. |

## Performance budgets

Treat these as gates, not late polish:

- meaningful identity and **View work** action render before the 3D chunk;
- mobile LCP target under 2.5 seconds at the 75th percentile;
- CLS under 0.1;
- no autoplay audio;
- no required 3D asset on content routes;
- lazy-load and compress models and textures with an explicit total scene
  budget established during the prototype;
- target smooth interaction on representative hardware, with automatic 2D
  fallback when the target cannot be sustained.

## Accessibility acceptance criteria

- Skip link and logical landmarks on every page.
- Every canvas hotspot has an equivalent DOM link and visible focus state.
- Full keyboard path through the primary experience.
- Reduced-motion path contains no camera travel or parallax.
- Text and controls meet WCAG AA contrast and target-size guidance.
- Decorative scene objects are hidden from assistive technology.
- Project media has useful alt text or is explicitly decorative.
- No information is communicated by color, motion, hover, or sound alone.

## Risks and mitigations

### Inspiration becoming imitation

Use Miguel's own room geometry, objects, copy, assets, and interaction map.
Maintain a source/rights log and review the result side by side with references
before launch.

### The spectacle obscuring the work

Render positioning and direct navigation first. Measure whether the room helps
visitors understand and remember the work; remove interactions that do not.

### Performance and mobile degradation

Load the scene independently, enforce asset budgets, and design the 2D path at
the same time rather than after desktop is complete.

### Public disclosure or unsupported claims

Require a publication status and proof state for every case study. Keep private,
client-confidential, or uncertain material out of the public repository.

### Third-party rights

Do not ship reference photography, logos, fonts, music, social posts, or 3D
models without an explicit license or permission.

## Inputs needed before implementation

- final public name and one-line positioning;
- 3–6 approved projects, with role, collaborators, outcome evidence, and links;
- a short biography and preferred contact route;
- rights-approved portraits and project media;
- 5–10 objects, materials, or rituals that genuinely represent Miguel's
  working world;
- desired domain and any existing brand assets;
- whether Notes is a real publishing commitment for launch or a later feature.

## First implementation milestone

After the inputs above are assembled, build one vertical slice:

1. the home identity block with both entry paths;
2. one fully written case study;
3. one room object that opens that case study;
4. the mobile/static equivalent;
5. keyboard, reduced-motion, and performance verification.

This slice is the decision point for continuing with full 3D, simplifying to a
2.5D composition, or using an editorial-first site with smaller spatial
moments.

## Definition of done

The project is complete only when the public site—not merely the local build—
has verified content, rights, accessibility, performance, responsive behavior,
domain routing, metadata, links, and a recoverable deployment. The immersive
layer must fail gracefully without weakening any of those outcomes.
