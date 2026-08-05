// Canonical/og URLs must be absolute — relative ones break social scrapers,
// and Google prefers absolute for canonical. One place so the four route heads
// and the sitemap cannot drift apart.
export const SITE_URL = "https://elitewing.com.sa";

// The host 301s /ar -> /ar/, so every self-referencing URL uses the 200 form.
export const abs = (path: string) => `${SITE_URL}${path}`;

export const OG_IMAGE = abs("/media/elite-wing.jpg");
