import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";

const TITLE = "Elite Wing — Creative Marketing Agency in Riyadh";
const DESC =
  "Elite Wing — integrated creative solutions in marketing, media, events, and visual production. Your national partner for measurable brand impact.";

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/en" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "ar_SA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: "/en" },
      { rel: "alternate", hrefLang: "ar", href: "/ar" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
  component: () => <Landing lang="en" />,
});
