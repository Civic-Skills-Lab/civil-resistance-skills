import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://levnikolaevich.github.io",
  base: "/civil-resistance-skills",
  output: "static",
  trailingSlash: "always",
  srcDir: "./site-src/src",
  publicDir: "./site-src/public",
  outDir: "./dist",
  integrations: [react()]
});
