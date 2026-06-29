# Guardianes de las Flores 2026 Event Page

## Goal

Create a public event archive at `/guardianes-de-las-flores-2026` that follows the established `/sant-jordi-2026` experience while adapting its content and imagery to the Nahiara y los Guardianes de las Flores event.

## Event Information

- Title: Nahiara y los Guardianes de las Flores
- Date: 19 May 2026
- Time: From 18:30
- Place: Parque El Canario, AA.VV. Vereda El Canario
- Location: Santa Lucia de Tirajana, Gran Canaria
- Organizers: Asociacion Nahiara with AA.VV. Vereda El Canario and the Ayuntamiento de Santa Lucia de Tirajana

## Page Structure

1. A dark botanical hero using the supplied poster as the main visual anchor.
2. Immediate event facts for date, location, and audience or purpose.
3. A concise Spanish or English introduction selected through the site's existing locale behavior.
4. An editorial event summary describing the collective pollinator mural, Guardianes card game, national-flower activity, and Guardian de las Flores diplomas.
5. A responsive gallery containing the fourteen supplied documentary photographs.
6. A restrained institutional close consistent with the existing event archive pages.

## Visual Direction

Reuse the rhythm and interaction model of `/sant-jordi-2026`, including its atmospheric hero, event facts, editorial continuation, and `EventGallery` lightbox. Adapt the palette toward the poster's garden colors while preserving the site's deep forest, warm mist, pollen gold, and coral identity. The poster must remain legible and uncropped enough to function as the event's primary artifact.

The supplied poster is separate from the fourteen gallery photographs. All fifteen supplied images will be copied into a dedicated public asset directory with stable web paths.

## Content And Localization

Visible narrative copy will support Spanish and English using the same locale branching pattern as `/sant-jordi-2026`. Spanish is the source language because the event poster and venue context are Spanish. English copy will be an accurate concise translation, not a separate interpretation.

## Metadata And Discovery

Add route metadata with a canonical URL and bilingual search description. Add the route to `app/sitemap.js`. Open Graph metadata will identify the event and use the poster where supported by the existing metadata setup.

## Accessibility And Responsive Behavior

- Use descriptive alt text for the poster and documentary images.
- Preserve keyboard access in links and the existing gallery lightbox.
- Maintain WCAG AA text contrast.
- Keep event facts readable on narrow mobile screens.
- Avoid text embedded over visually busy parts of the poster.
- Respect the gallery's existing loading and interaction behavior.

## Verification

- Add a route-level source test first to establish the expected page, asset set, metadata, and sitemap entry.
- Run the test before implementation and confirm it fails for the missing route.
- Implement the page and assets, then rerun the test.
- Run targeted ESLint on the new page, layout, and relevant test file.
- Run the production build.
- Inspect the page in a browser at desktop and mobile widths, including gallery interaction and image loading.

## Scope

This change creates one standalone event page and its assets. It does not redesign `/sant-jordi-2026`, alter global navigation, or add unrelated event infrastructure.
