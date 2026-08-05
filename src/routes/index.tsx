import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { loadContent } from "@/lib/cms";
import { abs } from "@/lib/seo";

// The x-default page, so its title carries both languages. Used when no CMS is
// configured, and as the fallback if its SEO fields are blank.
const TITLE = "Elite Wing · إيليت وينغ — وكالة تسويق إبداعية | Creative Marketing Agency";
const SHARE_TITLE = "Elite Wing · إيليت وينغ";
const DESC_AR =
  "إيليت وينغ · وكالة تسويق إبداعية في الرياض. حلول متكاملة في التسويق، الإعلام، الفعاليات، والإنتاج البصري.";
const DESC_EN =
  "Elite Wing — creative marketing agency from Riyadh. Integrated marketing, media, events, and visual production.";

export const Route = createFileRoute("/")({
  // Runs on the server for the first render, so the CMS copy is already in the
  // HTML that crawlers and social scrapers get, rather than swapped in after.
  loader: () => loadContent(),
  staleTime: 60_000,
  head: ({ loaderData }) => {
    const seo = loaderData?.settings.seo;
    const title = seo?.title?.ar || TITLE;
    // This page answers in both languages, so its description carries both.
    const description = seo?.description
      ? `${seo.description.ar} · ${seo.description.en}`
      : `${DESC_AR} · ${DESC_EN}`;
    const shareTitle = seo?.title?.ar || SHARE_TITLE;
    const shareDesc = seo?.description?.en || DESC_EN;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: shareTitle },
        { property: "og:description", content: shareDesc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: abs("/") },
        { property: "og:locale", content: "ar_SA" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: shareTitle },
        { name: "twitter:description", content: shareDesc },
      ],
      links: [
        { rel: "canonical", href: abs("/") },
        { rel: "alternate", hrefLang: "ar", href: abs("/ar/") },
        { rel: "alternate", hrefLang: "en", href: abs("/en/") },
        { rel: "alternate", hrefLang: "x-default", href: abs("/") },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Landing content={Route.useLoaderData()} />;
}
