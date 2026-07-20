import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";

const TITLE = "إيليت وينغ · وكالة تسويق إبداعية في الرياض";
const DESC =
  "إيليت وينغ — حلول إبداعية متكاملة في التسويق، الإعلام، الفعاليات، والإنتاج البصري. شريكك الوطني نحو حضورٍ يُقاس بالأثر.";

export const Route = createFileRoute("/ar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/ar" },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: "/ar" },
      { rel: "alternate", hrefLang: "ar", href: "/ar" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
  component: () => <Landing lang="ar" />,
});
