---
target: XIE-CSI website
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/viigneshpardeshii55/Developer/Xie-Csi Website/src/app/page.tsx"
target_fingerprint: "sha256:a20a04c9e8b73a573047ada437a46ee0046e6ca5804709135920a37593e88403"
target_path: /Users/viigneshpardeshii55/Developer/Xie-Csi Website/src/app/page.tsx
timestamp: 2026-11-19T14-33-35Z
slug: src-app-page-tsx
closed: true
---
# Critique: XIE-CSI homepage + member portal (2026-11-19)
Method: dual-agent. Score 24/32 (7 and 10 n/a). Detector CLI: 0 findings; overlay: 2 stragglers, placeholder contrast 4.33:1, cream-palette (false positive).
## Priority issues
1. [P1] Hero: no registration drive, weak identity on phones (lockup name hidden <640px), vague "Chapter Highlights", "· IPL Lab" orphan wrap, stock photo undisclosed in place.
2. [P1] Events: past events stay "Upcoming"; .ics TZID without VTIMEZONE; register label wraps at 1440.
3. [P1] Preview login copy contradicts real (invite-list disclosure); no expired-link state; notices not styled by severity.
4. [P2] RepoForge grid hard-coded to 1+2 photos; greyscale on touch; h2 "RepoForge2026".
5. [P2] Targets <44px (Maps, CSI link, Sign out, preview toggles); no portal skip link; menu lacks dialog semantics; no office-bearer subheads; poster carousel flush edge; blur in headline rise; uneven section spacing.
