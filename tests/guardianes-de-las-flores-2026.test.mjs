import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const pagePath = "app/guardianes-de-las-flores-2026/page.js";
const layoutPath = "app/guardianes-de-las-flores-2026/layout.js";

test("guardianes event route includes its content, metadata, sitemap, and assets", () => {
  assert.ok(existsSync(pagePath), `${pagePath} must exist`);
  assert.ok(existsSync(layoutPath), `${layoutPath} must exist`);

  const page = readFileSync(pagePath, "utf8");
  const layout = readFileSync(layoutPath, "utf8");
  const sitemap = readFileSync("app/sitemap.js", "utf8");

  assert.match(page, /Nahiara y los Guardianes de las Flores/);
  assert.match(page, /19 de mayo de 2026/);
  assert.match(page, /Parque El Canario/);
  assert.match(page, /const MEDIA_DIR = "\/guardianes-flores-2026"/);
  assert.match(page, /const POSTER = `\$\{MEDIA_DIR\}\/poster\.jpeg`/);
  assert.match(page, /unoptimized/);
  assert.match(page, /Array\.from\(\{ length: 14 \}/);
  assert.match(page, /photo-\$\{String\(index \+ 1\)\.padStart\(2, "0"\)\}\.jpeg/);
  assert.doesNotMatch(page, /absolute inset-x-0 top-0 h-2 bg-\[linear-gradient/);
  assert.doesNotMatch(page, /absolute inset-y-0 right-0 hidden w-\[38vw\] bg-\[radial-gradient/);
  assert.match(page, /bg-\[radial-gradient\(circle_at_top_left,rgba\(196,140,70,0\.18\),transparent_30%\),radial-gradient\(circle_at_78%_26%,rgba\(214,97,82,0\.18\),transparent_24%\),radial-gradient\(circle_at_bottom_left,rgba\(114,148,100,0\.18\),transparent_30%\)\]/);
  assert.match(page, /fill="#f5f1e8"/);
  assert.match(page, /rounded-\[2rem\] border border-white\/10 bg-\[#123f35\]\/88 p-4/);
  assert.match(page, /shadow-\[0_45px_110px_-45px_rgba\(0,0,0,0\.9\)\]/);
  assert.match(layout, /guardianes-de-las-flores-2026/);
  assert.match(sitemap, /guardianes-de-las-flores-2026/);

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
});
