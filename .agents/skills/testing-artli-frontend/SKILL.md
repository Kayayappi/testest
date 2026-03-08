# Testing Artli Frontend

## Overview
Artli is a Next.js (App Router) application with Tailwind CSS, styled as a pixiv-like art SNS/browsing platform. It uses Neon PostgreSQL via Prisma 7 with the PrismaNeon adapter for data storage.

## Dev Server Setup
```bash
cd /home/ubuntu/repos/testest
npm install
npx prisma generate
npm run dev
# Runs on http://localhost:3000 (or next available port like 3001)
```

Requires `.env` file with `DATABASE_URL` and `DIRECT_DATABASE_URL` pointing to the Neon database.

## Database Setup
- **Prisma 7** with `prisma-client` generator (output: `src/generated/prisma/`)
- **PrismaNeon adapter** (`@prisma/adapter-neon`) for serverless connections
- `prisma.config.ts` handles datasource URL config — uses `process.env["DIRECT_DATABASE_URL"]` with `??` fallback to `env("DATABASE_URL")` (note: Prisma's `env()` throws on missing vars, so `process.env` is needed for the optional fallback)
- Migration: `npx prisma migrate dev` (uses DIRECT_DATABASE_URL for direct connection)
- Seed: `npx prisma db seed` or `npx tsx prisma/seed.ts`
- Seed data: 8 users, 6 artists, 2 developer profiles, 21 works, tags, acquisitions

## Vercel Deployment Testing
- Live URL: https://testest-gilt.vercel.app
- After merging changes, Vercel auto-deploys from `main`. Wait ~1 minute for deployment.
- Key verification: check all routes load (especially dynamic routes like `/works/art-1` and `/artists/artist-1`).
- Vercel requires both `DATABASE_URL` and `DIRECT_DATABASE_URL` environment variables set in project settings.
- Build command must include `prisma generate` before `next build` (configured in package.json build script).

### Package Version Notes
- The project uses Next.js 15 (not 16 - Next.js 16 does not exist as of early 2026). If `package.json` references `next@16.x`, it will fail to install.
- Dynamic route pages use `params: Promise<{ id: string }>` with `await` - this is the Next.js 15 async params API.
- `eslint-config-next` version should match the Next.js major version.

## Key Routes to Test
- `/` - Home page with SNS-style hero and Featured Works/Artists
- `/works` - Works listing with sidebar (desktop), collapsible License filters, 5-column grid
- `/artists` - Artists listing with sidebar
- `/works/{id}` - Work detail with Overview/License tabs (e.g. `/works/art-1`)
- `/works/{id}#license` - Direct link to License tab via URL hash
- `/artists/{id}` - Artist detail page with Policy Summary and works list

## Testing Patterns

### Desktop View
- Sidebar should be visible on `/works` and `/artists` pages (left side, w-64)
- Sidebar contains: Trending Tags, Featured Artists, New Works, License Quick Filters
- ArtworkCard shows: portrait thumbnail (aspect-[3/4]), title, AuthorBadge (artist icon + name), License chip, heart + like count
- ArtworkCard does NOT show price - price is only on the License tab of work detail
- Grid density: grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5, gap-4
- License filters section is collapsible (collapsed by default), toggled by "License filters" button

### Work Detail Page
- Overview tab (default): AuthorBadge, description, tags, WorkActions (Like/Share/Comments), "ライセンス詳細を確認 →" link
- License tab: LicenseBadges, conditions grid, price (¥), disabled "Acquire license (prototype)" button, "Terms shown here describe allowed usage." note
- Hash navigation: visiting `/works/{id}#license` should open License tab directly
- Like button toggles: count increments/decrements, heart icon fills/unfills
- Share button shows browser alert (prototype)
- "ライセンス詳細を確認" link switches from Overview to License tab

### Artist Detail Page
- Policy Summary section uses gray styling (bg-gray-50, border-gray-200, text-xs, text-gray-700/600)
- Policy Summary should NOT use indigo styling
- Works section lists all works by the artist with like counts

### Mobile View (375px or set_mobile)
- Sidebar hidden, "Explore" button visible
- Click "Explore" opens drawer from left with overlay
- Drawer contains same sidebar content as desktop
- Close via X button or clicking overlay

## Build Verification
```bash
npx prisma generate  # Must run before build
npm run build        # Should complete with no errors
npm run lint         # Should show no warnings or errors
```

## Common Pitfalls
- **"use client" directive**: Any component using onClick, useState, or other client-side APIs must have `"use client"` at the top. If you see "Application error: a server-side exception" on page load, check for missing `"use client"` directives in components with event handlers.
- Brand constants are in `src/lib/brand.ts` - the BRAND object should be used for site name/tagline across Header, Footer, layout metadata, and homepage.
- ArtworkCard and AuthorBadge use `e.stopPropagation()` on nested Links to prevent parent link interference - these require client component status.
- **Tailwind CSS v4**: This project uses Tailwind CSS v4 with `@import "tailwindcss"` in `globals.css` and `@tailwindcss/postcss` plugin in `postcss.config.mjs`. Do not use Tailwind v3 syntax.
- **Prisma 7 breaking changes**: `datasourceUrl` constructor option no longer exists — must use `PrismaNeon` adapter. The `env()` helper from `prisma/config` throws on missing variables (unlike `process.env` which returns `undefined`), so use `process.env` for optional env var fallbacks.
- **Generated client path**: Import from `@/generated/prisma/client` (app code) or `../src/generated/prisma/client.js` (scripts like seed.ts with `.js` extension for ESM).
- **Port conflicts**: Dev server may use port 3001 if 3000 is in use. Check console output for actual port.

## Known Issues
- Nested `<a>` tags: ArtworkCard has multiple Link elements (thumbnail+title, AuthorBadge, License chip) which may trigger Next.js dev overlay warnings about nested anchors. This is a known prototype pattern.
- Sidebar filter links (e.g. `/works?commercial=allowed`) navigate but don't actually apply filters since WorksFilter uses local useState.
- Occasional `SyntaxError: Unexpected end of JSON input` on `/works` page during dev — transient, page works on reload.

## Devin Secrets Needed
- `DATABASE_URL` - Neon PostgreSQL connection string (pooled, with `-pooler` suffix)
- `DIRECT_DATABASE_URL` - Neon PostgreSQL direct connection string (non-pooled, for migrations)
- `VERCEL_TOKEN` - For Vercel deployment operations (optional, only needed for deploy commands)
