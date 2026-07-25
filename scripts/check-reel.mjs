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

// keep in sync with REEL/CATS in src/components/Landing.tsx
const EXPECTED = [7, 4, 3, 2, 2];
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
  head(`${BASE}/media/hero.mp4`),
  head(`${BASE}/media/hero.jpg`),
  ...[1, 2, 3].map((n) => head(`${BASE}/media/events/up-${n}.jpg`)),
]);
await check(`all ${SLUGS.length * 3 + 5} media assets resolve (films via ${FILMS})`, () =>
  assert.deepEqual(missing, [], `missing: ${missing.join(", ")}`),
);

const browser = await chromium.launch();

for (const lang of ["en", "ar"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
  // 0. hero showreel autoplays muted, and opens the full film with sound
  const heroVid = await page.evaluate(() => {
    const v = document.querySelector("#top video");
    return v && { file: v.currentSrc.split("/").pop(), paused: v.paused, muted: v.muted };
  });
  await check(`${lang}: hero showreel autoplays muted`, () => {
    assert.ok(heroVid, "no hero video");
    assert.equal(heroVid.file, "hero.mp4");
    assert.equal(heroVid.paused, false, "hero video is paused");
    assert.equal(heroVid.muted, true, "hero video must stay muted to autoplay");
  });

  await page.locator("#top button[aria-label]").first().click();
  await page.waitForTimeout(1800);
  const heroModal = await page.evaluate(() => {
    const v = document.querySelector('[role="dialog"] video');
    return v && { file: v.currentSrc.split("/").pop(), muted: v.muted };
  });
  await check(`${lang}: hero play opens the full film with sound`, () => {
    assert.ok(heroModal, "hero modal did not open");
    assert.equal(heroModal.file, "elite-wing.mp4");
    assert.equal(heroModal.muted, false, "lightbox should not be muted");
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  const closed = (await page.locator('[role="dialog"]').count()) === 0;
  await check(`${lang}: Escape closes the lightbox`, () => assert.ok(closed));

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
  await page.waitForTimeout(2500);
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

  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nall reel checks passed");
process.exit(failures ? 1 : 0);
