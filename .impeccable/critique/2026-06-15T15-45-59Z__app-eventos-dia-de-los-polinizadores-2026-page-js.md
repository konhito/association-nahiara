---
target: /eventos/dia-de-los-polinizadores-2026
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-06-15T15-45-59Z
slug: app-eventos-dia-de-los-polinizadores-2026-page-js
---
Design Health Score: 29/40 (Good)

Anti-patterns verdict: The page does not read as low-effort AI output. It has a distinct dark botanical event identity, real event poster imagery, clear CTAs, localized content, and a working embedded film. However, it still carries some template tells: repeated uppercase section labels, several similar bordered panels, and duplicated date/location facts across hero and detail sections.

Priority issues:
P1: No visible language switcher on an international trilingual event page. The route renders one locale from cookie, but external Scientix visitors need a visible way to switch ES/EN/DE.
P1: Mobile first viewport is heavy. The title, subtitle, copy, two CTAs, and three large fact cards push the poster and event content far down.
P2: Accessible text extraction joins forced line breaks in headings, e.g. All PollinatorsDay 2026 and Draw the flowerand its pollinator. Visual line breaks need screen-reader-safe spacing or visually hidden separators.
P2: Repetition of event facts. Date/location/audience appear in hero cards and again in the detail column, increasing scanning work.
P3: Repeated tiny uppercase labels across sections are starting to feel like a pattern rather than a deliberate event identity.

What's working: strong poster integration, clear primary CTAs, direct Google Maps URL and structured geo data, good contrast in most key areas, and clean build/lint behavior.

Recommended next pass: add visible language switching, compress mobile hero facts into a tighter row or disclosure, fix accessible heading spacing, and reduce repeated labels.
