import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL as BASE_URL, abs } from "@/lib/seo";

interface Entry {
  path: string;
  changefreq?: string;
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [
          // Trailing slashes: the host 301s /ar -> /ar/, and a sitemap of
          // redirects wastes crawl budget.
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/ar/", changefreq: "weekly", priority: "1.0" },
          { path: "/en/", changefreq: "weekly", priority: "1.0" },
        ];

        const urls = entries.map((e) => {
          const alt = [
            `      <xhtml:link rel="alternate" hreflang="ar" href="${abs("/ar/")}"/>`,
            `      <xhtml:link rel="alternate" hreflang="en" href="${abs("/en/")}"/>`,
            `      <xhtml:link rel="alternate" hreflang="x-default" href="${abs("/")}"/>`,
          ].join("\n");
          return [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            alt,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
