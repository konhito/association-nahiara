# Guardianes de las Flores 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, poster-led event archive at `/guardianes-de-las-flores-2026` with all supplied photographs, metadata, and sitemap discovery.

**Architecture:** Follow the existing `/sant-jordi-2026` route pattern: a client page owns locale-sensitive content and delegates the photo lightbox to the shared `EventGallery`; a route layout owns metadata. Store the poster and documentary photographs in a dedicated public directory and validate the route contract with a Node source test.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS, Lucide React, Node built-in test runner.

---

### Task 1: Establish the route contract

**Files:**
- Create: `tests/guardianes-de-las-flores-2026.test.mjs`

- [ ] **Step 1: Write the failing test**

Create a Node test that reads the planned page, layout, and sitemap files; asserts the route title, date, venue, poster path, fourteen gallery filenames, canonical path, and sitemap path; and checks that all fifteen public assets exist.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/guardianes-de-las-flores-2026.test.mjs`

Expected: FAIL because `app/guardianes-de-las-flores-2026/page.js` does not exist.

### Task 2: Add event assets

**Files:**
- Create: `public/guardianes-flores-2026/poster.jpeg`
- Create: `public/guardianes-flores-2026/photo-01.jpeg` through `photo-14.jpeg`

- [ ] **Step 1: Copy the supplied poster**

Copy `C:/Users/konhi/Downloads/WhatsApp Image 2026-06-25 at 11.54.08 PM.jpeg` to `public/guardianes-flores-2026/poster.jpeg`.

- [ ] **Step 2: Copy the documentary photographs**

Copy the fourteen JPEG files from `C:/Users/konhi/Downloads/WhatsApp Unknown 2026-06-29 at 9.30.07 PM/` in filename order to `photo-01.jpeg` through `photo-14.jpeg`.

### Task 3: Implement the event route

**Files:**
- Create: `app/guardianes-de-las-flores-2026/page.js`
- Create: `app/guardianes-de-las-flores-2026/layout.js`
- Modify: `app/sitemap.js`

- [ ] **Step 1: Build the client page**

Implement the dark botanical hero, poster visual, event facts, Spanish/English editorial summary, activities section, and shared `EventGallery` using the fourteen stable photo paths.

- [ ] **Step 2: Add route metadata**

Define the bilingual description, canonical `/guardianes-de-las-flores-2026`, Open Graph URL, and poster image in `layout.js`.

- [ ] **Step 3: Add sitemap discovery**

Add `{ path: '/guardianes-de-las-flores-2026', freq: 'monthly', priority: 0.8 }` to the static routes.

- [ ] **Step 4: Run the route test to verify it passes**

Run: `node --test tests/guardianes-de-las-flores-2026.test.mjs`

Expected: PASS with one passing test.

### Task 4: Verify quality and presentation

**Files:**
- Verify: `app/guardianes-de-las-flores-2026/page.js`
- Verify: `app/guardianes-de-las-flores-2026/layout.js`
- Verify: `app/sitemap.js`

- [ ] **Step 1: Run targeted lint**

Run: `npx eslint app/guardianes-de-las-flores-2026/page.js app/guardianes-de-las-flores-2026/layout.js app/sitemap.js tests/guardianes-de-las-flores-2026.test.mjs`

Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run: `npm.cmd run build`

Expected: exit code 0 and the new route listed in the build output.

- [ ] **Step 3: Inspect desktop and mobile rendering**

Start the development server, open `/guardianes-de-las-flores-2026`, verify the poster and gallery images load, check 1440x900 and 390x844 layouts, and open a gallery image to verify the lightbox.

- [ ] **Step 4: Review the final diff**

Run: `git status --short` and `git diff --check`.

Expected: only the approved event page, assets, test, sitemap, and plan are changed; no whitespace errors.
