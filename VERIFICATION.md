# Verification

- TypeScript: `npm run typecheck` passed.
- Factual behavior: four `npm test` checks passed (India-time wedding instant, countdown boundaries, updated full Maps query, no inferred Janeu date).
- Browser: inspected 360 × 800, 390 × 844, 430 × 932, and 1440 × 1000 layouts.
- No horizontal overflow found in the inspected mobile or desktop layouts; no broken artwork in the final desktop inspection.
- Palace opening completes and reveals the couple. Escape skips the opening, restores scrolling, and focuses the couple heading.
- Chapter links navigate correctly. The motion toggle pauses decorative animation.
- Copy-link action produces the success message. Native sharing is implemented through the browser share API; no message was sent to anyone during testing.
- No browser console errors in the final review.
- Calendar contains the configured 2026-12-04T13:00:00Z wedding instant and supplied postal address. No end time was invented.

The preview is local. Public WhatsApp previews require a deployed HTTPS origin and a build with `NEXT_PUBLIC_SITE_URL` set to that origin. No public deployment was performed.

The production build uses webpack for predictable local Windows builds. Run builds separately from the development server. The execution sandbox required explicit project write permission for Next.js nested output folders.
