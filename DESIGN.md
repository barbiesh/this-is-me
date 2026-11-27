# Barbie Shah — Design

## Brand
Personal portfolio of Barbie Shah, an IT graduate from Pokhara (BIT Hons, Informatics College Pokhara) moving into project coordination, with UI/UX and development experience. Audience: recruiters, hiring managers, collaborators. Feel: soft, editorial, elegant, playful, confident. It reads like a fashion magazine feature about a tech person. Must never feel: childish, sugary all-pink, a generic dev template, a resume pasted into cards.

## Logo
No logo supplied. Wordmark: "Barbie Shah" set in the heading serif, italic "Shah". Monogram "B·S" for the nav and favicon.

## Color
| Token | Hex | Use |
|---|---|---|
| ivory | #FBF6F1 | page background |
| cream | #FFFDF9 | raised surfaces, light text on charcoal |
| baby | #F7DCE3 | baby pink: big soft fields, hero wash, highlight marks |
| blush | #EFC1CD | blush: arch frames, hover fills, dividers on pink |
| rose | #A8445F | soft rose, deepened for contrast: links, accent text, main action (5.9:1 on ivory) |
| ink | #2B2427 | charcoal: body text and the dark contact section |
| muted | #6E6064 | secondary text (5.8:1 on ivory) |
| line | #E8DCD9 | hairlines |
Pink is a field colour, never text on pink below rose. Rule of thumb: ~60% ivory/cream, 25% baby/blush, 10% ink, 5% rose.
Dark mode: no (the contact section is the one dark scene).

## Typography
Heading: Bodoni Moda (400, 500, italic 400), tracking -0.02em, used huge. Body/UI: Manrope (400, 500, 600), 17/28.
Scale desktop: display clamp up to 200 / h1 96 / h2 64 / h3 32 / body 17 / small 14 / label 12 uppercase +0.18em.
Mobile: display 64–72 / h1 52 / h2 40 / h3 26 / body 16.

## Layout
12-col, max 1320, 24 gutter, side padding 20 (mobile) → 48 (desktop). Section padding 120–180 desktop, 88 mobile. Asymmetric: text blocks start on col 2 or col 7, images bleed or offset. Left-aligned copy. Breakpoints 390 / 768 / 1024 / 1440.

## Shape and depth
Arches (top radius 999px) for photo frames — the signature. Pills (999px) for buttons and chips. Everything else square with hairline borders. No drop shadows; depth comes from overlap and a subtle paper grain texture (SVG noise, 4% opacity).

## Imagery
Real photos only: IMG_8603 (mirror selfie, pink room) is the hero; IMG_6991 (playful close-up) in About, tightly cropped. Images reveal with a clip-path wipe upward, scale 1.12 → 1. Projects get typographic "covers" (no screenshots exist) — each its own colour and mark.

## Motion
GSAP + ScrollTrigger + Lenis smooth scroll. Hero: letters of the name rise in a stagger (0.9s, expo.out), photo arch wipes up. Section titles split by line and reveal on enter. Parallax on hero photo and floating ornaments (desktop only). Journey: a rose line draws down the timeline as you scroll. Projects: horizontal pinned scroll on desktop, vertical stack on mobile. Hover 200–300ms. Custom cursor (small rose dot that grows into a "view" disc over interactive items), desktop pointer only. `prefers-reduced-motion`: no Lenis, no parallax, no pinning, content shown in final state.

## Components
Buttons: pill, ink outline → fills from bottom with rose on hover, text to cream; focus ring 2px rose offset 3px. Link: underline that draws in. Nav: fixed, floats as a cream pill on scroll, section indicator dot slides to the active link; mobile full-screen overlay menu with big serif links. Chips: hairline pill. Footer: inside the dark contact scene.

## Pages
One page `/`:
1. Home — name huge, arched mirror portrait, intro line, tagline, scroll cue.
2. About — personal note in big serif with pull-quote, small cropped photo, quick facts.
3. Journey — vertical timeline with drawing line: degree, internship, two certificates.
4. Skills — "the toolkit": soft skills as a large marquee of serif words, technical skills as an editorial index (category → items).
5. Projects — three typographic covers, each with its own palette, description, stack.
6. Experience — magazine spread for the Himalaya Expeditions internship + certifications.
7. Beyond Work — placeholder spread clearly marked for her to fill (hobbies not in CV).
8. Contact — dark charcoal scene, giant "Say hello" email link, phone, LinkedIn, Pokhara.

## Signature move
**"Mirror, mirror."** Taken from her mirror selfie: every portrait sits in an arched mirror frame, and the hero name has a live reflection — a faint, vertically flipped copy beneath it that blurs and drifts away as you scroll, like breath fogging a mirror. A running folio ("No. 03 — Journey") in the margin acts as the page's progress indicator, like page numbers in a magazine.

## Voice
First person, warm, plain, confident. Short sentences. No filler (elevate, seamless, passionate, etc.). English.

## Do / Don't
Do: oversized serif, generous space, arches, hairlines, one rose accent. Don't: progress bars, icon-card grids, heavy shadows, gradients everywhere, all-pink pages, invented facts.

## Filled by Selly
All values above were chosen by Selly from the client's creative brief (no DESIGN.md supplied): palette hexes, fonts, scale, grid, motion values, signature move.
