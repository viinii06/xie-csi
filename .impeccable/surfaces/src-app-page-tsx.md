---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface: Homepage (/)

Mode: Persuade. Build path: code-led (no image generation available).
Audience: XIE students on phones, plus faculty and sponsors checking credibility. Job: understand what XIE-CSI does and find the next event within two screens.
Proof: real upcoming event data (DSA Workshop), verified 2026–27 committee. RepoForge facts are limited to the name and year. Photos are temporary placeholders.
Constraints: logos not yet supplied (header shows a text lockup until the files exist), no registration URL, Member Login is "Coming soon".
Open: official logo files and accent colour, registration URL, contact email and socials, real RepoForge photos and facts.

## Direction contract

THESIS: The homepage works like a printed campus programme. Oversized grotesk headlines, ruled timetable rows, and big photography tell a student what is on and when. It refuses the SaaS hero with centred copy, gradient blobs, and three equal feature cards.

OWN-WORLD: Warm off-white paper (#F3F0E8) with near-black ink (#141311) and one CSI blue accent, used only for actions and live states. Archivo is the single family. Its width axis is the system: normal width for the chapter, expanded and uppercase for RepoForge. Hairline ink rules at 1px separate labelled cells. Photos are square-cornered. No cards with shadows.

STORY: A student sees "Build together at XIE.", then the next event as a ruled row (title, dates, time, venue, lead, capacity), then RepoForge as proof that the chapter ships real events, then what the chapter does, who runs it, and how to reach it.

FIRST VIEWPORT: Desktop: a 12-column grid. The headline spans columns 1–6 at about 6rem, with the supporting line and Explore Events button (ink fill) plus a text link below it. A wide photo fills columns 7–12 to the right edge. Mobile: headline, then actions, then a 16:10 photo. The event row's title starts by about 1.6 screens.

FORM: Brief-pinned editorial programme (Figma Config visual, ACM UCSD structure). seed: none (unavailable). The direction was pinned by the brief, so no roll ran.
Signature interaction: the RepoForge lead photo opens from an inset mask to full bleed as it scrolls in, and the supporting images follow in sequence.
Motion grammar: word-staggered headline rise (60ms per word, 700ms, ease-out-expo) and a hero photo clip reveal. Everything is visible by default and under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
