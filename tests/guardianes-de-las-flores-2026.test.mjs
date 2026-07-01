import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const pagePath = "app/eventos/guardianes-de-las-flores-2026/page.js";
const layoutPath = "app/eventos/guardianes-de-las-flores-2026/layout.js";

test("guardianes event route includes its content, metadata, sitemap, and assets", () => {
  assert.ok(existsSync(pagePath), `${pagePath} must exist`);
  assert.ok(existsSync(layoutPath), `${layoutPath} must exist`);

  const page = readFileSync(pagePath, "utf8");
  const layout = readFileSync(layoutPath, "utf8");
  const sitemap = readFileSync("app/sitemap.js", "utf8");
  const en = JSON.parse(readFileSync("messages/en.json", "utf8"));
  const es = JSON.parse(readFileSync("messages/es.json", "utf8"));

  assert.match(page, /guardianes2026\.hero\.subtitle/);
  assert.equal(es.guardianes2026.hero.subtitle, "Nahiara y los Guardianes de las Flores");
  assert.equal(en.guardianes2026.hero.subtitle, "Nahiara and the Guardians of the Flowers");
  assert.equal(es.guardianes2026.facts.date.primary, "19 de junio de 2026");
  assert.equal(en.guardianes2026.facts.date.primary, "19 June 2026");
  assert.match(page, /Parque El Canario/);
  assert.match(page, /const MEDIA_DIR = "\/guardianes-flores-2026"/);
  assert.match(page, /const ARTWORKS_DIR = `\$\{MEDIA_DIR\}\/artworks`/);
  assert.match(page, /const POSTER = `\$\{MEDIA_DIR\}\/poster\.jpeg`/);
  assert.match(page, /unoptimized/);
  assert.match(page, /Array\.from\(\{ length: 14 \}/);
  assert.match(page, /photo-\$\{String\(index \+ 1\)\.padStart\(2, "0"\)\}\.jpeg/);
  assert.equal(en.guardianes2026.artwork.label, "Artworks from 19 June");
  assert.equal(es.guardianes2026.artwork.label, "Dibujos del 19 de junio");
  assert.match(page, /ARTWORKS\.length/);
  assert.match(en.guardianes2026.artworks["1"].curatorial, /Kimberly dresses her bumblebee in deep blue/);
  assert.match(es.guardianes2026.artworks["35"].curatorial, /Naymar viste toda una lamina de polinizadores/);
  assert.match(page, /guardianes2026\.artworks\.\$\{artwork\.number\}\.curatorial/);
  assert.match(page, /Baskervville/);
  assert.match(page, /EventPhotoSection/);
  assert.match(page, /guardianes-art-showcase/);
  assert.equal(en.guardianes2026.photos.title, "Parque El Canario in bloom");
  assert.doesNotMatch(page, /absolute inset-x-0 top-0 h-2 bg-\[linear-gradient/);
  assert.doesNotMatch(page, /absolute inset-y-0 right-0 hidden w-\[38vw\] bg-\[radial-gradient/);
  assert.match(page, /bg-\[radial-gradient\(circle_at_top_left,rgba\(196,140,70,0\.16\),transparent_28%\),radial-gradient\(circle_at_80%_35%,rgba\(217,97,82,0\.12\),transparent_24%\),radial-gradient\(circle_at_bottom_left,rgba\(114,148,100,0\.16\),transparent_28%\)\]/);
  assert.match(page, /fill="#f5f1e8"/);
  assert.match(page, /rounded-2xl border border-\[#e8d3a3\]\/25 bg-\[#08251f\] p-2/);
  assert.match(page, /shadow-\[0_28px_70px_-35px_rgba\(0,0,0,0\.85\)\]/);
  assert.match(layout, /eventos\/guardianes-de-las-flores-2026/);
  assert.match(sitemap, /eventos\/guardianes-de-las-flores-2026/);

  const assets = [
    "poster.jpeg",
    ...Array.from({ length: 14 }, (_, index) =>
      `photo-${String(index + 1).padStart(2, "0")}.jpeg`
    ),
  ];

  for (const asset of assets) {
    const publicPath = `public/guardianes-flores-2026/${asset}`;
    assert.ok(existsSync(publicPath), `${publicPath} must exist`);
  }

  const artworkNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ];

  for (const number of artworkNumbers) {
    const publicPath = `public/guardianes-flores-2026/artworks/Obra ${number}.jpeg`;
    assert.ok(existsSync(publicPath), `${publicPath} must exist`);
  }
});
