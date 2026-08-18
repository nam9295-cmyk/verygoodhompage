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

## AU public category restructure — 2026-08-18

No deployment, push, merge, booking-app, or Appwrite changes were made.

| Check | Result | Evidence |
| --- | --- | --- |
| Final Header taxonomy | Pass | Desktop and mobile navigation showed Cakes, Something Fresh, Chocolate, Cacao Tea, Choco in Life, Korea and Book a Cake; About remained in the Footer. |
| Booking boundaries | Pass | Cakes, Something Fresh and Book a Cake all resolved to `https://au.verygood-chocolate.com/cakes`; no public classes link appeared. |
| Home order at 1440px | Pass | Hero → Verygood Chocolate Cakes → Something Fresh → three internal collections → Daegu/Sydney story rendered in order. |
| Home at 390px | Pass | Header controls remained on one row, booking sections and product labels stacked cleanly, and no horizontal clipping was visible. |
| Mobile menu keyboard flow | Pass | Menu opened with the final five destinations; Escape closed it and restored focus to Menu. |
| Chocolate catalogue at 1440px | Pass | Only Almond Chocolate, Strawberry Bonbon, Eiffel Chocolate and text-only S'mores Stick appeared; Ruby Berry and Matcha Berry were absent. |
| Chocolate catalogue at 390px | Pass | Product imagery filled the available width; the image-free S'mores entry rendered as an honest text-only entry with no blank or synthetic product frame. |
| Browser console | Pass | No error-level console messages during the local category QA. |

Ignored local screenshots for this check are stored under `output/playwright/` in this worktree session.
