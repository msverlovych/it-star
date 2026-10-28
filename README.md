# ITstar

ITstar is a curated learning atlas for developers and for people who want to become developers. It collects real courses, lessons, articles, docs, YouTube channels, tools, and books, and lays five career paths over that library:

- AI engineering
- Web development
- Frontend
- Backend
- Mobile apps

Each path is a ranked sequence: **Spark**, **Apprentice**, **Knight**, **Master**. The ranks are a study pace, not a certificate.

The visual language is an original space-opera: a starfield, and an energy blade that burns blue-green in the Dawn theme and red in the Ember theme. The theme switch synthesizes a short ignition with the Web Audio API. Nothing is sampled from a film. Sound plays only after you toggle, and reduced-motion preferences skip the sweep.

Maksym, a senior software developer working in React, Flutter, and Java, keeps the atlas.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- Framer Motion
- Content in typed modules under `data/`. No database and no backend server.

`data/catalog.ts` is the boundary the pages use. A CMS or database can replace that module later without rewriting the screens.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

No environment variables are required.

## Deploy on Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New Project** and import the repository.
3. Framework preset: **Next.js**. Build command `next build`, output handled by the preset. Leave environment variables empty.
4. Deploy. Vercel will run `npm run build`.

`vercel.json` is unnecessary. The app is static content with a client theme preference stored in `localStorage`.

## Add a resource

Edit `data/resources.ts`. Each entry needs a unique `slug`, a real `https` URL, a description, a type (`course`, `lesson`, `article`, `docs`, `channel`, `tool`, `book`), a level, a cost (`free`, `paid`, `freemium`), and tags.

To place it on a roadmap, add the slug to a stage in `data/paths.ts`. Importing the catalog throws if a slug is duplicated or a path points at a missing resource, so a broken link in the data fails the build.

## Theme

Dawn is the light theme. Ember is the dark theme. The choice is stored under `itstar-theme`. On first visit the site follows the system preference until you toggle.
