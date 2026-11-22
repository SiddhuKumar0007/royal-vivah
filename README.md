# The Royal Vivah

A complete Next.js, React and TypeScript wedding invitation for Saurabh Kumar Singh and Deepanjali Singh. Custom SVG architecture, original AI-generated symbolic mandap artwork, locally bundled fonts, Tailwind CSS, CSS 3D doors, and GSAP ScrollTrigger.

## Run locally

Requires Node.js 22.18+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:4173. Production: `npm run build`; the `out/` directory is a complete static export. To serve a production export, use any static HTTP server pointed at `out/`. Because this project uses static export, `next start` is not the production serving route.

## Edit the invitation

`lib/wedding.ts` is the source of truth for names, family details, ceremony dates, the wedding instant, and the updated village address. The wedding is at **2026-12-04 18:30 Asia/Kolkata**, encoded with its explicit +05:30 offset. No date has been assigned to Janeu.

All displayed date fragments are derived from the configured wedding instant. Run `npm run assets` to regenerate the calendar file, Open Graph image and touch icon after editing details. No supplied reference images or licensed soundtrack were available. There is no audio control.

## Deploying later

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin **before building** so that Open Graph image URLs resolve publicly. Then build and host `out/`. Sharing always uses the actual current page URL; localhost previews are only reachable from this computer. The Maps link searches the complete supplied village/postal address and does not claim a verified building or GPS pin.

## Accessibility and behavior

- Keyboard-operable entrance, focus containment, Escape to skip, and a visible skip-animation control.
- Reduced motion bypasses the opening sequence; the motion button pauses decorative movement.
- Text is rendered in full Devanagari words rather than split characters.
- Local WOFF2 fonts; no external font requests. Core text remains usable without JavaScript.
- Decorative effects and countdown intervals pause when the tab is hidden.
- Countdown becomes a celebratory message at the wedding instant.
- Native sharing falls back to copying the actual URL, then to a selectable URL if clipboard permission is unavailable.
- Static calendar download and encoded Google Maps address search.

## Assets

`public/art/mandap.webp` and its mobile variant are original symbolic artwork generated with the built-in Imagegen tool. They are not a photograph of the actual venue. The exact prompt is in `ASSET-PROMPT.md`. Architecture, ceremonial illustrations and ornaments are original project-local SVG/CSS. Fontsource packages bundle Tiro Devanagari Hindi and Cormorant Garamond under their included open-source font licenses. The source reference cards were not present in the attachment.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

The tests cover the India-time instant, countdown boundaries, complete Maps query and absence of an inferred Janeu date.
