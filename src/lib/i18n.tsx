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
  "hero.eyebrow": { ar: "وكالة تسويقية إبداعية · الرياض", en: "Creative marketing agency · Riyadh" },
  "hero.title.a": { ar: "نحلّق بأعمالك", en: "We elevate your brand" },
  "hero.title.b": { ar: "نحو القمة", en: "toward the summit" },
  "hero.sub": {
    ar: "حلول إبداعية متكاملة في التسويق، الإعلام، والفعاليات — بروح النخبة وأثرٍ يُقاس.",
    en: "Integrated creative solutions in marketing, media, and events — elite in craft, measurable in impact.",
  },
  "hero.cta.primary": { ar: "استكشف خدماتنا", en: "Explore services" },
  "hero.cta.secondary": { ar: "شاهد أعمالنا", en: "See our work" },

  // about
  "about.kicker": { ar: "من نحن", en: "About" },
  "about.title": { ar: "نُعيد حضور الهوية المؤسسية بأثرٍ يُصنع.", en: "Restoring corporate identity as an instrument of impact." },
  "about.body": {
    ar: "في سوقٍ مليء بالمشاريع التسويقية المتشابهة، جئنا لنُحوّل الهوية المؤسسية إلى أداة تفاعلية ذكية تصنع الفرق. نجمع بين الفكرة والتنفيذ بأعلى معايير الجودة، ونعمل شركاء حقيقيين لعملائنا في المملكة وخارجها.",
    en: "In a market crowded with look-alike campaigns, we turn brand identity into an intelligent, interactive instrument. We fuse idea and execution at the highest standard, standing as true partners for clients inside and beyond the Kingdom.",
  },
  "about.vision.t": { ar: "رؤيتنا", en: "Vision" },
  "about.vision.b": { ar: "أن نكون الخيار الأول والشريك الوطني الرائد في حلول التسويق المتكاملة.", en: "To be the first choice and leading national partner for integrated marketing solutions." },
  "about.mission.t": { ar: "رسالتنا", en: "Mission" },
  "about.mission.b": { ar: "صناعة تجارب تسويقية استثنائية تجمع الإبداع والابتكار بمعايير عالية.", en: "Crafting exceptional marketing experiences that blend creativity and innovation at the highest standard." },
  "about.values.t": { ar: "قيمنا", en: "Values" },
  "about.values.b": { ar: "الإنجاز · التميّز · الشفافية · رضا العميل · الالتزام", en: "Achievement · Excellence · Transparency · Client focus · Commitment" },

  // services
  "svc.kicker": { ar: "خدماتنا", en: "Services" },
  "svc.title": { ar: "حلول متكاملة لعلامة تجارية تُحلّق.", en: "End-to-end solutions for a brand that takes flight." },
  "svc.1.t": { ar: "الإدارة والاستشارات", en: "Management & Consulting" },
  "svc.1.b": { ar: "استشارات إدارية، أدلة إجرائية، استراتيجيات إعلامية وتسويقية، وتقارير رصد وتحليل تجربة العميل.", en: "Management consulting, procedural playbooks, media & marketing strategy, monitoring reports and CX analysis." },
  "svc.2.t": { ar: "التنظيم والفعاليات", en: "Events & Organization" },
  "svc.2.b": { ar: "تغطية إعلامية، توثيق المناسبات، تنظيم المعارض والمؤتمرات، وإدارة الحشود الكبرى.", en: "Media coverage, event documentation, exhibitions & conferences, and large-scale crowd management." },
  "svc.3.t": { ar: "وسائل التواصل الاجتماعي", en: "Social Media" },
  "svc.3.b": { ar: "حملات إعلانية، تأسيس وتطوير الهوية، إدارة الحسابات، وإنتاج محتوى إعلامي بجودة عالية.", en: "Advertising campaigns, brand identity build-out, account management, and premium content production." },
  "svc.4.t": { ar: "الإنتاج البصري", en: "Visual Production" },
  "svc.4.b": { ar: "أكثر من 100 فيديو تسويقي وتقارير مرئية — من كتابة السيناريو إلى المونتاج والمعالجة.", en: "100+ marketing films and visual reports — scriptwriting through edit and post." },

  // method
  "method.kicker": { ar: "منهجيتنا", en: "Methodology" },
  "method.title": { ar: "خمس ركائز. أثرٌ حقيقي.", en: "Five pillars. Real impact." },
  "method.1.t": { ar: "الاستماع والتحليل", en: "Listen & Analyze" },
  "method.1.b": { ar: "نفهم هوية العميل، جمهوره، وأهدافه.", en: "We understand identity, audience, and goals." },
  "method.2.t": { ar: "التخطيط الذكي", en: "Smart Planning" },
  "method.2.b": { ar: "خارطة إعلامية متوازنة بين الرؤية والإمكانات.", en: "A media map balancing vision and resources." },
  "method.3.t": { ar: "النقل المعرفي", en: "Knowledge Transfer" },
  "method.3.b": { ar: "نُشرك العميل لضمان استدامة الحضور.", en: "We involve clients for lasting presence." },
  "method.4.t": { ar: "التنفيذ الإبداعي", en: "Creative Execution" },
  "method.4.b": { ar: "محتوى يعكس القيم ويجذب الانتباه.", en: "Content that reflects values and captures attention." },
  "method.5.t": { ar: "المتابعة والتطوير", en: "Measure & Evolve" },
  "method.5.b": { ar: "نتابع الأداء ونطوّر بناءً على نتائج واقعية.", en: "We track performance and iterate on real data." },

  // works
  "works.kicker": { ar: "أبرز أعمالنا", en: "Selected Work" },
  "works.title": { ar: "إنتاجات ومشاريع تصنع الأثر.", en: "Productions and projects that make an impact." },
  "works.1.t": { ar: "التعاونية — فيلم تسويقي متكامل", en: "Tawuniya — end-to-end marketing film" },
  "works.1.b": { ar: "سيناريو، تصوير، مونتاج ومعالجة كاملة.", en: "Script, cinematography, edit, and full post." },
  "works.2.t": { ar: "خيوط التاريخ — سلسلة وثائقية", en: "Khoyoot Al-Tarekh — documentary series" },
  "works.2.b": { ar: "بحث تاريخي، إنتاج، وهوية بصرية كاملة.", en: "Historical research, production, and full brand identity." },
  "works.3.t": { ar: "المؤتمر الدولي للسلامة والصحة المهنية", en: "GOSH International Conference" },
  "works.3.b": { ar: "تغطية إعلامية كاملة لفعالية دولية كبرى.", en: "Full media coverage of a major international event." },
  "works.4.t": { ar: "بطولات ومناسبات كبرى", en: "Championships & major events" },
  "works.4.b": { ar: "برومو، تقارير، وتغطية شاملة لورش وفعاليات.", en: "Promos, reports, and full coverage of workshops and events." },

  // partners
  "partners.kicker": { ar: "شركاء النجاح", en: "Trusted by" },
  "partners.title": { ar: "شراكات مبنية على الثقة والأثر.", en: "Partnerships built on trust and impact." },

  // contact
  "contact.kicker": { ar: "تواصل معنا", en: "Contact" },
  "contact.title": { ar: "نحلّق معك بإبداعٍ يُحدث الأثر.", en: "Let's fly your brand higher — together." },
  "contact.sub": { ar: "أخبرنا عن مشروعك، وسنعود إليك خلال يوم عمل.", en: "Tell us about your project and we'll reply within one business day." },
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

  // works
  "works.case": { ar: "مشروع", en: "Case" },


  "footer.tagline": { ar: "من الخيال إلى الواقع… نحن جناحك.", en: "From imagination to reality — we are your wing." },
  "footer.rights": { ar: "© 2026 إيليت وينغ. جميع الحقوق محفوظة.", en: "© 2026 Elite Wing. All rights reserved." },
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
