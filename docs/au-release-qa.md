# AU Release A QA

Checked locally on 2026-08-16. No deployment or production-domain changes were made.

| Check | Result | Evidence |
| --- | --- | --- |
| English AU home at `/` | Pass | Browser heading and all required AU destination links present. |
| Korean AU translation at `/ko` | Pass | Browser reported `html[lang="ko-KR"]`; localized navigation and home labels rendered. |
| Desktop 1440px | Pass | Header, hero image, title, CTA and announcement strip were visible without overlap. |
| Mobile 390px | Pass | Logo, Book and Menu controls remained in one row; hero CTA and image did not overlap. |
| Mobile menu keyboard support | Pass | Opening focuses Close menu; Escape restores focus to Menu; Shift+Tab and Tab cycle inside the menu. |
| Reduced motion | Pass | With `prefers-reduced-motion: reduce`, the announcement track reports `animation-name: none`. |
| Browser console | Pass | No warnings or errors reported during AU home and `/ko` checks. |
| Public commerce/admin exposure | Pass | Route, shell and content contract tests found no Cart, Checkout, Admin, Digital, AI Beta or Wellness App controls. |

Ignored local screenshots and snapshots are stored under `output/playwright/au-qa/` for this worktree session.
