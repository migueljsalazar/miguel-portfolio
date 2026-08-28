import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));

test("every project separates outcome from limits", async () => {
  const projects = await readJson("src/content/projects.json");
  for (const project of projects) {
    assert.ok(project.outcome.length >= 80, `${project.slug} needs a meaningful outcome statement`);
    assert.ok(project.limits.length >= 70, `${project.slug} needs an explicit limitation`);
    assert.notEqual(project.outcome, project.limits);
  }
});

test("all public links use HTTPS and recognizable destinations", async () => {
  const site = await readJson("src/content/site.json");
  const projects = await readJson("src/content/projects.json");
  const links = [...site.links, ...projects.flatMap((project) => project.links)];
  for (const link of links) {
    const url = new URL(link.url);
    assert.equal(url.protocol, "https:");
    assert.ok(["github.com", "www.instagram.com"].includes(url.hostname), `Unexpected public destination: ${url.hostname}`);
  }
});

test("published notes have complete article bodies", async () => {
  const notes = await readJson("src/content/notes.json");
  assert.ok(notes.length >= 3);
  for (const note of notes) {
    assert.match(note.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(note.body.every((paragraph) => paragraph.length >= 100));
  }
});
