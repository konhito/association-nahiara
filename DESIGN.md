# DESIGN.md

## Overview

This project uses a brand-first visual register for public-facing pages. The site should feel international, botanical, and ceremonial rather than corporate, brochure-like, or generic "eco NGO."

The design system should preserve institutional credibility while keeping warmth, cultural texture, and clear public readability.

## Core Palette

- `#072c26` deep forest hero ground
- `#f5f1e8` warm mist page background
- `#d6b56d` pollen gold highlight
- `#d66152` petal coral accent
- `#13352d` dark botanical text
- `#355148` body copy on light surfaces

Use color with restraint below the fold. The hero can be more atmospheric and dramatic; lower sections should become lighter, calmer, and easier to scan.

## Typography

- Display serif: `Baskervville`
- UI/body sans: existing project sans stack

Rules:
- Hero headlines can be ceremonial and large, with tight but readable tracking.
- Section copy below the hero should stay cleaner and more editorial.
- Avoid generic all-caps eyebrow overload.
- Avoid gradient text.

## Reusable Event Page Format

This is the preferred format for high-priority public event pages, especially pages intended for institutional sharing, media links, or partner calendars.

### Structure

1. Dark atmospheric hero
2. Immediate event facts inside the hero
3. Strong visual anchor using flower + pollinator or event art
4. Lighter second section with poster/artwork and a short narrative description
5. Bilingual ES/EN body content below, readable and uncluttered
6. Simple organiser/contact footer, not another heavy card block

### Hero Rules

- Keep the current `/eventos/dia-de-los-polinizadores-2026` hero as the reference pattern.
- Hero should carry the page identity.
- The date, place, audience, and canonical-share usefulness should be obvious quickly.
- Decorative atmosphere is welcome in the hero, but content clarity wins over spectacle.

### Below-the-Fold Rules

- Do not turn the lower half into a dashboard or card grid.
- Prefer looser editorial flow over repeated containers.
- Use borders, spacing, and typography before introducing more panels.
- Keep the poster/art section grounded and visual, but not boxed into a rigid promo layout.
- Bilingual sections should feel parallel and balanced, not like duplicated admin blocks.

### Anti-Patterns

- Generic conference/event template layouts
- Beige editorial sameness with weak hierarchy
- Repeated rounded cards for every information block
- Product-style metrics, dashboard framing, or UI-box overload
- Municipal bulletin / school notice styling

## Current Reference Implementation

Use this route as the working reference for future pages that need the same tone and structure:

- `/eventos/dia-de-los-polinizadores-2026`

When reusing this format, preserve the overall rhythm:
- dramatic hero
- softer editorial continuation
- bilingual readability
- simple institutional close

Do not copy it mechanically. Reuse the structure and tone, then adapt the imagery, accents, and copy weight to the new event.
