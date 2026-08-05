import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { cmsEnabled, loadContent, STATIC_CONTENT, type Content } from "@/lib/cms";
import { I18nProvider, type Lang } from "@/lib/i18n";

/**
 * Makes the page's content available to every section, whether it came from
 * the panel or from the copy baked into this repo. Wraps I18nProvider so the
 * CMS's button and placeholder labels reach `tr()` too, and there is still one
 * wrapper for a page to mount.
 */
const Ctx = createContext<Content>(STATIC_CONTENT);

/**
 * The pages ship as prerendered HTML, so their copy is whatever the panel held
 * at build time. Fetch once after mount so an edit in the panel is live on the
 * next page load instead of waiting for a rebuild and re-upload.
 *
 * loadContent() resolves to STATIC_CONTENT itself when the panel is slow or
 * down, and swapping that in would replace good build-time copy with the baked
 * fallback — so an identity check keeps what was rendered.
 */
function useLiveContent(initial: Content): Content {
  const [content, setContent] = useState(initial);

  useEffect(() => {
    if (!cmsEnabled) return;
    let alive = true;
    void loadContent().then((fresh) => {
      if (alive && fresh !== STATIC_CONTENT) setContent(fresh);
    });
    return () => {
      alive = false;
    };
  }, []);

  return content;
}

export function ContentProvider({
  children,
  content = STATIC_CONTENT,
  lang,
}: {
  children: ReactNode;
  content?: Content;
  lang?: Lang;
}) {
  const live = useLiveContent(content);

  return (
    <Ctx.Provider value={live}>
      <I18nProvider initialLang={lang} labels={live.labels}>
        {children}
      </I18nProvider>
    </Ctx.Provider>
  );
}

export function useContent() {
  return useContext(Ctx);
}
