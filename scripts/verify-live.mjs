const requestedOrigin = process.argv[2] ?? process.env.PUBLIC_SITE_URL;

if (!requestedOrigin) {
  throw new Error(
    "Pass the deployed origin: npm run verify:live -- https://your-site.example"
  );
}

const parsedOrigin = new URL(requestedOrigin);
if (parsedOrigin.protocol !== "https:") {
  throw new Error("Live verification requires an HTTPS origin.");
}

parsedOrigin.pathname = "/";
parsedOrigin.search = "";
parsedOrigin.hash = "";

const origin = parsedOrigin.href.replace(/\/$/, "");
const htmlRoutes = [
  "/",
  "/work/",
  "/work/aidsight/",
  "/work/naked-health/",
  "/work/fashion-ai/",
  "/about/",
  "/notes/",
  "/notes/reachability-is-a-design-material/",
  "/notes/nostalgia-is-an-instrument/",
  "/notes/name-the-proof-state/",
  "/contact/",
  "/colophon/"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i")
  );
  return match?.[1] ?? match?.[2] ?? match?.[3];
}

function findTag(html, tagName, attributeName, attributeValue) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
  return tags.find(
    (tag) => attribute(tag, attributeName)?.toLowerCase() === attributeValue.toLowerCase()
  );
}

async function fetchRoute(path, expectedStatus = 200) {
  const url = new URL(path, `${origin}/`);
  const response = await fetch(url, { redirect: "follow" });
  assert(
    response.status === expectedStatus,
    `${path} returned ${response.status}; expected ${expectedStatus}`
  );
  return response;
}

for (const path of htmlRoutes) {
  const response = await fetchRoute(path);
  assert(
    response.headers.get("content-type")?.startsWith("text/html"),
    `${path} did not return HTML`
  );

  const html = await response.text();
  const expectedUrl = new URL(path, `${origin}/`).href;
  const canonicalTag = findTag(html, "link", "rel", "canonical");
  const ogUrlTag = findTag(html, "meta", "property", "og:url");
  const ogImageTag = findTag(html, "meta", "property", "og:image");

  assert(canonicalTag, `${path} is missing a canonical link`);
  assert(ogUrlTag, `${path} is missing og:url`);
  assert(ogImageTag, `${path} is missing og:image`);
  assert(
    new URL(attribute(canonicalTag, "href")).href === expectedUrl,
    `${path} canonical URL does not match ${expectedUrl}`
  );
  assert(
    new URL(attribute(ogUrlTag, "content")).href === expectedUrl,
    `${path} og:url does not match ${expectedUrl}`
  );
  assert(
    new URL(attribute(ogImageTag, "content")).href === `${origin}/og-image.png`,
    `${path} og:image does not use the production PNG`
  );
}

const missingResponse = await fetchRoute("/__live-verification-missing__/", 404);
const missingHtml = await missingResponse.text();
const robotsTag = findTag(missingHtml, "meta", "name", "robots");
assert(missingHtml.includes("This object isn't in the room."), "Custom 404 copy is missing");
assert(
  attribute(robotsTag ?? "", "content")?.toLowerCase().includes("noindex"),
  "Custom 404 is missing noindex metadata"
);

const imageResponse = await fetchRoute("/og-image.png");
assert(
  imageResponse.headers.get("content-type")?.startsWith("image/png"),
  "Open Graph image is not served as PNG"
);
assert((await imageResponse.arrayBuffer()).byteLength > 10_000, "Open Graph PNG is unexpectedly small");

const manifestResponse = await fetchRoute("/site.webmanifest");
const manifest = await manifestResponse.json();
assert(manifest.name === "Miguel Salazar — Portfolio", "Web manifest identity is incorrect");

const sitemapResponse = await fetchRoute("/sitemap-index.xml");
assert((await sitemapResponse.text()).includes(origin), "Sitemap does not use the production origin");

const publicRobotsResponse = await fetchRoute("/robots.txt");
assert(
  (await publicRobotsResponse.text()).includes(`${origin}/sitemap-index.xml`),
  "robots.txt does not point to the production sitemap"
);

console.log(
  `Live verification passed: ${htmlRoutes.length} HTML routes, production metadata, public assets, and custom 404 at ${origin}`
);
