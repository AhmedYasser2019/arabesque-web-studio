import { useEffect, useState } from "react";
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
} from "lucide-react";
import { I18nProvider, useI18n, type Lang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import wingMark from "@/assets/wing-mark.png";

/* ---------------- Free stock media (Unsplash photos + Pexels videos) ---------------- */
// Hero looping background — concert stage lights, free CC0 (Pexels 3209828)
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?auto=format&fit=crop&w=1920&q=80";

const UPCOMING = [
  {
    date: { d: "24", m: { ar: "يونيو", en: "Jun" }, y: "2026" },
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: { d: "15", m: { ar: "يوليو", en: "Jul" }, y: "2026" },
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: { d: "05", m: { ar: "أغسطس", en: "Aug" }, y: "2026" },
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
];

// Each gallery card has a poster image + a free stock video (Pexels).
const GALLERY: { img: string; video: string }[] = [
  {
    img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
    video: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    video: "https://videos.pexels.com/video-files/2795750/2795750-hd_1920_1080_25fps.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    video: "https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_30fps.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
    video: "https://videos.pexels.com/video-files/2022396/2022396-hd_1920_1080_30fps.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&q=80",
    video: "https://videos.pexels.com/video-files/3018669/3018669-hd_1920_1080_24fps.mp4",
  },
  {
    img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    video: "https://videos.pexels.com/video-files/1721294/1721294-hd_1920_1080_25fps.mp4",
  },
];

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

function WingMark({ className = "h-9 w-9" }: { className?: string }) {
  return <img src={wingMark} alt="Elite Wing" className={`${className} object-contain`} />;
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className={`transition-all duration-500 ${compact ? "scale-90" : "scale-100"} group-hover:rotate-6`}>
        <WingMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
      </span>
      <div className="leading-tight">
        <div className={`font-bold tracking-[0.18em] text-white ${compact ? "text-[12px]" : "text-[13px]"}`}>
          ELITE WING
        </div>
        <div className="text-[10px] text-lavender-light/80 tracking-widest">إيليت وينغ</div>
      </div>
    </a>
  );
}

function Header() {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { href: "#about", key: "nav.about" as const },
    { href: "#services", key: "nav.services" as const },
    { href: "#events", key: "nav.works" as const },
    { href: "#gallery", key: "works.kicker" as const },
    { href: "#contact", key: "nav.contact" as const },
  ];

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
        scrolled ? "glass border-b border-white/10 shadow-2xl shadow-lavender-dark/10" : "border-b border-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8 ${scrolled ? "py-2.5" : "py-4"} transition-all duration-500`}>
        <BrandLockup compact={scrolled} />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-white/75 transition-colors duration-300 hover:text-white"
            >
              {tr(l.key)}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 rounded-full gradient-lavender transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 rounded-full gradient-lavender px-4 py-2 text-xs font-bold text-white shadow-lg shadow-lavender/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lavender/50 md:inline-flex"
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
            <Menu className={`h-4 w-4 transition-all duration-300 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <X className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-out ${open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-5 py-4">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm text-white/85 transition-all duration-300 hover:border-lavender/40 hover:bg-white/5 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              <span>{tr(l.key)}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 rtl:group-hover:-translate-x-0.5" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { tr } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden">
      {/* City / concert lights backdrop — looping video with poster fallback */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-hidden
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--background) 40%, transparent) 0%, color-mix(in oklch, var(--background) 85%, transparent) 65%, var(--background) 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />

      {/* Glow wing behind headline */}
      <div className="pointer-events-none absolute end-[6%] top-[8%] -z-10 hidden md:block">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-lavender/40 blur-[80px] animate-ew-glow" />
          <img src={wingMark} alt="" aria-hidden className="relative h-[420px] w-[420px] opacity-90 mix-blend-screen animate-ew-float" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 md:px-8 md:pt-32">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Reveal variant="fade" duration={600}>
              <span className="inline-flex items-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 px-3 py-1 text-xs font-medium text-lavender-light">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lavender" />
                </span>
                {tr("hero.eyebrow")}
              </span>
            </Reveal>
            <Reveal variant="up" delay={120} duration={800}>
              <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                {tr("hero.title.a")} <span className="text-shimmer">{tr("hero.title.b")}</span>
              </h1>
            </Reveal>
            <Reveal variant="up" delay={240}>
              <p className="mt-6 max-w-xl text-lg text-white/70">{tr("hero.sub")}</p>
            </Reveal>
            <Reveal variant="up" delay={360}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full gradient-lavender px-6 py-3 text-sm font-bold text-white shadow-lg shadow-lavender/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-lavender/50"
                >
                  {tr("nav.cta")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
                </a>
                <a
                  href="#events"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lavender hover:-translate-y-0.5"
                >
                  {tr("hero.cta.primary")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right column spacer for wing */}
          <div className="hidden md:block" />
        </div>

        {/* Stats bar */}
        <Reveal variant="up" delay={500}>
          <div className="mt-16 rounded-3xl card-surface p-6 md:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {([
                { icon: Users, end: 250, suffix: "+", label: tr("stats.clients") },
                { icon: Calendar, end: 450, suffix: "+", label: tr("stats.events") },
                { icon: MapPin, end: 15, suffix: "+", label: tr("stats.cities") },
                { icon: Award, end: 10, suffix: "+", label: tr("stats.years") },
              ] as const).map(({ icon: Icon, end, suffix, label }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lavender/15 text-lavender-light ring-1 ring-lavender/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white md:text-3xl">
                      <CountUp end={end} suffix={suffix} />
                    </div>
                    <div className="mt-0.5 text-xs text-white/60">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section head ---------------- */
function SectionHead({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <Reveal variant="up">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lavender-light">
          <Sparkles className="h-3 w-3" />
          {kicker}
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        {subtitle && <p className="mt-3 text-white/60">{subtitle}</p>}
      </div>
    </Reveal>
  );
}

/* ---------------- Upcoming events ---------------- */
function UpcomingEvents() {
  const { tr, lang } = useI18n();
  return (
    <section id="events" className="py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("up.kicker")} title={tr("up.title")} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {UPCOMING.map((ev, i) => (
            <Reveal key={i} variant="up" delay={i * 120}>
              <article className="group relative overflow-hidden rounded-3xl card-surface transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-2xl hover:shadow-lavender/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={ev.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-4 end-4 rounded-2xl bg-background/85 px-4 py-3 text-center backdrop-blur-md ring-1 ring-lavender/30">
                    <div className="text-2xl font-black leading-none text-white">{ev.date.d}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-lavender-light">
                      {ev.date.m[lang]}
                    </div>
                    <div className="text-[10px] text-white/60">{ev.date.y}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">
                    {tr(`up.${i + 1}.t` as keyof typeof import("@/lib/i18n").t)}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                    <MapPin className="h-3.5 w-3.5 text-lavender" />
                    {tr(`up.${i + 1}.b` as keyof typeof import("@/lib/i18n").t)}
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-lavender/40 bg-lavender/10 px-4 py-2.5 text-xs font-bold text-lavender-light transition hover:bg-lavender/20"
                  >
                    {tr("up.cta")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lavender hover:-translate-y-0.5"
          >
            {tr("up.all")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const { tr } = useI18n();
  return (
    <section id="about" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("about.kicker")} title={tr("about.title")} />
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-white/70">{tr("about.body")}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { t: tr("about.vision.t"), b: tr("about.vision.b"), Icon: Compass },
            { t: tr("about.mission.t"), b: tr("about.mission.b"), Icon: Sparkles },
            { t: tr("about.values.t"), b: tr("about.values.b"), Icon: Award },
          ].map((x, i) => (
            <Reveal key={i} variant="up" delay={i * 140}>
              <div className="group h-full rounded-3xl card-surface p-8 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-xl hover:shadow-lavender/10">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-lavender text-white shadow-lg shadow-lavender/40 transition-transform group-hover:rotate-6 group-hover:scale-110">
                  <x.Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{x.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const { tr } = useI18n();
  const items = [
    { i: Compass, k: "svc.1" },
    { i: Camera, k: "svc.2" },
    { i: Share2, k: "svc.3" },
    { i: Wand2, k: "svc.4" },
  ] as const;
  return (
    <section id="services" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("svc.kicker")} title={tr("svc.title")} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ i: Icon, k }, idx) => (
            <Reveal key={k} variant="up" delay={idx * 100}>
              <div className="group relative h-full overflow-hidden rounded-3xl card-surface p-7 transition hover:-translate-y-1 hover:border-lavender/60 hover:shadow-2xl hover:shadow-lavender/10">
                <div className="absolute -end-16 -top-16 h-40 w-40 rounded-full bg-lavender/15 blur-3xl transition group-hover:bg-lavender/30 animate-ew-float-slow" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-lavender text-white shadow-lg shadow-lavender/40 transition-transform group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-xs font-semibold text-lavender-light">0{idx + 1}</div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {tr(`${k}.t` as keyof typeof import("@/lib/i18n").t)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {tr(`${k}.b` as keyof typeof import("@/lib/i18n").t)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery (past events) ---------------- */
function Gallery() {
  const { tr } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="gallery" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("gal.kicker")} title={tr("gal.title")} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal key={i} variant="zoom" delay={i * 80}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-3xl card-surface text-start"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-lavender-light">
                      {tr("works.case")} · 0{i + 1}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      {tr(`works.${((i % 4) + 1)}.t` as keyof typeof import("@/lib/i18n").t)}
                    </div>
                  </div>
                  <span
                    aria-label="Play"
                    className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-lavender-dark shadow-lg transition group-hover:scale-110"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/50 animate-ew-pulse-ring" />
                    <Play className="relative h-4 w-4 fill-current" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lavender hover:-translate-y-0.5"
          >
            {tr("gal.more")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute end-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lavender-dark shadow-lg transition hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              key={GALLERY[active].video}
              src={GALLERY[active].video}
              poster={GALLERY[active].img}
              className="h-full w-full"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lavender hover:-translate-y-0.5"
          >
            {tr("gal.more")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const { tr } = useI18n();
  const [idx, setIdx] = useState(0);
  const items = [1, 2] as const;
  const active = items[idx];
  const next = () => setIdx((v) => (v + 1) % items.length);
  const prev = () => setIdx((v) => (v - 1 + items.length) % items.length);

  return (
    <section className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHead kicker={tr("test.kicker")} title={tr("test.title")} />
        <Reveal variant="up" delay={120}>
          <div className="relative mt-12 rounded-3xl card-surface p-8 md:p-12">
            <Quote className="absolute end-8 top-8 h-10 w-10 text-lavender/30" />
            <p className="max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
              {tr(`test.${active}.q` as keyof typeof import("@/lib/i18n").t)}
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-lavender text-white font-bold">
                  {tr(`test.${active}.n` as keyof typeof import("@/lib/i18n").t).slice(0, 1)}
                </div>
                <div>
                  <div className="font-bold text-white">
                    {tr(`test.${active}.n` as keyof typeof import("@/lib/i18n").t)}
                  </div>
                  <div className="text-xs text-white/60">
                    {tr(`test.${active}.r` as keyof typeof import("@/lib/i18n").t)}
                  </div>
                </div>
              </div>
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
            </div>
            <div className="mt-4 flex items-center gap-1">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-lavender" : "w-3 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */
function Newsletter() {
  const { tr } = useI18n();
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal variant="up">
          <div className="relative overflow-hidden rounded-3xl card-surface p-8 md:p-12">
            <div className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-lavender/25 blur-3xl animate-ew-float-slow" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-black text-white md:text-3xl">{tr("news.title")}</h3>
                <p className="mt-2 text-sm text-white/65">{tr("news.sub")}</p>
              </div>
              <form
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder={tr("news.placeholder")}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
                />
                <button className="inline-flex items-center gap-1.5 rounded-xl gradient-lavender px-4 py-2 text-xs font-bold text-white shadow-md shadow-lavender/30 transition hover:-translate-y-0.5">
                  {tr("news.cta")}
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
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
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-[2rem] gradient-lavender p-8 text-white md:p-16">
            <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-ew-blob" />
            <div className="absolute -start-20 -bottom-20 h-72 w-72 rounded-full bg-black/30 blur-3xl animate-ew-float-slow" />
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                  {tr("contact.kicker")}
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">{tr("contact.title")}</h2>
                <p className="mt-4 max-w-md text-white/85">{tr("contact.sub")}</p>
                <div className="mt-8 space-y-3 text-sm">
                  <a href="mailto:info@elitewing.sa" className="flex items-center gap-3 text-white/90 hover:text-white">
                    <Mail className="h-4 w-4" /> info@elitewing.sa
                  </a>
                  <a href="tel:+966111234567" className="flex items-center gap-3 text-white/90 hover:text-white" dir="ltr">
                    <Phone className="h-4 w-4" /> +966 11 123 4567
                  </a>
                  <div className="flex items-center gap-3 text-white/90">
                    <MapPin className="h-4 w-4" /> {tr("contact.location.v")}
                  </div>
                </div>
              </div>
              <form
                className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:info@elitewing.sa";
                }}
              >
                <div className="grid gap-3">
                  <input
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                    placeholder={tr("contact.form.name")}
                    required
                  />
                  <input
                    type="email"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                    placeholder={tr("contact.form.email")}
                    required
                  />
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                    placeholder={tr("contact.form.message")}
                  />
                  <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-lavender-dark transition hover:bg-white/90">
                    {tr("contact.cta")}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
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
  const socials = [
    { Icon: Instagram, label: "Instagram", href: "#" },
    { Icon: Linkedin, label: "LinkedIn", href: "#" },
    { Icon: Twitter, label: "X", href: "#" },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-lavender/20 blur-3xl animate-ew-float-slow" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lavender to-transparent opacity-70" />

      <Reveal variant="up">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <BrandLockup />
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">{tr("footer.tagline")}</p>
              <div className="mt-5 flex items-center gap-2">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-lavender hover:text-white"
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-lavender/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon className="relative h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold text-white">{tr("nav.services")}</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#services" className="hover:text-lavender-light">{tr("svc.1.t")}</a></li>
                <li><a href="#services" className="hover:text-lavender-light">{tr("svc.2.t")}</a></li>
                <li><a href="#services" className="hover:text-lavender-light">{tr("svc.3.t")}</a></li>
                <li><a href="#services" className="hover:text-lavender-light">{tr("svc.4.t")}</a></li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold text-white">{tr("nav.home")}</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#about" className="hover:text-lavender-light">{tr("nav.about")}</a></li>
                <li><a href="#events" className="hover:text-lavender-light">{tr("up.kicker")}</a></li>
                <li><a href="#gallery" className="hover:text-lavender-light">{tr("gal.kicker")}</a></li>
                <li><a href="#contact" className="hover:text-lavender-light">{tr("nav.contact")}</a></li>
              </ul>
            </div>

            <div>
              <div className="mb-3 text-sm font-bold text-white">{tr("nav.contact")}</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-lavender" /> <span dir="ltr">+966 11 123 4567</span></li>
                <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-lavender" /> info@elitewing.sa</li>
                <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-lavender" /> {tr("contact.location.v")}</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
            <div>{tr("footer.rights")}</div>
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

export function Landing({ lang }: { lang?: Lang }) {
  return (
    <I18nProvider initialLang={lang}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <UpcomingEvents />
          <About />
          <Services />
          <Gallery />
          <Testimonials />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
