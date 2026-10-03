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

Keep database credentials, session secrets and Google OAuth credentials in the separate Railway backend environment. Never put them into `VITE_*` variables or commit real `.env` files. The included environment examples contain empty configuration slots only.

## Current website

- `/en` and `/ar`: the English and Arabic public website.
- `/en/invitations/omar-sara` and `/ar/invitations/omar-sara`: Omar & Sara.
- `/en/invitations/tareq-layan` and `/ar/invitations/tareq-layan`: Tareq & Layan.
- `/en/invitations/yousef-rama` and `/ar/invitations/yousef-rama`: Yousef & Rama.
- `/admin` and `/client`: interfaces for secure backend authentication and private data.

Lelyan & Rama and Zaffeh keep their original external invitation links. No public prices or invented contact details are configured. Guest Photo Collection is advertised on the public website but is not mounted or enabled on any invitation.

All media required at runtime is tracked under `public/`; fonts are bundled through the frontend dependencies. Original working artwork under `assets-source/` is retained locally and excluded from this deployment repository. Production keeps the same layout, envelope entrances, motion, Arabic copy, images and music as the local website. Browser sound policies and reduced-motion preferences continue to apply.
