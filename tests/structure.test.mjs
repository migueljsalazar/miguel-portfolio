import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

test("critical semantic routes exist", async () => {
  const routes = [
    "src/pages/index.astro",
    "src/pages/work/index.astro",
    "src/pages/work/[slug].astro",
    "src/pages/about.astro",
    "src/pages/notes/index.astro",
    "src/pages/notes/[slug].astro",
    "src/pages/contact.astro",
    "src/pages/colophon.astro",
    "src/pages/404.astro"
  ];
  await Promise.all(routes.map((route) => access(resolve(root, route))));
});

test("the visual system includes focus and reduced-motion behavior", async () => {
  const css = await readFile(resolve(root, "src/styles/global.css"), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.skip-link/);
});

test("the studio provides direct semantic links", async () => {
  const studio = await readFile(resolve(root, "src/components/StudioRoom.astro"), "utf8");
  for (const href of ["/work/", "/about/", "/notes/", "/contact/"]) {
    assert.ok(studio.includes(`href=\"${href}\"`), `Studio is missing ${href}`);
  }
});
