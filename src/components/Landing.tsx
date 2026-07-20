import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Compass,
  Camera,
  Share2,
  Ear,
  Brain,
  Users,
  Wand2,
  LineChart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { I18nProvider, useI18n, type Lang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import heroBg from "@/assets/hero.jpg";
import wingMark from "@/assets/wing-mark.png";

function LangSwitch() {
  const { lang } = useI18n();
  const other: Lang = lang === "ar" ? "en" : "ar";
  return (
    <Link
      to={other === "ar" ? "/ar" : "/en"}
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80 transition hover:border-lavender hover:text-lavender-dark"
      aria-label="Switch language"
      hrefLang={other}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {other === "ar" ? "العربية" : "English"}
    </Link>
  );
}

function WingMark({ className = "h-9 w-9" }: { className?: string }) {
  return <img src={wingMark} alt="Elite Wing" className={`${className} object-contain`} />;
}

function Header() {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", key: "nav.about" as const },
    { href: "#services", key: "nav.services" as const },
    { href: "#method", key: "nav.method" as const },
    { href: "#works", key: "nav.works" as const },
    { href: "#partners", key: "nav.partners" as const },
    { href: "#contact", key: "nav.contact" as const },
  ];
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <WingMark />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-widest text-navy">ELITE WING</div>
            <div className="text-[11px] text-lavender-dark">إيليت وينغ</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/70 transition hover:text-lavender-dark"
            >
              {tr(l.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href="#contact"
            className="hidden rounded-full gradient-lavender px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 md:inline-flex"
          >
            {tr("nav.cta")}
          </a>
          <button
            className="md:hidden rounded-md border border-border p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 px-5 py-4">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground/80"
              >
                {tr(l.key)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { tr } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      {/* Floating gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -end-24 -z-10 h-96 w-96 rounded-full bg-lavender/30 opacity-60 blur-3xl animate-ew-blob" />
      <div
        className="pointer-events-none absolute top-40 -start-24 -z-10 h-80 w-80 rounded-full bg-lavender-dark/25 opacity-60 blur-3xl animate-ew-float-slow"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="pointer-events-none absolute bottom-10 end-1/4 -z-10 h-64 w-64 rounded-full bg-pale/60 opacity-70 blur-3xl animate-ew-blob"
        style={{ animationDelay: "-8s" }}
      />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 md:px-8 md:pt-28">
        <Reveal variant="fade" duration={600}>
          <span className="inline-flex items-center gap-2 rounded-full border border-lavender/40 bg-lavender-light/50 px-3 py-1 text-xs font-medium text-lavender-dark">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lavender" />
            </span>
            {tr("hero.eyebrow")}
          </span>
        </Reveal>
        <Reveal variant="up" delay={120} duration={800}>
          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[1.05] tracking-tight text-navy md:text-7xl">
            {tr("hero.title.a")} <span className="text-shimmer">{tr("hero.title.b")}</span>
          </h1>
        </Reveal>
        <Reveal variant="up" delay={240}>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70 md:text-xl">{tr("hero.sub")}</p>
        </Reveal>
        <Reveal variant="up" delay={360}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full gradient-lavender px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-lavender/30 transition hover:opacity-90 hover:shadow-xl hover:shadow-lavender/40 hover:-translate-y-0.5"
            >
              {tr("hero.cta.primary")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
            </a>
            <a
              href="#works"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-lavender hover:text-lavender-dark hover:-translate-y-0.5"
            >
              {tr("hero.cta.secondary")}
            </a>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 md:grid-cols-4">
          {[
            ["+100", tr("works.title")],
            ["+50", tr("partners.kicker")],
            ["5", tr("method.title")],
            ["2026", "Riyadh · KSA"],
          ].map(([n, l], i) => (
            <Reveal key={i} variant="up" delay={500 + i * 120}>
              <div>
                <div className="text-3xl font-black text-navy md:text-4xl">{n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll"
            className="animate-ew-bounce-slow inline-flex h-10 w-6 items-center justify-center rounded-full border border-lavender/50"
          >
            <span className="mt-1 block h-2 w-1 rounded-full bg-lavender" />
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender-light/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lavender-dark">
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-navy md:text-5xl">{title}</h2>
    </div>
  );
}

function About() {
  const { tr } = useI18n();
  return (
    <section id="about" className="border-t border-border/60 bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("about.kicker")} title={tr("about.title")} />
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-foreground/70">
          {tr("about.body")}
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { t: tr("about.vision.t"), b: tr("about.vision.b") },
            { t: tr("about.mission.t"), b: tr("about.mission.b") },
            { t: tr("about.values.t"), b: tr("about.values.b") },
          ].map((x, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-border bg-background p-8 transition hover:border-lavender hover:shadow-xl hover:shadow-lavender/10"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-lavender text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-navy">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{x.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { tr } = useI18n();
  const items = [
    { i: Compass, k: "svc.1" },
    { i: Camera, k: "svc.2" },
    { i: Share2, k: "svc.3" },
    { i: Wand2, k: "svc.4" },
  ] as const;
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("svc.kicker")} title={tr("svc.title")} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map(({ i: Icon, k }, idx) => (
            <div
              key={k}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 transition hover:-translate-y-1 hover:border-lavender hover:shadow-2xl hover:shadow-lavender/10"
            >
              <div className="absolute -end-16 -top-16 h-40 w-40 rounded-full bg-lavender/10 blur-3xl transition group-hover:bg-lavender/20" />
              <div className="relative flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-lavender text-white shadow-lg shadow-lavender/30">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-lavender-dark">0{idx + 1}</div>
                  <h3 className="mt-1 text-2xl font-bold text-navy">
                    {tr(`${k}.t` as keyof typeof import("@/lib/i18n").t)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {tr(`${k}.b` as keyof typeof import("@/lib/i18n").t)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  const { tr } = useI18n();
  const steps = [
    { i: Ear, k: "method.1" },
    { i: Brain, k: "method.2" },
    { i: Users, k: "method.3" },
    { i: Wand2, k: "method.4" },
    { i: LineChart, k: "method.5" },
  ] as const;
  return (
    <section id="method" className="border-t border-border/60 bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lavender-light">
            {tr("method.kicker")}
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            {tr("method.title")}
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {steps.map(({ i: Icon, k }, idx) => (
            <div
              key={k}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lavender/50 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender/20 text-lavender-light">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-lavender-light/60">0{idx + 1}</span>
              </div>
              <h3 className="text-lg font-bold">
                {tr(`${k}.t` as keyof typeof import("@/lib/i18n").t)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {tr(`${k}.b` as keyof typeof import("@/lib/i18n").t)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works() {
  const { tr } = useI18n();
  const items = ["works.1", "works.2", "works.3", "works.4"] as const;
  return (
    <section id="works" className="py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("works.kicker")} title={tr("works.title")} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((k, i) => (
            <article
              key={k}
              className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-lavender-light/40 to-background p-8 transition hover:border-lavender"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -bottom-24 -end-24 h-64 w-64 rounded-full gradient-lavender opacity-20 blur-3xl" />
              </div>
              <div className="relative">
                <div className="text-xs font-bold uppercase tracking-widest text-lavender-dark">
                  Case · 0{i + 1}
                </div>
                <h3 className="mt-3 text-2xl font-bold text-navy md:text-3xl">
                  {tr(`${k}.t` as keyof typeof import("@/lib/i18n").t)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {tr(`${k}.b` as keyof typeof import("@/lib/i18n").t)}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lavender-dark">
                  <span>{tr("hero.cta.secondary")}</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const { tr } = useI18n();
  const names = [
    "Tawuniya", "stc", "Saudia", "SIRC", "NUPCO",
    "The Chefz", "R7 Run Club", "Water Burger", "QFMC", "Meena",
    "Keuot el-Tarekh",
  ];
  return (
    <section id="partners" className="border-t border-border/60 bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead kicker={tr("partners.kicker")} title={tr("partners.title")} />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {names.map((n) => (
            <div
              key={n}
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-navy/80 transition hover:border-lavender hover:text-lavender-dark"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { tr } = useI18n();
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] gradient-lavender p-8 text-white md:p-16">
          <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -start-20 -bottom-20 h-72 w-72 rounded-full bg-navy/30 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                {tr("contact.kicker")}
              </div>
              <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                {tr("contact.title")}
              </h2>
              <p className="mt-4 max-w-md text-white/85">{tr("contact.sub")}</p>
              <div className="mt-8 space-y-3 text-sm">
                <a href="mailto:info@elitewing.sa" className="flex items-center gap-3 text-white/90 hover:text-white">
                  <Mail className="h-4 w-4" /> info@elitewing.sa
                </a>
                <a href="tel:+966555555555" className="flex items-center gap-3 text-white/90 hover:text-white" dir="ltr">
                  <Phone className="h-4 w-4" /> +966 55 555 5555
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
                  placeholder={tr("nav.about")}
                  required
                />
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                  placeholder={tr("contact.email")}
                  required
                />
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none focus:border-white"
                  placeholder={tr("contact.title")}
                />
                <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-lavender-dark transition hover:bg-white/90">
                  {tr("contact.cta")}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { tr } = useI18n();
  return (
    <footer className="border-t border-border/60 bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <WingMark className="h-7 w-7" />
          <div className="text-sm">
            <div className="font-bold text-navy">ELITE WING · إيليت وينغ</div>
            <div className="text-xs text-muted-foreground">{tr("footer.tagline")}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" aria-label="Instagram" className="hover:text-lavender-dark"><Instagram className="h-4 w-4" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-lavender-dark"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-lavender-dark"><Twitter className="h-4 w-4" /></a>
        </div>
        <div className="text-xs text-muted-foreground">{tr("footer.rights")}</div>
      </div>
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
          <About />
          <Services />
          <Method />
          <Works />
          <Partners />
          <Contact />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
