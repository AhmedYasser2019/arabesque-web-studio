import { createContext, useContext, type ReactNode } from "react";

import { STATIC_CONTENT, type Content } from "@/lib/cms";
import { I18nProvider, type Lang } from "@/lib/i18n";

/**
 * Makes the page's content available to every section, whether it came from
 * the panel or from the copy baked into this repo. Wraps I18nProvider so the
 * CMS's button and placeholder labels reach `tr()` too, and there is still one
 * wrapper for a page to mount.
 */
const Ctx = createContext<Content>(STATIC_CONTENT);

export function ContentProvider({
  children,
  content = STATIC_CONTENT,
  lang,
}: {
  children: ReactNode;
  content?: Content;
  lang?: Lang;
}) {
  return (
    <Ctx.Provider value={content}>
      <I18nProvider initialLang={lang} labels={content.labels}>
        {children}
      </I18nProvider>
    </Ctx.Provider>
  );
}

export function useContent() {
  return useContext(Ctx);
}
