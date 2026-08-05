// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The cPanel host (Apache + PHP, no Node) can only serve files, so the build
// renders every page to HTML at build time instead of per request. Lovable's own
// build ignores the preset and keeps targeting Cloudflare.
const STATIC = process.env.STATIC === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(STATIC && {
      prerender: { enabled: true, crawlLinks: true },
      // Nothing links to the sitemap, so the crawler never reaches it.
      // autoSubfolderIndex off, or it lands in sitemap.xml/index.html.
      pages: [{ path: "/sitemap.xml", prerender: { autoSubfolderIndex: false } }],
    }),
  },
  // Nitro builds a server nobody will run, and its .output/ layout hides the
  // dist/server entry the prerenderer boots to render the pages.
  ...(STATIC && { nitro: false as const }),
});
