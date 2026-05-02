# Altar

A place to share your poems.

Altar is a social platform for writers — publish poems, follow other authors, bookmark favourites, and engage through likes and comments.

## Features

- **Write & publish** — compose poems, save drafts, and edit published work
- **Discover** — home feed, search, and author pages
- **Engage** — likes, comments, bookmarks, and follower notifications
- **Profiles** — personal page (`/me`) with your posts, drafts, and bookmarks
- **Auth** — Google OAuth sign-in
- **Theming** — light and dark modes
- **Moderation** — profanity filtering and an issue-reporting flow

## Tech stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Backend** — [Convex](https://convex.dev) for database, queries, mutations, and crons
- **Auth** — [`@react-oauth/google`](https://github.com/MomenSherif/react-oauth)
- **UI** — React 19, Tailwind CSS 4, Framer Motion, Lucide icons
- **State & forms** — Zustand, Formik, Zod
- **Tooling** — Bun, Biome, ESLint, TypeScript

## Getting started

Install dependencies and run the dev server:

```bash
bun install
bun dev
```

In a second terminal, start Convex:

```bash
bunx convex dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Create a `.env.local` with:

```
NEXT_PUBLIC_CONVEX_URL=...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
```

## Project structure

```
app/
  (auth)/          sign-in, login, signup
  (main)/
    (protected)/   write, drafts, bookmarks, me, notifications, ...
    (with-header)/ home, poem/[id], author/[id]
components/        UI, blocks, landing
convex/            schema and server functions (poems, comments, likes, ...)
hooks/  store/  provider/  wrappers/  utils/  types/
```

## Scripts

- `bun dev` — start the Next.js dev server (Turbopack)
- `bun run build` — production build
- `bun start` — run the production build
- `bun run lint` — ESLint
