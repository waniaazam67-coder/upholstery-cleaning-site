// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Temporary Vercel address. Replace with the real domain once it is confirmed (see decisions.md).
const SITE_URL = "https://upholstery-cleaning-dubai.vercel.app";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [sitemap()],
  image: {
    // Generate responsive srcset/sizes for every <Image>/<Picture> by default.
    layout: "constrained",
  },
});
