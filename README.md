# Invitéa frontend

React, Vite and TypeScript frontend for Invitéa. This repository contains the current bilingual website, its scroll choreography, private dashboard interfaces, invitation pages, and all optimized artwork and music used by the site.

## Local development

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
```

The frontend runs on port 5173. Its local `/api` requests are forwarded to the separately managed Express backend on port 3001. The public website and coded invitation designs render before backend configuration; database-backed RSVP and dashboard actions need the backend.

## Vercel deployment

Import this repository into Vercel. The application is at the repository root; leave Root Directory at the default rather than selecting an INVITÉA-client subfolder.

- Framework: Vite.
- Install command: `npm ci`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node.js: 22 or newer.

The included `vercel.json` handles invitation, Arabic, dashboard and policy routes. Set the server-side Vercel environment variable `RAILWAY_API_URL` to the actual HTTPS backend origin, with no extra path. The API transport function in `api/proxy.js` forwards requests to Railway and does not contain database or Google Drive logic.

Keep database credentials, session secrets and Google OAuth credentials in the separate Railway backend environment. Never put them into `VITE_*` variables or commit real `.env` files. Environment examples include public studio contacts; credential slots remain empty.

## Invitation link previews

Each invitation serves its own title, welcome message and JPEG cover in the initial HTML, before JavaScript runs. English and Arabic URLs have corresponding copy. The Vite build writes a separate `index.html` for every coded invitation route and short link. Railway's static server can serve these files directly, instead of returning the general studio homepage to sharing crawlers. `api/invitation-page.ts` also provides these documents on Vercel, while the Express backend reads the same public manifest at `public/social/invitations.json`. The envelope entrances and invitation pages still load normally.

Share the existing `/en/invitations/…` or `/ar/invitations/…` URLs for Omar & Sara, Tareq & Layan, and Yousef & Rama. The short `/invite/omar-sara`, `/invite/tareq-layan` and `/invite/yousef-rama` links also have previews.

The public portfolio has a **Copy invitation link** action on every invitation. It copies the sharing URL for the selected language, including the Invitéa sharing URLs for external invitations, and offers a selectable link if clipboard access is unavailable.

For the externally hosted graduation invitations, use `/en/invitations/lelyan-rama`, `/en/invitations/zaffeh` (or their Arabic equivalents), or the short `/invite/lelyan-rama` and `/invite/zaffeh` links. These Invitéa links show the graduation cover and title to sharing services, and send guests to the original live invitation. The original Railway URLs themselves are unchanged.

No new API key is needed. Static builds automatically use Railway's `RAILWAY_PUBLIC_DOMAIN` or Vercel's production domain to make cover and canonical URLs absolute. Set `VITE_SITE_URL` (or server-side `SITE_URL`) to the full canonical HTTPS origin when using a preferred domain or another static host, then rebuild. Local builds default to `http://127.0.0.1:4173`. The Vercel function and local middleware can also derive the origin from the request. Future published database invitations under `/invite/:slug` require the backend or Vercel handler and use the existing `RAILWAY_API_URL`, their bilingual content, and `ogImage` (or the hero cover when no share image is set). Draft and dashboard data are excluded.

Messaging apps control the final preview layout and may cache an older preview. Validate a newly deployed link after deployment rather than a localhost URL; previously sent messages may retain their earlier card.

## Current website

- `/en` and `/ar`: the English and Arabic public website.
- `/en/invitations/bassam-lana` and `/ar/invitations/bassam-lana`: Bassam & Lana's bronze-and-pearl wedding. A real perspective camera walks through modeled rooms, with generated stone, marble and floral assets, physical shadows, restrained bloom, and desktop floor reflections. Includes an accessible artwork fallback, maps, calendar, and the existing backend RSVP integration. The short `/invite/bassam-lana` link defaults to Arabic. Artwork prompts, model export instructions and soundtrack attribution: [artwork notes](docs/bassam-lana-artwork.md).
- `/en/invitations/omar-sara` and `/ar/invitations/omar-sara`: Omar & Sara.
- `/en/invitations/tareq-layan` and `/ar/invitations/tareq-layan`: Tareq & Layan.
- `/en/invitations/yousef-rama` and `/ar/invitations/yousef-rama`: Yousef & Rama.
- `/admin` and `/client`: interfaces for secure backend authentication and private data.

Lelyan & Rama and Zaffeh keep their original external invitation links. Invitation pricing is discussed privately; the optional Guest Photo Collection add-on is shown at +20 JOD. Guest Photo Collection is advertised on the public website but is not mounted or enabled on any invitation.

## Palette and request contacts

The request form keeps eight introductory colours visible, with a searchable library of 500 unique shades under “Show more colours.” Search accepts English or Arabic colour names and hex codes, and combines with the colour-family filter. Customers can still select up to three colours or enter their own hex codes. Color Hunt remains available for inspiration.

“Prepare My Request” validates the form, assembles all selected details, and opens WhatsApp with the message addressed to `962778312946` (Jordan: `0778312946`). It prepares the message without sending it. The review and WhatsApp link remain available if the browser blocks the new tab. The studio Instagram is `https://www.instagram.com/invitea_jo/`.

These public contacts work without backend configuration. They can be overridden through `VITE_WHATSAPP_NUMBER` / `VITE_INSTAGRAM_URL` or the existing Railway public configuration (`WHATSAPP_NUMBER` / `INSTAGRAM_URL`). No additional API keys are required.

All media required at runtime is tracked under `public/`; fonts are bundled through the frontend dependencies. Original working artwork under `assets-source/` is retained locally and excluded from this deployment repository. Production keeps the same layout, envelope entrances, motion, Arabic copy, images and music as the local website. Browser sound policies and reduced-motion preferences continue to apply.
