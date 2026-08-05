import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { loadContent } from "@/lib/cms";
import { abs } from "@/lib/seo";

// Used when no CMS is configured, and as the fallback if its SEO fields are
// blank. See src/lib/cms.ts for the switch.
const TITLE = "إيليت وينغ · وكالة تسويق إبداعية في الرياض";
const DESC =
  "إيليت وينغ — حلول إبداعية متكاملة في التسويق، الإعلام، الفعاليات، والإنتاج البصري. شريكك الوطني نحو حضورٍ يُقاس بالأثر.";

export const Route = createFileRoute("/ar")({
  // Runs on the server for the first render, so the CMS copy is already in the
  // HTML that crawlers and social scrapers get, rather than swapped in after.
  loader: () => loadContent(),
  // Matches the API's own Cache-Control, so a client-side revisit does not
  // refetch content that is still fresh.
  staleTime: 60_000,
  head: ({ loaderData }) => {
    const seo = loaderData?.settings.seo;
    const title = seo?.title?.ar || TITLE;
    const description = seo?.description?.ar || DESC;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: abs("/ar/") },
        { property: "og:locale", content: "ar_SA" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        { rel: "canonical", href: abs("/ar/") },
        { rel: "alternate", hrefLang: "ar", href: abs("/ar/") },
        { rel: "alternate", hrefLang: "en", href: abs("/en/") },
        { rel: "alternate", hrefLang: "x-default", href: abs("/") },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Landing lang="ar" content={Route.useLoaderData()} />;
}
