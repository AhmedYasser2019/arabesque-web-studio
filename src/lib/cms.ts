/* ---------------- Content source ----------------
 * The page renders from one `Content` object. There are two ways to get one:
 *
 *   VITE_CMS_URL unset  -> STATIC_CONTENT, the copy baked into this repo.
 *                          Exactly what the site has always shipped, no network.
 *   VITE_CMS_URL set    -> GET {url}/api/content from the Laravel panel.
 *
 * That env var is the whole switch. Both modes produce the same shape and feed
 * the same components, so there is no second renderer to drift out of sync —
 * and if the API is slow or down, the page falls back to STATIC_CONTENT rather
 * than rendering empty.
 */
import { t, type Lang } from "@/lib/i18n";
import logoLockup from "@/assets/logo-lockup.png";
import logoLockupLight from "@/assets/logo-lockup-light.png";

export type Loc = { ar: string; en: string };

export interface Section {
  anchor: string | null;
  kicker: Loc | null;
  title: Loc | null;
  titleAccent: Loc | null;
  subtitle: Loc | null;
  body: Loc | null;
  backdrop: string | null;
  backdropOpacity: number;
}

export interface Card {
  icon: string | null;
  title: Loc;
  body: Loc | null;
}

export interface Work {
  slug: string;
  category: string;
  title: Loc;
  poster: string | null;
  loop: string | null;
  film: string | null;
}

export interface Content {
  settings: {
    logo: { dark: string | null; light: string | null };
    favicon: string | null;
    ogImage: string | null;
    email: string | null;
    phone: string | null;
    location: Loc | null;
    /** Footer icons, in panel order. `platform` keys the icon map in Landing.tsx. */
    social: { platform: string; url: string }[];
    footer: { tagline: Loc | null; rights: Loc | null };
    seo: { title: Loc | null; description: Loc | null };
  };
  nav: { anchor: string; label: Loc }[];
  sections: Record<string, Section | undefined>;
  heroSlides: string[];
  stats: { icon: string; value: number; suffix: string | null; label: Loc }[];
  about: Card[];
  services: Card[];
  method: Card[];
  workCategories: { slug: string; title: Loc }[];
  works: Work[];
  partners: { name: string; logo: string | null; url: string | null }[];
  testimonials: { quote: Loc; name: Loc; role: Loc | null; avatar: string | null }[];
  labels: Record<string, Loc>;
}

/* ---------------- The switch ---------------- */

const CMS_URL = (import.meta.env.VITE_CMS_URL || "").replace(/\/+$/, "");

/** True when the site is reading its content from the panel. */
export const cmsEnabled = CMS_URL !== "";

/* ---------------- Static content ----------------
 * Assembled from the dictionary in i18n.tsx rather than restating the copy, so
 * there is still exactly one baked-in source for every Arabic and English
 * string. What used to be the hardcoded consts inside Landing.tsx now lives
 * here as the fallback half of the same shape the API returns. */

const s = (key: string): Loc => t[key] ?? { ar: "", en: "" };

const MEDIA = "/media";
/* The full films are ~112 MB, more than Cloudflare's free plan will serve, so
 * their origin stays switchable independently of the CMS. In CMS mode the
 * panel supplies absolute URLs and this is unused. */
const FILMS = (import.meta.env.VITE_MEDIA_URL || MEDIA).replace(/\/+$/, "");

const REEL: { slug: string; cat: string }[] = [
  // Tawuniya × Meena health activations hosted at corporate HQs
  { slug: "tawuniya", cat: "corporate" },
  { slug: "alrajhi", cat: "corporate" },
  { slug: "riyad-bank", cat: "corporate" },
  { slug: "anb", cat: "corporate" },
  { slug: "mobily", cat: "corporate" },
  { slug: "stc", cat: "corporate" },
  { slug: "real-estate-registry", cat: "corporate" },
  { slug: "gosh7", cat: "conf" },
  { slug: "workshop-mena", cat: "conf" },
  { slug: "r7", cat: "conf" },
  { slug: "padel", cat: "conf" },
  { slug: "khoyoot-altarekh", cat: "doc" },
  { slug: "majlis-turathi", cat: "doc" },
  { slug: "amanat-riyadh", cat: "doc" },
  { slug: "first-final", cat: "health" },
  { slug: "promo2", cat: "health" },
  { slug: "e-w", cat: "reel" },
  { slug: "elite-wing", cat: "reel" },
];

const CATS = ["corporate", "conf", "doc", "health", "reel"] as const;

/* Logos lifted from the "شركاء النجاح" slide of the portfolio deck, keyed to
 * transparent white so they sit on the dark surface without a plate. */
const PARTNERS = [
  { slug: "tawuniya", name: "Tawuniya" },
  { slug: "stc", name: "stc" },
  { slug: "saudia", name: "Saudia" },
  { slug: "nupco", name: "NUPCO" },
  { slug: "sirc", name: "SIRC" },
  { slug: "meena", name: "meena" },
  { slug: "qfmc", name: "QFMC" },
  { slug: "chefz", name: "The Chefz" },
  { slug: "r7", name: "R7 Run Club" },
  { slug: "waterburger", name: "Water Burger" },
  { slug: "khoyoot", name: "Khoyoot Al-Tarekh" },
];

/** How far each band's photo backdrop is allowed to come forward. */
const band = (
  key: string,
  anchor: string | null,
  backdrop: string | null,
  backdropOpacity = 0.45,
): Section => ({
  anchor,
  kicker: t[`${key}.kicker`] ?? null,
  title: t[`${key}.title`] ?? null,
  titleAccent: null,
  subtitle: t[`${key}.sub`] ?? null,
  body: t[`${key}.body`] ?? null,
  backdrop,
  backdropOpacity,
});

export const STATIC_CONTENT: Content = {
  settings: {
    logo: { dark: logoLockup, light: logoLockupLight },
    favicon: "/favicon.png",
    ogImage: `${MEDIA}/hero/1.jpg`,
    email: "info@elitewing.sa",
    phone: "+966 11 123 4567",
    location: s("contact.location.v"),
    // No accounts baked in: the panel owns this list, and a footer with no
    // icons beats one linking to "#".
    social: [],
    footer: { tagline: s("footer.tagline"), rights: s("footer.rights") },
    seo: {
      title: {
        ar: "إيليت وينغ · Elite Wing — وكالة تسويق إبداعية في الرياض",
        en: "Elite Wing — Creative Marketing Agency in Riyadh",
      },
      description: {
        ar: "إيليت وينغ · وكالة تسويق إبداعية في الرياض. حلول متكاملة في التسويق، الإعلام، الفعاليات، والإنتاج البصري.",
        en: "Elite Wing — integrated creative solutions in marketing, media, events, and visual production.",
      },
    },
  },

  nav: [
    { anchor: "about", label: s("nav.about") },
    { anchor: "services", label: s("nav.services") },
    { anchor: "method", label: s("nav.method") },
    { anchor: "gallery", label: s("works.kicker") },
    { anchor: "partners", label: s("nav.partners") },
    { anchor: "contact", label: s("nav.contact") },
  ],

  sections: {
    hero: {
      anchor: "top",
      kicker: s("hero.eyebrow"),
      title: s("hero.title.a"),
      titleAccent: s("hero.title.b"),
      subtitle: s("hero.sub"),
      body: null,
      backdrop: null,
      backdropOpacity: 0.45,
    },
    about: band("about", "about", `${MEDIA}/bg/1.jpg`),
    services: { ...band("svc", "services", `${MEDIA}/bg/2.jpg`) },
    method: band("method", "method", `${MEDIA}/bg/3.jpg`),
    gallery: {
      // Lower than the rest: this band already carries a wall of video cards
      // and legible text of its own.
      ...band("gal", "gallery", `${MEDIA}/bg/4.jpg`, 0.18),
    },
    partners: band("partners", "partners", `${MEDIA}/bg/2.jpg`, 0.3),
    testimonials: band("test", null, `${MEDIA}/bg/3.jpg`),
    newsletter: band("news", null, `${MEDIA}/bg/1.jpg`),
    contact: band("contact", "contact", `${MEDIA}/bg/4.jpg`),
  },

  heroSlides: [`${MEDIA}/hero/1.jpg`, `${MEDIA}/hero/2.jpg`, `${MEDIA}/hero/3.jpg`],

  stats: [
    { icon: "users", value: 250, suffix: "+", label: s("stats.clients") },
    { icon: "calendar", value: 450, suffix: "+", label: s("stats.events") },
    { icon: "map-pin", value: 15, suffix: "+", label: s("stats.cities") },
    { icon: "award", value: 10, suffix: "+", label: s("stats.years") },
  ],

  about: [
    { icon: "compass", title: s("about.vision.t"), body: s("about.vision.b") },
    { icon: "sparkles", title: s("about.mission.t"), body: s("about.mission.b") },
    { icon: "award", title: s("about.values.t"), body: s("about.values.b") },
  ],

  services: [
    { icon: "compass", title: s("svc.1.t"), body: s("svc.1.b") },
    { icon: "camera", title: s("svc.2.t"), body: s("svc.2.b") },
    { icon: "share-2", title: s("svc.3.t"), body: s("svc.3.b") },
    { icon: "wand-2", title: s("svc.4.t"), body: s("svc.4.b") },
  ],

  // Numbered 01–05 on the page, so no icons.
  method: [1, 2, 3, 4, 5].map((n) => ({
    icon: null,
    title: s(`method.${n}.t`),
    body: s(`method.${n}.b`),
  })),

  workCategories: CATS.map((slug) => ({ slug, title: s(`cat.${slug}`) })),

  works: REEL.map(({ slug, cat }) => ({
    slug,
    category: cat,
    title: s(`reel.${slug}`),
    poster: `${MEDIA}/${slug}.jpg`,
    loop: `${MEDIA}/${slug}.loop.mp4`,
    film: `${FILMS}/${slug}.mp4`,
  })),

  partners: PARTNERS.map(({ slug, name }) => ({
    name,
    logo: `${MEDIA}/partners/${slug}.png`,
    url: null,
  })),

  testimonials: [1, 2].map((n) => ({
    quote: s(`test.${n}.q`),
    name: s(`test.${n}.n`),
    role: s(`test.${n}.r`),
    avatar: null,
  })),

  // The whole dictionary backs the labels, so a string added in code keeps
  // working before anyone types it into the panel.
  labels: t,
};

/* ---------------- Fetching ---------------- */

/** Keep whatever the API sent, but only if it actually sent it. */
const pick = <T>(value: T | null | undefined, fallback: T): T =>
  value === undefined || value === null ? fallback : value;

/**
 * An absent section means "hidden in the panel", so `sections` is taken as-is
 * — but every other key falls back, and labels merge, so a malformed or
 * half-filled response degrades instead of blanking the page.
 */
/* The footer maps over a list of `{platform, url}`. A panel still on the old
 * three-column shape sends `{instagram, linkedin, twitter}` instead, and simply
 * rejecting that dropped whatever had been filled in on the way through — the
 * accounts were saved and the icons never appeared. Both shapes come out as the
 * list, empty entries and all other shapes as null so the caller falls back. */
function socialList(raw: unknown): { platform: string; url: string }[] | null {
  if (Array.isArray(raw)) return raw.filter((s) => s?.url);
  if (!raw || typeof raw !== "object") return null;
  const list = Object.entries(raw as Record<string, unknown>)
    .filter(([, url]) => typeof url === "string" && url && url !== "#")
    .map(([platform, url]) => ({ platform, url: url as string }));
  return list.length ? list : null;
}

function normalize(raw: Partial<Content>): Content {
  const f = STATIC_CONTENT;

  return {
    settings: {
      ...f.settings,
      ...(raw.settings ?? {}),
      logo: { ...f.settings.logo, ...(raw.settings?.logo ?? {}) },
      social: socialList(raw.settings?.social) ?? f.settings.social,
      footer: { ...f.settings.footer, ...(raw.settings?.footer ?? {}) },
      seo: { ...f.settings.seo, ...(raw.settings?.seo ?? {}) },
    },
    nav: pick(raw.nav, f.nav),
    sections: pick(raw.sections, f.sections),
    heroSlides: pick(raw.heroSlides, f.heroSlides),
    stats: pick(raw.stats, f.stats),
    about: pick(raw.about, f.about),
    services: pick(raw.services, f.services),
    method: pick(raw.method, f.method),
    workCategories: pick(raw.workCategories, f.workCategories),
    works: pick(raw.works, f.works),
    partners: pick(raw.partners, f.partners),
    testimonials: pick(raw.testimonials, f.testimonials),
    labels: { ...f.labels, ...(raw.labels ?? {}) },
  };
}

/**
 * Runs on the server during SSR and in the browser on client navigation.
 * Never throws and never returns null: a failure here has to leave a rendered
 * page behind, not an error boundary, so it resolves to the baked-in content.
 */
export async function loadContent(): Promise<Content> {
  if (!cmsEnabled) return STATIC_CONTENT;

  try {
    const res = await fetch(`${CMS_URL}/api/content`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    return normalize(await res.json());
  } catch (err) {
    // Deliberately soft: the site keeps serving its own copy.
    console.warn("[cms] falling back to bundled content:", err);
    return STATIC_CONTENT;
  }
}

/* ---------------- Form submission ----------------
 * Without a CMS the contact form has nowhere to go, so it keeps its old
 * mailto behaviour and the newsletter stays inert. */

export async function postContact(body: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  return post("/api/contact", body);
}

export async function postSubscribe(email: string): Promise<boolean> {
  return post("/api/subscribe", { email });
}

async function post(path: string, body: unknown): Promise<boolean> {
  if (!cmsEnabled) return false;

  try {
    const res = await fetch(`${CMS_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Pull the active language out of a `{ar, en}` pair. */
export const loc = (pair: Loc | null | undefined, lang: Lang): string => pair?.[lang] ?? "";
