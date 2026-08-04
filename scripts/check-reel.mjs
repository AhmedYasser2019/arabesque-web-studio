/**
 * Smoke check for the work reel (#gallery) against a running dev/preview server.
 *   bun run dev            # in another shell
 *   bun run check:reel     # defaults to http://localhost:8081
 *
 * Covers the parts that break silently: every media asset resolving, each
 * category rendering its cards, the hover loop actually playing, and the
 * arrow scroll going the right way in RTL (where the scroll axis mirrors).
 */
import { chromium } from "playwright";
import assert from "node:assert";

const BASE = process.env.BASE_URL ?? "http://localhost:8081";
// Full films may live off-origin (see VITE_MEDIA_URL). Posters and loops never do.
const FILMS = (process.env.VITE_MEDIA_URL || `${BASE}/media`).replace(/\/+$/, "");

/* The counts the page is expected to render. These are the baked-in reel in
 * src/lib/cms.ts, which is also what the CMS seeder loads — so this file checks
 * out against either content source. If the client adds or removes films in the
 * panel and you are running with VITE_CMS_URL set, these move. */
// keep in sync with REEL/CATS in src/lib/cms.ts
const EXPECTED = [7, 4, 3, 2, 2];
const PARTNERS = [
  "tawuniya",
  "stc",
  "saudia",
  "nupco",
  "sirc",
  "meena",
  "qfmc",
  "chefz",
  "r7",
  "waterburger",
  "khoyoot",
];
const SLUGS = [
  "tawuniya",
  "alrajhi",
  "riyad-bank",
  "anb",
  "mobily",
  "stc",
  "real-estate-registry",
  "gosh7",
  "workshop-mena",
  "r7",
  "padel",
  "khoyoot-altarekh",
  "majlis-turathi",
  "amanat-riyadh",
  "first-final",
  "promo2",
  "e-w",
  "elite-wing",
];

let failures = 0;
const check = async (name, fn) => {
  try {
    await fn();
    console.log(`  ok  ${name}`);
  } catch (e) {
    failures++;
    console.log(`FAIL  ${name}: ${e.message}`);
  }
};

// 1. every poster, hover loop and full film resolves
const missing = [];
const head = async (url) => {
  try {
    const r = await fetch(url, { method: "HEAD" });
    if (!r.ok) missing.push(`${url} -> ${r.status}`);
  } catch (e) {
    missing.push(`${url} -> ${e.message}`);
  }
};
await Promise.all([
  ...SLUGS.flatMap((slug) => [
    head(`${BASE}/media/${slug}.jpg`),
    head(`${BASE}/media/${slug}.loop.mp4`),
    head(`${FILMS}/${slug}.mp4`),
  ]),
  ...[1, 2, 3].map((n) => head(`${BASE}/media/hero/${n}.jpg`)),
  ...[1, 2, 3, 4].map((n) => head(`${BASE}/media/bg/${n}.jpg`)),
  ...PARTNERS.map((p) => head(`${BASE}/media/partners/${p}.png`)),
]);
await check(
  `all ${SLUGS.length * 3 + 6 + PARTNERS.length} media assets resolve (films via ${FILMS})`,
  () => assert.deepEqual(missing, [], `missing: ${missing.join(", ")}`),
);

const browser = await chromium.launch();

for (const lang of ["en", "ar"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
  // 0a. hero renders all three backdrop slides, exactly one visible
  const shown = () =>
    page.evaluate(() =>
      [...document.querySelectorAll("#top img[aria-hidden]")]
        .filter((i) => i.src.includes("/media/hero/"))
        .map((i) => ({ file: i.src.split("/").pop(), on: getComputedStyle(i).opacity === "1" })),
    );
  const slides = await shown();
  // Deliberately not asserting *which* slide is up: auto-advance runs on a
  // timer from load, so a slow page can legitimately be past the first one.
  await check(`${lang}: hero has 3 backdrop slides, one visible`, () => {
    assert.equal(slides.length, 3, `got ${slides.length} slides`);
    assert.equal(slides.filter((s) => s.on).length, 1, "exactly one slide should be visible");
  });

  // 0b. the dots switch slides
  const dots = page.locator("#top button[aria-current]");
  await check(`${lang}: hero has one dot per slide`, async () =>
    assert.equal(await dots.count(), 3),
  );
  await dots.nth(2).click();
  await page.waitForTimeout(1600);
  const after = await shown();
  await check(`${lang}: clicking a dot switches the slide`, () => {
    assert.equal(after[2].on, true, "third slide should be visible after clicking dot 3");
    assert.equal(after[0].on, false, "first slide should have faded out");
  });

  // 0c. auto-advance moves on by itself
  const before = (await shown()).findIndex((s) => s.on);
  await page.waitForTimeout(7000);
  const advanced = (await shown()).findIndex((s) => s.on);
  await check(`${lang}: hero auto-advances`, () =>
    assert.notEqual(advanced, before, `still on slide ${before} after 7s`),
  );

  // 0d. partner logos all render. They are lazy-loaded, so scroll them into
  // view and wait for the loads to actually settle — a fixed sleep is flaky
  // against a remote origin. `complete` also goes true on error, so the
  // naturalWidth assertion below is what proves they decoded.
  await page.locator("#partners").scrollIntoViewIfNeeded();
  await page
    .waitForFunction(
      () =>
        [...document.querySelectorAll('#partners img[src*="/partners/"]')].every((i) => i.complete),
      null,
      { timeout: 20000 },
    )
    .catch(() => {});
  const logos = await page.evaluate(() =>
    [...document.querySelectorAll('#partners img[src*="/partners/"]')].map((i) => ({
      src: i.getAttribute("src"),
      ok: i.complete && i.naturalWidth > 0,
    })),
  );
  await check(`${lang}: all ${PARTNERS.length} partner logos render`, () => {
    assert.equal(logos.length, PARTNERS.length, `got ${logos.length} logos`);
    const broken = logos.filter((l) => !l.ok).map((l) => l.src);
    assert.deepEqual(broken, [], `broken: ${broken.join(", ")}`);
  });

  const sec = page.locator("#gallery");
  await sec.scrollIntoViewIfNeeded();
  const rail = sec.locator("div.snap-x");
  const cards = rail.locator("> button");
  const tabs = sec.locator("button[aria-pressed]");
  const pos = () => rail.evaluate((el) => el.scrollLeft);

  // 2. each category renders its cards and starts the rail at position 0
  for (let i = 0; i < EXPECTED.length; i++) {
    await tabs.nth(i).click();
    await page.waitForTimeout(700);
    const [n, left] = [await cards.count(), await pos()];
    await check(`${lang}: category ${i + 1} renders ${EXPECTED[i]} cards, rail reset`, () => {
      assert.equal(n, EXPECTED[i], `got ${n} cards`);
      assert.ok(Math.abs(left) < 5, `rail at ${left}, expected 0`);
    });
  }

  await tabs.nth(0).click();
  await page.waitForTimeout(700);

  // 3. no video mounted until hover, then the loop plays
  const atRest = await sec.locator("video").count();
  await check(`${lang}: no preview video mounted at rest`, () =>
    assert.equal(atRest, 0, `${atRest} video(s) mounted before hover`),
  );

  await cards.nth(1).hover();
  // Wait for playback to actually start rather than guessing at a duration —
  // fetching the clip from a remote origin can take well over a second.
  await page
    .waitForFunction(
      () => {
        const v = document.querySelector("#gallery video");
        return v && !v.paused && v.currentTime > 0;
      },
      null,
      { timeout: 20000 },
    )
    .catch(() => {});
  const loop = await page.evaluate(() => {
    const v = document.querySelector("#gallery video");
    return v && { file: v.currentSrc.split("/").pop(), t: v.currentTime, paused: v.paused };
  });
  await check(`${lang}: hover plays the preview loop`, () => {
    assert.ok(loop, "no video mounted on hover");
    assert.match(loop.file, /\.loop\.mp4$/);
    assert.equal(loop.paused, false, "loop is paused");
    assert.ok(loop.t > 0, "loop not advancing");
  });

  // 4. arrows scroll toward the later cards; RTL mirrors the axis
  const [prev, next] = await sec.locator("button[aria-label]").all();
  const at0 = await pos();
  await next.click();
  await page.waitForTimeout(900);
  const moved = (await pos()) - at0;
  await check(`${lang}: next scrolls ${lang === "ar" ? "negative (RTL)" : "positive"}`, () => {
    assert.equal(Math.sign(moved), lang === "ar" ? -1 : 1, `moved ${moved}px`);
    assert.ok(Math.abs(moved) > 100, `moved only ${moved}px`);
  });
  await prev.click();
  await page.waitForTimeout(900);
  const back = await pos();
  await check(`${lang}: prev returns to start`, () =>
    assert.ok(Math.abs(back - at0) < 5, `at ${back}, expected ${at0}`),
  );

  // 5. lightbox plays the full film and fits the viewport (portrait films included)
  await cards.nth(0).click();
  await page.waitForTimeout(2000);
  const full = await page.evaluate(() => {
    const v = document.querySelector('[role="dialog"] video');
    return v && { file: v.currentSrc.split("/").pop(), h: v.getBoundingClientRect().height };
  });
  await check(`${lang}: lightbox plays full mp4 within the viewport`, () => {
    assert.ok(full, "no video in dialog");
    assert.doesNotMatch(full.file, /\.loop\.mp4$/, "lightbox is showing the preview loop");
    assert.ok(full.h > 0 && full.h <= 810, `video ${full.h}px tall, overflows 900px viewport`);
  });

  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  const closed = (await page.locator('[role="dialog"]').count()) === 0;
  await check(`${lang}: Escape closes the lightbox`, () => assert.ok(closed, "dialog still open"));

  await page.close();
}

// 6. both themes actually resolve. The page is written dark-first and the light
// theme works by re-pointing --color-white at the identity navy, so the thing
// that breaks silently is body copy staying white on a white page.
for (const theme of ["dark", "light"]) {
  const ctx = await browser.newContext();
  await ctx.addInitScript((t) => {
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* ignore */
    }
  }, theme);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/ar`, { waitUntil: "domcontentloaded" });

  const seen = await page.evaluate(() => {
    const lum = (el, prop) => {
      const m = getComputedStyle(el)
        [prop].match(/[\d.]+/g)
        .map(Number);
      return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
    };
    return {
      applied: document.documentElement.dataset.theme,
      page: lum(document.body, "backgroundColor"),
      // a heading that relies on text-white, i.e. the re-pointed variable
      heading: lum(document.querySelector("#about h2"), "color"),
      // the contact card opts back out via on-brand and must stay truly white
      onBrand: getComputedStyle(document.querySelector("#contact h2")).color,
    };
  });

  await check(`${theme}: theme applied and copy contrasts with the page`, () => {
    assert.equal(seen.applied, theme);
    if (theme === "light") assert.ok(seen.page > 0.8, `page luminance ${seen.page}`);
    else assert.ok(seen.page < 0.2, `page luminance ${seen.page}`);
    assert.ok(
      Math.abs(seen.page - seen.heading) > 0.4,
      `heading (${seen.heading.toFixed(2)}) too close to page (${seen.page.toFixed(2)})`,
    );
  });
  await check(`${theme}: on-brand keeps real white on the lavender card`, () =>
    assert.match(seen.onBrand, /^rgb\(255,\s*255,\s*255\)$/),
  );
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nall reel checks passed");
process.exit(failures ? 1 : 0);
