import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site =
  process.env.PUBLIC_SITE_URL ??
  "https://miguel-portfolio.migueljsalazar.workers.dev";

export default defineConfig({
  site,
  integrations: [sitemap()],
  output: "static",
  trailingSlash: "always",
  build: {
    inlineStylesheets: "auto"
  },
  vite: {
    build: {
      sourcemap: false
    }
  }
});
