// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build mode (see .github/workflows/deploy-pages.yml): the site is
// fully client-side by then, so build a static SPA export instead of a server.
const ghPages = process.env["GH_PAGES_BUILD"] === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(ghPages ? { spa: { enabled: true } } : {}),
  },
  ...(ghPages ? { vite: { base: process.env["GH_PAGES_BASE"] || "/" } } : {}),
});
