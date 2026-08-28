import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

async function readJson(path) {
  return JSON.parse(await readFile(resolve(root, path), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertText(value, label) {
  assert(typeof value === "string" && value.trim().length > 0, `${label} must be non-empty text`);
}

function assertUrl(value, label) {
  assertText(value, label);
  const url = new URL(value);
  assert(url.protocol === "https:", `${label} must use HTTPS`);
}

function assertUniqueSlugs(items, label) {
  const slugs = items.map((item) => item.slug);
  assert(new Set(slugs).size === slugs.length, `${label} slugs must be unique`);
  slugs.forEach((slug) => assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), `${label} slug "${slug}" is invalid`));
}

const [site, projects, notes] = await Promise.all([
  readJson("src/content/site.json"),
  readJson("src/content/projects.json"),
  readJson("src/content/notes.json")
]);

["name", "headline", "intro", "bio", "location", "availability", "contactPrompt"].forEach((field) =>
  assertText(site[field], `site.${field}`)
);
assert(Array.isArray(site.capabilities) && site.capabilities.length >= 4, "site.capabilities needs at least four entries");
assert(Array.isArray(site.principles) && site.principles.length === 4, "site.principles must contain four entries");
assert(Array.isArray(site.links) && site.links.length >= 2, "site.links needs at least two public contact routes");
site.links.forEach((link, index) => assertUrl(link.url, `site.links[${index}].url`));

assert(Array.isArray(projects) && projects.length >= 3, "At least three projects are required for launch");
assertUniqueSlugs(projects, "Project");
projects.forEach((project, index) => {
  ["title", "year", "summary", "status", "problem", "scope", "outcome", "limits", "visual"].forEach((field) =>
    assertText(project[field], `projects[${index}].${field}`)
  );
  assert(Array.isArray(project.approach) && project.approach.length >= 3, `${project.slug} needs at least three approach points`);
  assert(Array.isArray(project.proof) && project.proof.length >= 3, `${project.slug} needs at least three proof items`);
  assert(Array.isArray(project.tags) && project.tags.length >= 3, `${project.slug} needs at least three tags`);
  assert(Array.isArray(project.links) && project.links.length >= 1, `${project.slug} needs at least one public link`);
  project.links.forEach((link, linkIndex) => assertUrl(link.url, `${project.slug}.links[${linkIndex}].url`));
});

assert(Array.isArray(notes) && notes.length >= 3, "At least three notes are required to publish the Notes route");
assertUniqueSlugs(notes, "Note");
notes.forEach((note, index) => {
  ["date", "number", "title", "summary", "related"].forEach((field) => assertText(note[field], `notes[${index}].${field}`));
  assert(Array.isArray(note.body) && note.body.length >= 2, `${note.slug} needs at least two paragraphs`);
  assert(note.related.startsWith("/"), `${note.slug}.related must be an internal path`);
});

const serialized = JSON.stringify({ site, projects, notes });
assert(!/\b(?:TODO|TBD|lorem ipsum|your-email|example\.com)\b/i.test(serialized), "Content contains a placeholder value");

console.log(`Content valid: ${projects.length} projects, ${notes.length} notes, ${site.links.length} contact routes.`);
