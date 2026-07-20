import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";

const DESC_AR =
  "إيليت وينغ · وكالة تسويق إبداعية في الرياض. حلول متكاملة في التسويق، الإعلام، الفعاليات، والإنتاج البصري.";
const DESC_EN =
  "Elite Wing — creative marketing agency from Riyadh. Integrated marketing, media, events, and visual production.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Wing · إيليت وينغ — وكالة تسويق إبداعية | Creative Marketing Agency" },
      { name: "description", content: `${DESC_AR} · ${DESC_EN}` },
      { property: "og:title", content: "Elite Wing · إيليت وينغ" },
      { property: "og:description", content: DESC_EN },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Elite Wing · إيليت وينغ" },
      { name: "twitter:description", content: DESC_EN },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "ar", href: "/ar" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
  component: () => <Landing />,
});
