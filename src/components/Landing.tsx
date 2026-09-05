import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Compass,
  Camera,
  Share2,
  Wand2,
  Mail,
  Phone,
  MapPin,
  Link2,
  Calendar,
  Users,
  Award,
  Play,
  Send,
  Quote,
  Star,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { ContentProvider, useContent } from "@/lib/content";
import {
  cmsEnabled,
  loc,
  postContact,
  postSubscribe,
  type Content,
  type Loc,
  type Work,
} from "@/lib/cms";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

/* ---------------- Content ----------------
 * Every string, image and film on this page comes from the `Content` object the
 * provider carries — either the panel's API or the copy baked into cms.ts, which
 * is where the reel, the partner list and the section backdrops now live. The
 * components below hold no copy of their own, so both sources render the same
 * page and there is no second layout to drift out of sync.
 *
 * A section missing from `content.sections` was hidden in the panel, so each
 * band returns null rather than rendering an empty frame. */

/** Resolve a `{ar, en}` pair in the active language. */
function useLoc() {
  const { lang } = useI18n();
  return (pair: Loc | null | undefined) => loc(pair, lang);
}

/* The panel stores lucide icon names, which is the set this page already draws
 * from. A name with no entry here falls back instead of failing the render. */
const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  compass: Compass,
  camera: Camera,
  "share-2": Share2,
  "wand-2": Wand2,
  users: Users,
  calendar: Calendar,
  "map-pin": MapPin,
  award: Award,
  globe: Globe,
};

const icon = (name: string | null | undefined): LucideIcon => ICONS[name ?? ""] ?? Sparkles;

/* Footer accounts. Keys match the platform list in the panel's
 * SiteSettingResource. lucide draws no brand marks — its Twitter is still the
 * old bird, and WhatsApp, TikTok and Snapchat had to borrow a nearest glyph —
 * so the platforms carry their own path here (simple-icons, CC0; LinkedIn from
 * bootstrap-icons, MIT) and only the plain contact rows keep a lucide icon. An
 * unknown platform still renders, as a plain link. */
const mark =
  (d: string, viewBox = "0 0 24 24") =>
  ({ className }: { className?: string }) => (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden className={className}>
      <path d={d} />
    </svg>
  );

const XMark = mark(
  "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
);

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  facebook: mark(
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  ),
  x: XMark,
  // A panel still on the old key sends `twitter`: same account, same mark.
  twitter: XMark,
  instagram: mark(
    "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  ),
  telegram: mark(
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  ),
  whatsapp: mark(
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  ),
  linkedin: mark(
    "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    "0 0 16 16",
  ),
  tiktok: mark(
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  ),
  youtube: mark(
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  ),
  snapchat: mark(
    "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z",
  ),
  phone: Phone,
  email: Mail,
  location: MapPin,
  website: Globe,
  // The house wing, traced from the portfolio lockup: the text under it is
  // unreadable at 16px, so only the mark survives the shrink.
  portfolio: mark(
    "M 18.72 0.96 C 16.86 3.79, 14.83 5.25, 7.83 8.77 C 4.23 10.58, 3.33 11.15, 2.07 12.46 C 0.6 13.98, 0.06 15.71, 0.44 17.65 C 0.64 18.66, 0.98 19.34, 1.87 20.52 C 2.76 21.7, 3.09 22.3, 3.28 23.09 L 3.37 23.44 3.48 22.99 C 3.79 21.76, 4.72 20.77, 5.87 20.43 C 6.3 20.31, 8.11 19.88, 8.4 19.83 C 8.95 19.74, 9.52 19.69, 10.75 19.62 C 12.26 19.54, 12.78 19.47, 13.5 19.25 C 15.32 18.69, 16.88 17.16, 17.43 15.39 C 17.55 15.01, 17.53 15.01, 17.01 15.27 C 15.85 15.85, 14.5 16.3, 12.83 16.64 C 12.32 16.75, 11.59 16.88, 10.23 17.13 C 6.76 17.74, 5.28 18.48, 4.37 20.05 C 4.05 20.6, 3.99 20.59, 4.13 20.01 C 4.55 18.21, 6.38 17.01, 9.98 16.17 C 10.42 16.07, 11.06 15.92, 11.4 15.84 C 16.76 14.6, 18.9 12.57, 19.42 8.24 C 19.46 7.94, 19.46 7.94, 18.98 8.34 C 16.83 10.15, 15.55 10.83, 10.98 12.6 C 7.73 13.86, 6.66 14.36, 5.54 15.15 C 3.83 16.36, 2.95 17.95, 2.95 19.84 C 2.95 20.32, 2.88 20.37, 2.77 19.99 C 2.61 19.43, 2.63 18, 2.82 17.45 C 3.54 15.33, 5.17 13.94, 8.89 12.28 C 9.34 12.08, 10.32 11.66, 12.03 10.95 C 16.3 9.17, 18.32 7.34, 19.09 4.55 C 19.34 3.65, 19.42 2.15, 19.27 1.1 C 19.15 0.25, 19.18 0.25, 18.72 0.96",
    "0 0 19.75 24",
  ),
};

/* The panel stores a bare number, address or handle as readily as a full URL,
 * and a raw one in an href goes nowhere — so each of those becomes the thing
 * the browser can actually act on: WhatsApp, the mail client, the dialer. */
const SOCIAL_HREF: Record<string, (v: string) => string> = {
  whatsapp: (v) =>
    /wa\.me|whatsapp\.com/i.test(v) ? `https://${v}` : `https://wa.me/${v.replace(/\D/g, "")}`,
  phone: (v) => `tel:${v.replace(/[^+\d]/g, "")}`,
  email: (v) => `mailto:${v}`,
  location: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
};

const socialHref = (platform: string, url: string) => {
  const v = url.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return v;
  return SOCIAL_HREF[platform]?.(v) ?? `https://${v}`;
};

/* ---------------- Header ---------------- */
function LangSwitch() {
  const { lang } = useI18n();
  const other: Lang = lang === "ar" ? "en" : "ar";
  return (
    <Link
      to={other === "ar" ? "/ar" : "/en"}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition hover:border-lavender hover:text-white"
      aria-label="Switch language"
      hrefLang={other}
    >
      <Globe className="h-3.5 w-3.5" />
      {other === "ar" ? "AR" : "EN"}
    </Link>
  );
}

/* Dark stays the default; the inline script in __root.tsx has already applied
 * the stored choice by the time this mounts, so we only read it back. */
function ThemeSwitch() {
  const [light, setLight] = useState(false);

  useEffect(() => setLight(document.documentElement.dataset.theme === "light"), []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* private mode — the choice just won't survive a reload */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-lavender hover:text-white"
    >
      {light ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
    </button>
  );
}

// The supplied lockup already sets the wing against both wordmarks, so the
// mark and the type are no longer assembled from separate pieces here. There
// are two of them: the white keyline for dark surfaces, and the purple one the
// brand pack ships for light. Inverting the white one would tint the wing, so
// we swap the file instead.
function BrandLockup({
  compact = false,
  onBrand = false,
}: {
  compact?: boolean;
  onBrand?: boolean;
}) {
  const { logo } = useContent().settings;
  const size = compact ? "h-9" : "h-12";
  // onBrand: the lockup sits on a dark fill in both themes (the footer), so the
  // light theme's ink-on-pale variant would disappear into it.
  return (
    <a href="#top" className="group flex items-center">
      {logo.dark && (
        <img
          src={logo.dark}
          alt="Elite Wing · إيليت وينغ"
          className={`${size} w-auto object-contain transition-all duration-500 group-hover:opacity-90 ${onBrand ? "" : "light:hidden"}`}
        />
      )}
      {logo.light && !onBrand && (
        <img
          src={logo.light}
          alt=""
          aria-hidden
          className={`${size} hidden w-auto object-contain transition-all duration-500 group-hover:opacity-90 light:block`}
        />
      )}
    </a>
  );
}

function Header() {
  const { tr } = useI18n();
  const L = useLoc();
  const { nav } = useContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      /* Solid, not glass. The header is sticky rather than fixed, so it holds
         its own strip at the top of the page — and the backdrop layer runs the
         full height of the wrapper, photographs included, straight under it.
         A 65%-panel glass let that photograph through, so the bar arrived
         carrying whichever frame happened to be behind it. `bg-background` is
         the one surface both themes agree on. */
      className={`sticky top-0 z-50 bg-background transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 shadow-2xl shadow-lavender-dark/10"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8 ${scrolled ? "py-2.5" : "py-4"} transition-all duration-500`}
      >
        <BrandLockup compact={scrolled} />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((l) => (
            <a
              key={l.anchor}
              href={`#${l.anchor}`}
              className="group relative text-sm text-white/75 transition-colors duration-300 hover:text-white"
            >
              {L(l.label)}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full gradient-lavender transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <LangSwitch />
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full gradient-lavender px-4 py-2 text-xs font-bold text-white on-brand shadow-lg shadow-lavender/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lavender/50 md:inline-flex"
          >
            <span>{tr("nav.cta")}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
          </a>
          <button
            className="relative rounded-md border border-white/15 p-2 text-white/80 transition hover:border-lavender lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <Menu
              className={`h-4 w-4 transition-all duration-300 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            />
            <X
              className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out ${open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {nav.map((l, i) => (
            <a
              key={l.anchor}
              href={`#${l.anchor}`}
              onClick={() => setOpen(false)}
              className={`group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm text-white/85 transition-all duration-300 hover:border-lavender/40 hover:bg-white/5 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              <span>{L(l.label)}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 rtl:group-hover:-translate-x-0.5" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* Full-film lightbox, shared by the hero and the work reel. */
function FilmModal({ work, onClose }: { work: Work | null; onClose: () => void }) {
  useEffect(() => {
    if (!work) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [work, onClose]);

  if (!work?.film) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-lg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="on-brand relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute end-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lavender-dark shadow-lg transition hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>
        {/* object-contain + capped height keeps portrait films (9:16) inside
            the viewport instead of pushing the close button off-screen */}
        <video
          src={work.film}
          poster={work.poster ?? undefined}
          className="max-h-[85vh] w-full object-contain"
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
const HERO_SLIDE_MS = 6000;

// Cross-fading backdrop. Auto-advance is suppressed for prefers-reduced-motion,
// where the dots stay usable so the other slides are still reachable.
function HeroBackdrop({
  slides,
  index,
  onSelect,
}: {
  slides: string[];
  index: number;
  onSelect: (i: number) => void;
}) {
  const { tr } = useI18n();
  return (
    <>
      {/* The foot dissolves instead of ending: below it is the page backdrop's
          own photograph, and a hard bottom edge here reads as a seam. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(180deg, #000 86%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 86%, transparent 100%)",
        }}
      >
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            // first slide is the LCP image, so it must not be lazy
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            /* The wing mark is painted into these frames at roughly a tenth to
               a third across, and a phone-shaped crop of a 16:9 skyline keeps
               only the middle third — which is exactly the part without it.
               Below md the crop is pulled left so the mark stays in shot. */
            className={`absolute inset-0 h-full w-full object-cover object-[15%_center] transition-opacity duration-[1400ms] ease-in-out md:object-center ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dots sit on the far side from the copy, matching the client mockup.
          With one slide there is nothing to switch between. */}
      {slides.length > 1 && (
        <div className="on-brand absolute inset-y-0 end-6 z-10 hidden flex-col items-center justify-center gap-3 md:flex">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`${tr("hero.slide")} ${i + 1}`}
              aria-current={i === index}
              className={`rounded-full transition-all duration-500 ${
                i === index ? "h-8 w-2 bg-lavender" : "h-2 w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

function Hero() {
  const { tr } = useI18n();
  const L = useLoc();
  const { sections, heroSlides, stats } = useContent();
  const hero = sections.hero;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSlide((v) => (v + 1) % heroSlides.length), HERO_SLIDE_MS);
    return () => clearInterval(id);
  }, [slide, heroSlides.length]);

  if (!hero) return null;

  return (
    <section id="top" className="relative overflow-hidden">
      <HeroBackdrop slides={heroSlides} index={slide} onSelect={setSlide} />
      {/* Darkens the photography enough for the headline to stay legible. The
          scrim is keyed to --navy, which is dark in both themes: these are dusk
          skylines, so the hero stays dark even in light mode and only its foot
          fades out to whatever the page background is. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--navy) 45%, transparent) 0%, color-mix(in oklch, var(--navy) 75%, transparent) 55%, color-mix(in oklch, var(--lavender-dark) 45%, transparent) 86%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* No decorative wing overlay here — the backdrop photography already
          carries the wing mark, and a second one fought it. */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-24 md:px-8 md:pt-32">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* on-brand: everything in the hero sits on the photograph, which
              stays dark in both themes. */}
          <div className="on-brand">
            <Reveal variant="fade" duration={600}>
              <span className="inline-flex items-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 px-3 py-1 text-xs font-medium text-lavender-light">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lavender" />
                </span>
                {L(hero.kicker)}
              </span>
            </Reveal>
            <Reveal variant="up" delay={120} duration={800}>
              <h1 className="mt-6 text-5xl font-black leading-[1.2] tracking-tight text-white md:text-6xl lg:text-7xl">
                {L(hero.title)} <span className="text-shimmer">{L(hero.titleAccent)}</span>
              </h1>
            </Reveal>
            <Reveal variant="up" delay={240}>
              <p className="mt-6 max-w-xl text-lg text-white/70">{L(hero.subtitle)}</p>
            </Reveal>
            <Reveal variant="up" delay={360}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full gradient-lavender px-6 py-3 text-sm font-bold text-white on-brand shadow-lg shadow-lavender/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lavender/50"
                >
                  {tr("nav.cta")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lavender hover:-translate-y-0.5"
                >
                  {tr("hero.cta.primary")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right column left open so the skyline backdrop reads through */}
          <div className="hidden md:block" />
        </div>

        {/* Stats bar */}
        {stats.length > 0 && (
          <Reveal variant="up" delay={500}>
            {/* Translucent navy rather than a surface card: an opaque panel
                here cuts the wing mark in the backdrop in half. */}
            {/* me-auto, not mx-auto: the bar's start edge lines up with the
                headline above it rather than floating centred. */}
            <div className="on-brand me-auto mt-32 max-w-5xl rounded-2xl border border-white/15 bg-navy/45 px-5 py-4 md:mt-40 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, i) => {
                  const Icon = icon(stat.icon);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      {/* text-pale, not text-lavender-light: on this dark card
                          the light theme's deep khuzami accent disappears. */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lavender/20 text-pale ring-1 ring-lavender/40">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xl font-black text-white md:text-2xl">
                          <CountUp end={stat.value} suffix={stat.suffix ?? ""} />
                        </div>
                        <div className="text-[11px] text-white/60">{L(stat.label)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------- Page backdrop ----------------
 * The deck's own device: photographs sunk under a heavy lavender wash so the
 * copy stays legible, scrolling with the page so each band of it shows a
 * different frame.
 *
 * One layer for the whole page, not one per section. Per-section frames put a
 * cut between two different photographs at every boundary, and fading each one
 * at its own edge only turned the cut into a pale stripe. Here the frames are
 * slices of one continuous layer, overlapping by a fifth of their height, so
 * consecutive photos cross-dissolve and there is no boundary to see.
 *
 * --backdrop-opacity scales the lot per theme: navy copy needs a quieter photo
 * under it than white copy does. */
function PageBackdrop() {
  const { sections } = useContent();
  // The panel's own running order, one band per distinct photograph. Deduped
  // because the panel assigns a backdrop per section and only has a handful of
  // frames to go round: eight sections drawing on four pictures meant the set
  // visibly started over halfway down the page. One band each, however many
  // there are, and adding a frame in the panel adds a band.
  const shots = [
    ...new Set(
      Object.values(sections)
        .map((s) => s?.backdrop)
        .filter((src): src is string => !!src),
    ),
  ];
  if (!shots.length) return null;
  const step = 100 / shots.length;
  // The phone filmstrip: the running order, over and over, until it outruns the
  // page. A 16:9 frame is ~56vw tall and the overlap eats 14vw of that, so 64
  // of them clear 2700vw — a good three times the tallest this page has ever
  // been. The surplus is clipped by the layer's own overflow and never loads.
  // ponytail: fixed count, not measured. A page past ~2700vw ends in flat wash;
  // measure the layer and derive the count if it ever gets that long.
  const strip = Array.from({ length: 64 }, (_, i) => shots[i % shots.length]);

  return (
    // Above the body canvas, below the content — so the page wrapper must not
    // paint a background of its own.
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Opacity and the light theme's multiply sit on the group, never on a
          frame. Per-frame they applied twice wherever two frames overlapped,
          and dissolving two half-transparent layers into each other dips to
          three quarters coverage at the crossover — the page showing through
          that dip was the pale band across the seam. At full strength inside
          the group the frames cross-dissolve cleanly, and the whole stack is
          faded once on the way out. */}
      <div
        className="backdrop-photo absolute inset-0"
        style={{ opacity: "calc(0.42 * var(--backdrop-opacity))" }}
      >
        {/* md+: one band per photograph, each stretched over its slice of the
            page. A landscape frame cropped to a landscape band loses very
            little, so `cover` is free here. The mask splits the 20% overlap the
            same way the filmstrip does — 14% in, 6% out — so a frame that has
            not loaded yet leaves the one above it fading rather than cut off
            square. */}
        <div className="hidden md:block">
          {shots.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              loading="lazy"
              style={
                {
                  top: `${i * step}%`,
                  "--band": `${step * 1.25}%`,
                } as React.CSSProperties
              }
              className="absolute inset-x-0 h-[var(--band)] w-full object-cover [mask-image:linear-gradient(180deg,transparent,#000_14%,#000_94%,transparent)]"
            />
          ))}
        </div>

        {/* Below md: the same photographs, but a filmstrip rather than bands.
            A landscape frame stretched over a phone-shaped band is not a crop,
            it is a 6× zoom into one corner of the picture; laid out whole
            instead, it is 220-odd pixels tall against a band of 1500 and the
            page reads as flat wash with strips of photograph marooned in it.
            So: the picture at its own full width, its own height, and enough
            copies of the running order stacked to reach the foot of the page.
            Nothing is cropped, nothing is empty, and a phone screen is short
            enough that a frame's next turn is two screens away. */}
        <div className="md:hidden">
          {strip.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              /* Both numbers are vw, and that is the whole point: the fade has
                 to finish inside the overlap or the frame beneath comes out
                 from under it with a hard edge, and a mask stop in per-cent is
                 per-cent of the picture's own height. That held while the panel
                 carried 16:9 frames and broke the day it was given 3:4 ones —
                 12% of a portrait frame is 63px against an overlap of 55, so
                 every join drew a line across the page. In vw the two are
                 measured against the same thing and no aspect ratio can put
                 them out of order.
                 The trailing 6vw is the rest of the overlap, and the two fades
                 are deliberately sequential rather than simultaneous: the frame
                 below reaches full strength 6vw before the frame above starts
                 to go, so nothing ever dissolves into a half-transparent
                 neighbour and there is no dip to a pale stripe at the join.
                 It costs nothing while every frame is on screen — the fade-out
                 happens underneath an opaque layer — and it is the whole point
                 when one is not: these load lazily, and a frame that has not
                 arrived yet used to leave the one above it cut off square
                 across the page. Now it just ends. */
              className="block w-full -mt-[14vw] first:mt-0 [mask-image:linear-gradient(180deg,transparent,#000_8vw,#000_calc(100%_-_6vw),transparent)]"
            />
          ))}
        </div>
      </div>
      {/* Flat khuzami wash: one tint over the whole layer, so nothing about it
          changes at a section boundary. */}
      <div className="absolute inset-0" style={{ background: "var(--backdrop-wash)" }} />
    </div>
  );
}

/* ---------------- Section head ---------------- */
function SectionHead({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal variant="up">
      <div className="mx-auto max-w-4xl text-center">
        {/* The pale fill is light-only: khuzami ink on a 10% tint of itself is
            fine over the dark theme's backdrop and nowhere near AA over the
            light one. Filling the pill keeps the accent colour and gives it
            something to sit on. */}
        <div className="inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lavender-light light:bg-panel">
          <Sparkles className="h-3 w-3" />
          {kicker}
        </div>
        {/* leading-[1.35], not the size step's default ~1.1: Arabic titles carry
            tashkeel, and a damma on the second line lands on the descenders of
            the first at anything tighter. */}
        <h2 className="mt-4 text-2xl font-black leading-[1.35] tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        {/* /75 not /60: this line sits straight on the backdrop photo, which now
            comes further forward than it used to. Nearly solid in the light
            theme, where the same line is navy ink on a khuzami-washed
            photograph and 75% of it lands under AA. */}
        {subtitle && <p className="mt-3 text-white/75 light:text-white/90">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

/* ---------------- Methodology ----------------
 * The deck's "منهجية العمل" slide — the pillars, in order. */
function Methodology() {
  const L = useLoc();
  const { sections, method } = useContent();
  const sec = sections.method;
  if (!sec || method.length === 0) return null;

  return (
    <section id="method" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} subtitle={L(sec.subtitle)} />
        {/* Wrapping flex, not a grid. The panel decides how many cards there
            are, and a grid leaves the shortfall as an empty track at the end of
            the row — three services in a row of four sat two-thirds of the way
            across the page with a hole beside them. Centred, a short row reads
            as deliberate. The widths are what the grid's tracks worked out to
            anyway: an Nth of the row, less this card's share of the gaps. */}
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {method.map((pillar, i) => (
            <Reveal
              key={i}
              variant="up"
              delay={i * 110}
              className="w-full sm:w-[calc(50%_-_10px)] lg:w-[calc(20%_-_16px)]"
            >
              <div className="group h-full rounded-3xl card-surface p-6 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-xl hover:shadow-lavender/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-lavender text-sm font-black text-white on-brand shadow-lg shadow-lavender/40 transition-transform group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{L(pillar.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65 light:text-white/80">
                  {L(pillar.body)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const L = useLoc();
  const { sections, about } = useContent();
  const sec = sections.about;
  if (!sec) return null;

  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} />
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-white/70 light:text-white/90">
            {L(sec.body)}
          </p>
        </Reveal>
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {about.map((card, i) => {
            const Icon = icon(card.icon);
            return (
              <Reveal
                key={i}
                variant="up"
                delay={i * 140}
                className="w-full md:w-[calc(33.333%_-_13.333px)]"
              >
                <div className="group h-full rounded-3xl card-surface p-8 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-xl hover:shadow-lavender/10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-lavender text-white on-brand shadow-lg shadow-lavender/40 transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{L(card.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 light:text-white/80">
                    {L(card.body)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const L = useLoc();
  const { sections, services } = useContent();
  const sec = sections.services;
  if (!sec || services.length === 0) return null;

  return (
    <section id="services" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} subtitle={L(sec.subtitle)} />
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {services.map((svc, idx) => {
            const Icon = icon(svc.icon);
            return (
              <Reveal
                key={idx}
                variant="up"
                delay={idx * 100}
                className="w-full md:w-[calc(50%_-_10px)] lg:w-[calc(25%_-_15px)]"
              >
                <div className="group relative h-full overflow-hidden rounded-3xl card-surface p-7 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-2xl hover:shadow-lavender/10">
                  <div className="absolute -end-16 -top-16 h-40 w-40 rounded-full bg-lavender/15 blur-3xl transition group-hover:bg-lavender/30 animate-ew-float-slow" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-lavender text-white on-brand shadow-lg shadow-lavender/40 transition-transform group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">{L(svc.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65 light:text-white/80">
                      {L(svc.body)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery (work reel) ---------------- */

// Muted preview loop, mounted only while a card is hovered/focused so we never
// pull every video down on page load. Fades in once decoding actually starts.
function HoverLoop({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

function ReelCard({
  work,
  hot,
  onHover,
  onOpen,
}: {
  work: Work;
  hot: boolean;
  onHover: (slug: string | null) => void;
  onOpen: () => void;
}) {
  const { tr } = useI18n();
  const L = useLoc();
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHover(work.slug)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(work.slug)}
      onBlur={() => onHover(null)}
      className="on-brand group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl card-surface text-start transition-transform duration-500 ease-out hover:scale-[1.04] focus-visible:scale-[1.04] sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {work.poster && (
          <img
            src={work.poster}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        {hot && work.loop && <HoverLoop src={work.loop} />}
        {/* purple gradient wash — lifts on hover so the footage reads through */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lavender-dark/90 via-lavender/35 to-lavender-light/15 transition-opacity duration-500 group-hover:opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        {/* play affordance — hidden until hover on pointer devices, always on touch */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100"
        >
          <span className="relative flex h-16 w-16 scale-75 items-center justify-center rounded-full bg-white/95 text-lavender-dark shadow-2xl transition-transform duration-500 ease-out group-hover:scale-100 group-focus-visible:scale-100 max-md:scale-100">
            <span className="absolute inset-0 rounded-full bg-white/50 animate-ew-pulse-ring" />
            <Play className="relative h-6 w-6 fill-current ps-0.5" />
          </span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-lavender-light">
          {tr("works.case")}
        </div>
        <div className="mt-1 text-sm font-bold text-white">{L(work.title)}</div>
      </div>
    </button>
  );
}

function Gallery() {
  const { tr, dir } = useI18n();
  const L = useLoc();
  const { sections, works, workCategories } = useContent();
  const sec = sections.gallery;

  const [cat, setCat] = useState<string | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const [open, setOpen] = useState<Work | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  // The panel owns the category list and its order, so the opening filter is
  // whichever category comes first rather than a hardcoded slug.
  const active = cat ?? workCategories[0]?.slug ?? null;
  const items = works.filter((w) => w.category === active);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  // In RTL the scroll axis is mirrored, so "next" walks scrollLeft negative.
  const nudge = (step: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const by = el.clientWidth * 0.8 * step * (dir === "rtl" ? -1 : 1);
    el.scrollBy({ left: by, behavior: "smooth" });
  };

  if (!sec || works.length === 0) return null;

  return (
    <section id="gallery" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {workCategories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCat(c.slug)}
                aria-pressed={c.slug === active}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition duration-300 ${
                  c.slug === active
                    ? "border-transparent gradient-lavender text-white on-brand shadow-lg shadow-lavender/30"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-lavender hover:text-white light:text-white/90"
                }`}
              >
                {L(c.title)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label={tr("reel.prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-lavender hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label={tr("reel.next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-lavender hover:text-white"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div
          ref={rail}
          className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <ReelCard
              key={item.slug}
              work={item}
              hot={hot === item.slug}
              onHover={setHot}
              onOpen={() => setOpen(item)}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lavender hover:-translate-y-0.5"
          >
            {tr("gal.more")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <FilmModal work={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/* ---------------- Partners ----------------
 * Logos keyed to transparent white, so they sit on the dark surface without a
 * plate and get inverted for the light theme. */
function Partners() {
  const L = useLoc();
  const { sections, partners } = useContent();
  const sec = sections.partners;
  if (!sec || partners.length === 0) return null;

  return (
    <section id="partners" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} />
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-6 max-w-4xl text-center leading-relaxed text-white/65 light:text-white/90">
            {L(sec.body)}
          </p>
        </Reveal>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {partners.map((p, i) => (
            <Reveal
              key={p.name}
              variant="zoom"
              delay={i * 60}
              className="w-[calc(50%_-_8px)] sm:w-[calc(33.333%_-_10.667px)] lg:w-[calc(16.666%_-_13.333px)]"
            >
              <div className="group flex h-28 items-center justify-center rounded-2xl card-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-lavender/60 hover:shadow-xl hover:shadow-lavender/10">
                {p.logo && (
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    // They are all fully monochrome, so the light theme's invert
                    // only flips white to near-black.
                    className="max-h-14 w-auto max-w-full object-contain opacity-70 transition duration-300 group-hover:opacity-100 [filter:var(--partner-logo-filter)]"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const L = useLoc();
  const { sections, testimonials } = useContent();
  const sec = sections.testimonials;
  const [idx, setIdx] = useState(0);

  if (!sec || testimonials.length === 0) return null;

  // The panel can remove entries, so clamp rather than trusting the index.
  const active = testimonials[Math.min(idx, testimonials.length - 1)];
  const next = () => setIdx((v) => (v + 1) % testimonials.length);
  const prev = () => setIdx((v) => (v - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} />
        <Reveal variant="up" delay={120}>
          <div className="relative mt-12 rounded-3xl card-surface p-8 md:p-12">
            <Quote className="absolute end-8 top-8 h-10 w-10 text-lavender/30" />
            <p className="max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              {L(active.quote)}
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full gradient-lavender font-bold text-white on-brand">
                  {active.avatar ? (
                    <img
                      src={active.avatar}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    L(active.name).slice(0, 1)
                  )}
                </div>
                <div>
                  <div className="font-bold text-white">{L(active.name)}</div>
                  <div className="text-xs text-white/60 light:text-white/80">{L(active.role)}</div>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-lavender hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-lavender hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </div>
              )}
            </div>
            {testimonials.length > 1 && (
              <div className="mt-4 flex items-center gap-1">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-lavender" : "w-3 bg-white/20"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Submission feedback. Bilingual inline, so it needs no dictionary entry. */
function FormStatus({ state }: { state: "idle" | "sending" | "sent" | "error" }) {
  const { lang } = useI18n();
  if (state === "idle" || state === "sending") return null;

  const sent = lang === "ar" ? "تم الإرسال، شكرًا لك." : "Sent — thank you.";
  const failed = lang === "ar" ? "تعذّر الإرسال، حاول مرة أخرى." : "Could not send. Please retry.";

  return (
    <p
      role="status"
      className={`mt-2 text-xs ${state === "sent" ? "text-lavender-light" : "text-destructive"}`}
    >
      {state === "sent" ? sent : failed}
    </p>
  );
}

type FormState = "idle" | "sending" | "sent" | "error";

/* ---------------- Newsletter ---------------- */
function Newsletter() {
  const { tr } = useI18n();
  const L = useLoc();
  const { sections } = useContent();
  const sec = sections.newsletter;
  const [state, setState] = useState<FormState>("idle");

  if (!sec) return null;

  // Without a CMS there is nowhere to send this, so the form stays inert —
  // which is exactly what it did before.
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cmsEnabled) return;
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setState("sending");
    const ok = await postSubscribe(email);
    setState(ok ? "sent" : "error");
    if (ok) form.reset();
  };

  return (
    <section className="relative overflow-hidden py-16">
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-3xl card-surface p-8 md:p-12">
            <div className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-lavender/25 blur-3xl animate-ew-float-slow" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-black text-white md:text-3xl">{L(sec.title)}</h3>
                <p className="mt-2 text-sm text-white/65 light:text-white/80">{L(sec.subtitle)}</p>
              </div>
              <div>
                <form
                  className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2"
                  onSubmit={onSubmit}
                >
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={tr("news.placeholder")}
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
                  />
                  <button
                    disabled={state === "sending"}
                    className="inline-flex items-center gap-1.5 rounded-xl gradient-lavender px-4 py-2 text-xs font-bold text-white on-brand shadow-md shadow-lavender/30 transition hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {tr("news.cta")}
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
                <FormStatus state={state} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const { tr } = useI18n();
  const L = useLoc();
  const { sections, settings } = useContent();
  const sec = sections.contact;
  const [state, setState] = useState<FormState>("idle");

  if (!sec) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // No CMS to receive it, so fall back to what this form always did.
    if (!cmsEnabled) {
      window.location.href = `mailto:${settings.email ?? ""}`;
      return;
    }

    const fd = new FormData(form);
    setState("sending");
    const ok = await postContact({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    setState(ok ? "sent" : "error");
    if (ok) form.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-[2rem] card-surface p-8 text-white md:p-16">
            <div className="pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-lavender/25 blur-3xl animate-ew-blob" />
            <div className="pointer-events-none absolute -start-20 -bottom-20 h-72 w-72 rounded-full bg-lavender/15 blur-3xl animate-ew-float-slow" />
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lavender-light">
                  {L(sec.kicker)}
                </div>
                <h2 className="mt-4 text-2xl font-black leading-[1.35] md:text-4xl">
                  {L(sec.title)}
                </h2>
                <p className="mt-4 max-w-md text-white/85">{L(sec.subtitle)}</p>
                <div className="mt-8 space-y-3 text-sm">
                  {settings.email && (
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-center gap-3 text-white/90 hover:text-white"
                    >
                      <Mail className="h-4 w-4" /> {settings.email}
                    </a>
                  )}
                  {settings.phone && (
                    <a
                      href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-3 text-white/90 hover:text-white"
                    >
                      {/* Isolate only the number, not the row: dir on the flex
                          container flips its layout out of the RTL column. */}
                      <Phone className="h-4 w-4" /> <span dir="ltr">{settings.phone}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-white/90">
                    <MapPin className="h-4 w-4" /> {L(settings.location)}
                  </div>
                </div>
              </div>
              <form
                className="rounded-2xl bg-white/5 p-6 backdrop-blur-md ring-1 ring-white/15"
                onSubmit={onSubmit}
              >
                <div className="grid gap-3">
                  <input
                    name="name"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                    placeholder={tr("contact.form.name")}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                    placeholder={tr("contact.form.email")}
                    required
                  />
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                    placeholder={tr("contact.form.message")}
                    // The API requires it; the mailto fallback cannot carry it.
                    required={cmsEnabled}
                  />
                  <button
                    disabled={state === "sending"}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl gradient-lavender px-5 py-3 text-sm font-bold text-white on-brand shadow-lg shadow-lavender/30 transition hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {tr("contact.cta")}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <FormStatus state={state} />
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const { tr } = useI18n();
  const L = useLoc();
  const { settings, services, nav } = useContent();

  // Which accounts show, and in what order, is the panel's call.
  const socials = settings.social.filter((s) => s.url);

  // Navy in both themes: in light mode the footer was the page's largest pale
  // block, and a dark foot closes the page on brand.
  return (
    <footer className="on-brand relative overflow-hidden border-t border-white/10 bg-navy py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-lavender/20 blur-3xl animate-ew-float-slow" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lavender to-transparent opacity-70"
      />

      <Reveal variant="up">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <BrandLockup onBrand />
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">
                {L(settings.footer.tagline)}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {socials.map(({ platform, url }, i) => {
                  const Icon = SOCIAL_ICONS[platform] ?? Link2;
                  const to = socialHref(platform, url);
                  // mailto: and tel: hand off to another app; a blank tab left
                  // behind is the browser's, not ours.
                  const external = /^https?:/i.test(to);
                  return (
                    <a
                      key={`${platform}-${i}`}
                      href={to}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={platform}
                      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-lavender hover:text-white"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full bg-lavender/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <Icon className="relative h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold text-white">{tr("nav.services")}</div>
              <ul className="space-y-2 text-sm text-white/60">
                {services.map((svc, i) => (
                  <li key={i}>
                    <a href="#services" className="hover:text-lavender-light">
                      {L(svc.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold text-white">{tr("nav.home")}</div>
              <ul className="space-y-2 text-sm text-white/60">
                {nav.map((l) => (
                  <li key={l.anchor}>
                    <a href={`#${l.anchor}`} className="hover:text-lavender-light">
                      {L(l.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold text-white">{tr("nav.contact")}</div>
              <ul className="space-y-2 text-sm text-white/60">
                {settings.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-lavender" />{" "}
                    <span dir="ltr">{settings.phone}</span>
                  </li>
                )}
                {settings.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-lavender" /> {settings.email}
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-lavender" /> {L(settings.location)}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
            <div>{L(settings.footer.rights)}</div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-lavender text-lavender" />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

export function Landing({ lang, content }: { lang?: Lang; content?: Content }) {
  return (
    <ContentProvider content={content} lang={lang}>
      <div className="relative min-h-screen text-foreground">
        <PageBackdrop />
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Methodology />
          <Gallery />
          <Partners />
          <Testimonials />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
