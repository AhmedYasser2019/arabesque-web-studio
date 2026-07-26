import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const t: Dict = {
  // nav
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.about": { ar: "من نحن", en: "About" },
  "nav.services": { ar: "خدماتنا", en: "Services" },
  "nav.method": { ar: "منهجيتنا", en: "Methodology" },
  "nav.works": { ar: "أعمالنا", en: "Work" },
  "nav.partners": { ar: "شركاؤنا", en: "Partners" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact" },
  "nav.cta": { ar: "ابدأ مشروعك", en: "Start a project" },

  // hero
  "hero.eyebrow": {
    ar: "وكالة تسويقية إبداعية · الرياض",
    en: "Creative marketing agency · Riyadh",
  },
  "hero.title.a": { ar: "نحلّق بأعمالك", en: "We elevate your brand" },
  "hero.title.b": { ar: "نحو القمة", en: "toward the summit" },
  "hero.sub": {
    ar: "حلول إبداعية متكاملة في التسويق، الإعلام، والفعاليات — بروح النخبة وأثرٍ يُقاس.",
    en: "Integrated creative solutions in marketing, media, and events — elite in craft, measurable in impact.",
  },
  "hero.cta.primary": { ar: "استكشف خدماتنا", en: "Explore services" },
  "hero.slide": { ar: "شريحة", en: "Slide" },
  "hero.cta.secondary": { ar: "شاهد أعمالنا", en: "See our work" },

  // about
  "about.kicker": { ar: "من نحن", en: "About" },
  "about.title": {
    ar: "نُعيد حضور الهوية المؤسسية بأثرٍ يُصنع.",
    en: "Restoring corporate identity as an instrument of impact.",
  },
  "about.body": {
    ar: "في سوقٍ مليء بالمشاريع التسويقية المتشابهة، جئنا لنُحوّل الهوية المؤسسية إلى أداة تفاعلية ذكية تصنع الفرق. نجمع بين الفكرة والتنفيذ بأعلى معايير الجودة، ونعمل شركاء حقيقيين لعملائنا في المملكة وخارجها.",
    en: "In a market crowded with look-alike campaigns, we turn brand identity into an intelligent, interactive instrument. We fuse idea and execution at the highest standard, standing as true partners for clients inside and beyond the Kingdom.",
  },
  "about.vision.t": { ar: "رؤيتنا", en: "Vision" },
  "about.vision.b": {
    ar: "أن نكون الخيار الأول والشريك الوطني الرائد في حلول التسويق المتكاملة.",
    en: "To be the first choice and leading national partner for integrated marketing solutions.",
  },
  "about.mission.t": { ar: "رسالتنا", en: "Mission" },
  "about.mission.b": {
    ar: "صناعة تجارب تسويقية استثنائية تجمع الإبداع والابتكار بمعايير عالية.",
    en: "Crafting exceptional marketing experiences that blend creativity and innovation at the highest standard.",
  },
  "about.values.t": { ar: "قيمنا", en: "Values" },
  "about.values.b": {
    ar: "الإنجاز · التميّز · الشفافية · رضا العميل · الالتزام",
    en: "Achievement · Excellence · Transparency · Client focus · Commitment",
  },

  // services
  "svc.kicker": { ar: "خدماتنا", en: "Services" },
  "svc.title": {
    ar: "حلول متكاملة لعلامة تجارية تُحلّق.",
    en: "End-to-end solutions for a brand that takes flight.",
  },
  "svc.1.t": { ar: "الإدارة والاستشارات", en: "Management & Consulting" },
  "svc.1.b": {
    ar: "استشارات إدارية، أدلة إجرائية، استراتيجيات إعلامية وتسويقية، وتقارير رصد وتحليل تجربة العميل.",
    en: "Management consulting, procedural playbooks, media & marketing strategy, monitoring reports and CX analysis.",
  },
  "svc.2.t": { ar: "التنظيم والفعاليات", en: "Events & Organization" },
  "svc.2.b": {
    ar: "تغطية إعلامية، توثيق المناسبات، تنظيم المعارض والمؤتمرات، وإدارة الحشود الكبرى.",
    en: "Media coverage, event documentation, exhibitions & conferences, and large-scale crowd management.",
  },
  "svc.3.t": { ar: "وسائل التواصل الاجتماعي", en: "Social Media" },
  "svc.3.b": {
    ar: "حملات إعلانية، تأسيس وتطوير الهوية، إدارة الحسابات، وإنتاج محتوى إعلامي بجودة عالية.",
    en: "Advertising campaigns, brand identity build-out, account management, and premium content production.",
  },
  "svc.4.t": { ar: "الإنتاج البصري", en: "Visual Production" },
  "svc.4.b": {
    ar: "أكثر من 100 فيديو تسويقي وتقارير مرئية — من كتابة السيناريو إلى المونتاج والمعالجة.",
    en: "100+ marketing films and visual reports — scriptwriting through edit and post.",
  },

  // method
  "method.kicker": { ar: "منهجيتنا", en: "Methodology" },
  "method.title": { ar: "خمس ركائز. أثرٌ حقيقي.", en: "Five pillars. Real impact." },
  "method.1.t": { ar: "الاستماع والتحليل", en: "Listen & Analyze" },
  "method.1.b": {
    ar: "نفهم هوية العميل، جمهوره، وأهدافه.",
    en: "We understand identity, audience, and goals.",
  },
  "method.2.t": { ar: "التخطيط الذكي", en: "Smart Planning" },
  "method.2.b": {
    ar: "خارطة إعلامية متوازنة بين الرؤية والإمكانات.",
    en: "A media map balancing vision and resources.",
  },
  "method.3.t": { ar: "النقل المعرفي", en: "Knowledge Transfer" },
  "method.3.b": {
    ar: "نُشرك العميل لضمان استدامة الحضور.",
    en: "We involve clients for lasting presence.",
  },
  "method.4.t": { ar: "التنفيذ الإبداعي", en: "Creative Execution" },
  "method.4.b": {
    ar: "محتوى يعكس القيم ويجذب الانتباه.",
    en: "Content that reflects values and captures attention.",
  },
  "method.5.t": { ar: "المتابعة والتطوير", en: "Measure & Evolve" },
  "method.5.b": {
    ar: "نتابع الأداء ونطوّر بناءً على نتائج واقعية.",
    en: "We track performance and iterate on real data.",
  },

  // works
  "works.kicker": { ar: "أبرز أعمالنا", en: "Selected Work" },
  "works.title": {
    ar: "إنتاجات ومشاريع تصنع الأثر.",
    en: "Productions and projects that make an impact.",
  },
  "works.1.t": { ar: "التعاونية — فيلم تسويقي متكامل", en: "Tawuniya — end-to-end marketing film" },
  "works.1.b": {
    ar: "سيناريو، تصوير، مونتاج ومعالجة كاملة.",
    en: "Script, cinematography, edit, and full post.",
  },
  "works.2.t": { ar: "خيوط التاريخ — سلسلة وثائقية", en: "Khoyoot Al-Tarekh — documentary series" },
  "works.2.b": {
    ar: "بحث تاريخي، إنتاج، وهوية بصرية كاملة.",
    en: "Historical research, production, and full brand identity.",
  },
  "works.3.t": { ar: "المؤتمر الدولي للسلامة والصحة المهنية", en: "GOSH International Conference" },
  "works.3.b": {
    ar: "تغطية إعلامية كاملة لفعالية دولية كبرى.",
    en: "Full media coverage of a major international event.",
  },
  "works.4.t": { ar: "بطولات ومناسبات كبرى", en: "Championships & major events" },
  "works.4.b": {
    ar: "برومو، تقارير، وتغطية شاملة لورش وفعاليات.",
    en: "Promos, reports, and full coverage of workshops and events.",
  },

  // partners
  "partners.kicker": { ar: "شركاء النجاح", en: "Trusted by" },
  "partners.title": {
    ar: "شراكات مبنية على الثقة والأثر.",
    en: "Partnerships built on trust and impact.",
  },
  "partners.body": {
    ar: "نعتزّ في إيليت وينغ بالشراكات التي نبنيها مع عملائنا، والتي تقوم على الثقة المتبادلة والسعي المستمر لتحقيق التميّز. فنجاح شركائنا هو امتداد لنجاحنا، ولذلك نحرص دائمًا على تقديم حلول تسويقية وتطويرية مبتكرة تواكب طموحاتهم وتدعم نمو أعمالهم. نؤمن بأن الشراكة الحقيقية لا تقتصر على تقديم خدمة فحسب، بل تقوم على فهم عميق لاحتياجات شركائنا والعمل معهم كفريق واحد لصناعة نتائج ملموسة وأثر مستدام.",
    en: "At Elite Wing we take pride in the partnerships we build with our clients — grounded in mutual trust and a constant pursuit of excellence. Our partners' success is an extension of our own, which is why we consistently deliver inventive marketing and development solutions that match their ambition and support their growth. Real partnership, we believe, is not simply providing a service: it is understanding our partners deeply and working alongside them as one team to create tangible results and lasting impact.",
  },

  // contact
  "contact.kicker": { ar: "تواصل معنا", en: "Contact" },
  "contact.title": {
    ar: "نحلّق معك بإبداعٍ يُحدث الأثر.",
    en: "Let's fly your brand higher — together.",
  },
  "contact.sub": {
    ar: "أخبرنا عن مشروعك، وسنعود إليك خلال يوم عمل.",
    en: "Tell us about your project and we'll reply within one business day.",
  },
  "contact.email": { ar: "البريد", en: "Email" },
  "contact.phone": { ar: "الهاتف", en: "Phone" },
  "contact.location": { ar: "الموقع", en: "Location" },
  "contact.location.v": { ar: "الرياض، المملكة العربية السعودية", en: "Riyadh, Saudi Arabia" },
  "contact.cta": { ar: "أرسل رسالة", en: "Send a message" },
  "contact.form.name": { ar: "الاسم", en: "Name" },
  "contact.form.email": { ar: "البريد الإلكتروني", en: "Email address" },
  "contact.form.message": { ar: "أخبرنا عن مشروعك", en: "Tell us about your project" },

  // stats
  "stats.projects": { ar: "مشروع منجز", en: "Projects delivered" },
  "stats.partners": { ar: "شريك ناجح", en: "Trusted partners" },
  "stats.pillars": { ar: "ركائز منهجية", en: "Method pillars" },
  "stats.location": { ar: "الرياض · المملكة", en: "Riyadh · KSA" },
  "stats.events": { ar: "فعالية مكتملة", en: "Events delivered" },
  "stats.clients": { ar: "عميل سعيد", en: "Happy clients" },
  "stats.cities": { ar: "مدينة حول المملكة", en: "Cities across KSA" },
  "stats.years": { ar: "سنوات من الخبرة", en: "Years of experience" },

  // upcoming events
  "up.kicker": { ar: "الفعاليات القادمة", en: "Upcoming Events" },
  "up.title": {
    ar: "اكتشف مجموعة من الفعاليات المميزة",
    en: "Discover a curated set of standout events",
  },
  "up.cta": { ar: "تفاصيل أكثر", en: "Learn more" },
  "up.all": { ar: "عرض جميع الفعاليات", en: "View all events" },
  "up.1.t": { ar: "منتدى الابتكار في الأعمال", en: "Business Innovation Forum" },
  "up.1.b": { ar: "الرياض · فندق الموسوبيل", en: "Riyadh · Mövenpick Hotel" },
  "up.2.t": { ar: "قمة التحول الرقمي", en: "Digital Transformation Summit" },
  "up.2.b": { ar: "الرياض · مركز الملك عبدالله المالي", en: "Riyadh · KAFD" },
  "up.3.t": { ar: "ملتقى الاستثمار السعودي", en: "Saudi Investment Meetup" },
  "up.3.b": { ar: "الرياض · فندق ريتز كارلتون", en: "Riyadh · Ritz Carlton" },

  // gallery
  "gal.kicker": { ar: "لحظات من نجاحاتنا", en: "Moments of Success" },
  "gal.title": { ar: "من فعالياتنا السابقة", en: "From our past events" },
  "gal.more": { ar: "عرض المزيد من الأعمال", en: "See more work" },

  // work reel — categories
  "cat.corporate": { ar: "الفعاليات المؤسسية", en: "Corporate Activations" },
  "cat.conf": { ar: "المؤتمرات والبطولات", en: "Conferences & Championships" },
  "cat.doc": { ar: "أفلام وثائقية وتراث", en: "Documentary & Heritage" },
  "cat.health": { ar: "الرعاية الصحية والافتتاحات", en: "Healthcare & Openings" },
  "cat.reel": { ar: "ريل إيليت وينغ", en: "Elite Wing Reel" },
  "reel.prev": { ar: "السابق", en: "Previous" },
  "reel.next": { ar: "التالي", en: "Next" },

  // work reel — titles
  "reel.tawuniya": { ar: "التعاونية — الفيلم المؤسسي", en: "Tawuniya — Corporate Film" },
  "reel.alrajhi": {
    ar: "التعاونية × مصرف الراجحي — يوم صحي",
    en: "Tawuniya × Al Rajhi Bank — Health Day",
  },
  "reel.riyad-bank": {
    ar: "التعاونية × بنك الرياض — يوم صحي",
    en: "Tawuniya × Riyad Bank — Health Day",
  },
  "reel.anb": { ar: "التعاونية × البنك العربي الوطني", en: "Tawuniya × Arab National Bank" },
  "reel.mobily": { ar: "التعاونية × موبايلي", en: "Tawuniya × Mobily" },
  "reel.stc": { ar: "التعاونية × stc", en: "Tawuniya × stc" },
  "reel.real-estate-registry": {
    ar: "التعاونية × السجل العقاري",
    en: "Tawuniya × Real Estate Registry",
  },
  "reel.gosh7": { ar: "مؤتمر GOSH السابع", en: "GOSH 7 Conference" },
  "reel.workshop-mena": { ar: "ورشة عمل مينا", en: "Meena Workshop" },
  "reel.r7": { ar: "فايتاليتي ران — التعاونية", en: "Tawuniya Vitality Run" },
  "reel.padel": { ar: "بطولة سرك للبادل", en: "SIRC Padel Championship" },
  "reel.khoyoot-altarekh": {
    ar: "خيوط التاريخ — سلسلة وثائقية",
    en: "Khoyoot Al-Tarekh — Documentary",
  },
  "reel.majlis-turathi": { ar: "مجلس تراثي — برومو", en: "Heritage Majlis — Promo" },
  "reel.amanat-riyadh": {
    ar: "أمانة الرياض — تصريف السيول",
    en: "Riyadh Municipality — Flood Drainage",
  },
  "reel.first-final": { ar: "مينا — منشآت الرعاية الصحية", en: "Meena — Healthcare Facilities" },
  "reel.promo2": { ar: "مركز CRC — افتتاح صحة المرأة", en: "CRC — Women's Health Opening" },
  "reel.e-w": { ar: "إيليت وينغ — الفيلم التعريفي", en: "Elite Wing — Brand Film" },
  "reel.elite-wing": { ar: "إيليت وينغ — ريل الأعمال", en: "Elite Wing — Showreel" },

  // testimonials
  "test.kicker": { ar: "ماذا يقول عملاؤنا", en: "Testimonials" },
  "test.title": { ar: "شهادات تصنع الفرق", en: "Words from our partners" },
  "test.1.q": {
    ar: "كانت تجربتنا مع إيليت وينغ استثنائية بكل المقاييس، فريق محترف ينظم باهتمام وبالتفاصيل بفوق توقعاتنا.",
    en: "Working with Elite Wing was exceptional — a professional team with obsessive attention to detail.",
  },
  "test.1.n": { ar: "أ. محمد العتيبي", en: "Mohammed Al‑Otaibi" },
  "test.1.r": { ar: "الرئيس التنفيذي · شركة التقنية المتقدمة", en: "CEO · Advanced Tech Co." },
  "test.2.q": {
    ar: "أدارت الفريق حدثاً دولياً ضخماً بسلاسة تامة وصورة لائقة بمكانة المملكة.",
    en: "They delivered a large international event with total ease and a presentation worthy of the Kingdom.",
  },
  "test.2.n": { ar: "د. سارة الحربي", en: "Dr. Sara Al‑Harbi" },
  "test.2.r": { ar: "مدير التسويق · مجموعة الرياض", en: "Marketing Director · Riyadh Group" },

  // newsletter
  "news.title": { ar: "اشترك ليصلك كل جديد", en: "Stay in the loop" },
  "news.sub": {
    ar: "انضم إلى قائمتنا لتصلك أخبار الفعاليات والعروض الحصرية.",
    en: "Join our list for event news and exclusive offers.",
  },
  "news.placeholder": { ar: "بريدك الإلكتروني", en: "Your email" },
  "news.cta": { ar: "اشترك الآن", en: "Subscribe" },

  // works
  "works.case": { ar: "مشروع", en: "Case" },

  "footer.tagline": {
    ar: "من الخيال إلى الواقع… نحن جناحك.",
    en: "From imagination to reality — we are your wing.",
  },
  "footer.rights": {
    ar: "© 2026 إيليت وينغ. جميع الحقوق محفوظة.",
    en: "© 2026 Elite Wing. All rights reserved.",
  },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
  dir: "rtl" | "ltr";
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? "ar");

  useEffect(() => {
    if (initialLang) return;
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, [initialLang]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const tr = (key: keyof typeof t) => t[key]?.[lang] ?? String(key);

  return (
    <Ctx.Provider value={{ lang, setLang, tr, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
}
