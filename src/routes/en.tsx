import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { loadContent } from "@/lib/cms";
import { abs } from "@/lib/seo";

// Used when no CMS is configured, and as the fallback if its SEO fields are
// blank. See src/lib/cms.ts for the switch.
const TITLE = "Elite Wing — Creative Marketing Agency in Riyadh";
const DESC =
  "Elite Wing — integrated creative solutions in marketing, media, events, and visual production. Your national partner for measurable brand impact.";

export const Route = createFileRoute("/en")({
  // Runs on the server for the first render, so the CMS copy is already in the
  // HTML that crawlers and social scrapers get, rather than swapped in after.
  loader: () => loadContent(),
  staleTime: 60_000,
  head: ({ loaderData }) => {
    const seo = loaderData?.settings.seo;
    const title = seo?.title?.en || TITLE;
    const description = seo?.description?.en || DESC;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: abs("/en/") },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "ar_SA" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        { rel: "canonical", href: abs("/en/") },
        { rel: "alternate", hrefLang: "ar", href: abs("/ar/") },
        { rel: "alternate", hrefLang: "en", href: abs("/en/") },
        { rel: "alternate", hrefLang: "x-default", href: abs("/") },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Landing lang="en" content={Route.useLoaderData()} />;
}
