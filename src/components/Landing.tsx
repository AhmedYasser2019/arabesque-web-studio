import { useEffect, useRef, useState } from "react";
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
  Instagram,
  Linkedin,
  Twitter,
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
function BrandLockup({ compact = false }: { compact?: boolean }) {
  const { logo } = useContent().settings;
  const size = compact ? "h-9" : "h-12";
  return (
    <a href="#top" className="group flex items-center">
      {logo.dark && (
        <img
          src={logo.dark}
          alt="Elite Wing · إيليت وينغ"
          className={`${size} w-auto object-contain transition-all duration-500 group-hover:opacity-90 light:hidden`}
        />
      )}
      {logo.light && (
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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/10 shadow-2xl shadow-lavender-dark/10"
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
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            // first slide is the LCP image, so it must not be lazy
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
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
            "linear-gradient(180deg, color-mix(in oklch, var(--navy) 45%, transparent) 0%, color-mix(in oklch, var(--navy) 75%, transparent) 55%, color-mix(in oklch, var(--lavender-dark) 60%, transparent) 82%, var(--background) 100%)",
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
              <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
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

/* ---------------- Section backdrop ----------------
 * The deck's own device: a photograph sunk under a heavy lavender wash so the
 * copy stays legible.
 *
 * The strength is per-section on purpose — how far a frame can come forward
 * depends on what sits over it. Architecture behind body copy takes the
 * default; the gallery frame goes lower because it has legible text of its own
 * and a wall of video cards on top. The whole backdrop is then scaled by
 * --backdrop-opacity, which the light theme pulls right down: navy copy needs a
 * quieter photo under it than white copy does. */
function SectionBg({ src, opacity = 0.45 }: { src: string | null; opacity?: number }) {
  if (!src) return null;
  return (
    // No negative z-index: the page wrapper's opaque background would hide it.
    <div
      aria-hidden
      style={{ opacity: "var(--backdrop-opacity)" }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{ opacity }}
        className="backdrop-photo h-full w-full object-cover"
      />
      {/* Short fades at the seams instead of one edge-to-edge wash: the old
          gradient spent its whole run climbing back to the page colour, which
          is what bleached the frames out. The middle now keeps a flat khuzami
          tint and lets the photograph through. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--background) 0%, color-mix(in oklch, var(--lavender-dark) 32%, transparent) 22%, color-mix(in oklch, var(--lavender-dark) 32%, transparent) 78%, var(--background) 100%)",
        }}
      />
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
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lavender-light">
          <Sparkles className="h-3 w-3" />
          {kicker}
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        {/* /75 not /60: this line sits straight on the backdrop photo, which now
            comes further forward than it used to. */}
        {subtitle && <p className="mt-3 text-white/75">{subtitle}</p>}
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
    <section id="method" className="relative overflow-hidden border-t border-white/5 py-24">
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} subtitle={L(sec.subtitle)} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {method.map((pillar, i) => (
            <Reveal key={i} variant="up" delay={i * 110}>
              <div className="group h-full rounded-3xl card-surface p-6 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-xl hover:shadow-lavender/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-lavender text-sm font-black text-white on-brand shadow-lg shadow-lavender/40 transition-transform group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{L(pillar.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{L(pillar.body)}</p>
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
    <section id="about" className="relative overflow-hidden border-t border-white/5 py-24">
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} />
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-white/70">{L(sec.body)}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {about.map((card, i) => {
            const Icon = icon(card.icon);
            return (
              <Reveal key={i} variant="up" delay={i * 140}>
                <div className="group h-full rounded-3xl card-surface p-8 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-xl hover:shadow-lavender/10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-lavender text-white on-brand shadow-lg shadow-lavender/40 transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{L(card.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{L(card.body)}</p>
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
    <section id="services" className="relative overflow-hidden border-t border-white/5 py-24">
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} subtitle={L(sec.subtitle)} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, idx) => {
            const Icon = icon(svc.icon);
            return (
              <Reveal key={idx} variant="up" delay={idx * 100}>
                <div className="group relative h-full overflow-hidden rounded-3xl card-surface p-7 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-2xl hover:shadow-lavender/10">
                  <div className="absolute -end-16 -top-16 h-40 w-40 rounded-full bg-lavender/15 blur-3xl transition group-hover:bg-lavender/30 animate-ew-float-slow" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-lavender text-white on-brand shadow-lg shadow-lavender/40 transition-transform group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-5 text-xs font-semibold text-lavender-light">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-white">{L(svc.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{L(svc.body)}</p>
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
  index,
  hot,
  onHover,
  onOpen,
}: {
  work: Work;
  index: number;
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
          {tr("works.case")} · {String(index + 1).padStart(2, "0")}
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
    <section id="gallery" className="relative overflow-hidden border-t border-white/5 py-24">
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
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
                    : "border-white/15 bg-white/5 text-white/70 hover:border-lavender hover:text-white"
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
          {items.map((item, i) => (
            <ReelCard
              key={item.slug}
              work={item}
              index={i}
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
    <section id="partners" className="relative overflow-hidden border-t border-white/5 py-24">
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={L(sec.kicker)} title={L(sec.title)} />
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-6 max-w-4xl text-center leading-relaxed text-white/65">
            {L(sec.body)}
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => (
            <Reveal key={p.name} variant="zoom" delay={i * 60}>
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
    <section className="relative overflow-hidden border-t border-white/5 py-24">
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
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
                  <div className="text-xs text-white/60">{L(active.role)}</div>
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
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-3xl card-surface p-8 md:p-12">
            <div className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-lavender/25 blur-3xl animate-ew-float-slow" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-black text-white md:text-3xl">{L(sec.title)}</h3>
                <p className="mt-2 text-sm text-white/65">{L(sec.subtitle)}</p>
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
      <SectionBg src={sec.backdrop} opacity={sec.backdropOpacity} />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-[2rem] gradient-lavender p-8 text-white on-brand md:p-16">
            <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-ew-blob" />
            <div className="absolute -start-20 -bottom-20 h-72 w-72 rounded-full bg-black/30 blur-3xl animate-ew-float-slow" />
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                  {L(sec.kicker)}
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
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
                className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20"
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
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-lavender-dark transition hover:bg-white/90 disabled:opacity-60"
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

  // A social account with no URL set is left off rather than linked to "#".
  const socials = [
    { Icon: Instagram, label: "Instagram", href: settings.social.instagram },
    { Icon: Linkedin, label: "LinkedIn", href: settings.social.linkedin },
    { Icon: Twitter, label: "X", href: settings.social.twitter },
  ].filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
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
              <BrandLockup />
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">
                {L(settings.footer.tagline)}
              </p>
              <div className="mt-5 flex items-center gap-2">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href ?? "#"}
                    aria-label={label}
                    className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-lavender hover:text-white"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full bg-lavender/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <Icon className="relative h-4 w-4" />
                  </a>
                ))}
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
      <div className="min-h-screen bg-background text-foreground">
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
