# Barbie Shah portfolio: hand-off

- Preview: private artifact "Barbie Shah" (claude.ai), a standalone build of the same site
- Code: Next.js 16 + Tailwind 4 + GSAP 3.13 (ScrollTrigger, SplitText) + Lenis. Static export (`npm run build` → `out/`)
- Database / Supabase: none (contact is email, phone and LinkedIn links)
- Env vars: none
- Signature move: "Mirror, mirror". Portraits sit in arched mirror frames, the hero name has a reflection that fogs away on scroll, and a running magazine folio in the margin shows progress.

## Edit content
Everything is in `content/site.ts`: copy, facts, links, Beyond Work cards.
- GitHub / Instagram: set `person.github` / `person.instagram`, and they appear in Contact.
- CV download: put the PDF at `public/barbie-shah-cv.pdf` and set `person.cvUrl`.
- Project links: add `link` to a project, and a "View" button appears.
- Beyond Work: replace the three placeholder cards and set `placeholder: false`.

## Deploy (Vercel, free Hobby plan is fine for a personal site)
1. `npm i` and `npm run build` to check it builds.
2. Push to GitHub, then import the repo at vercel.com/new. No settings are needed.
3. Optional: add a custom domain in Vercel → Domains.

## Rebuild the single-file preview
`npm run build && python3 preview/assemble.py preview.html`

## Remaining TODOs
Tagline approval, hobbies, project links/screenshots, GitHub, Instagram, CV PDF, permission to publish both photos and the phone number.
