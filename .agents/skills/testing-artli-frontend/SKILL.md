# Testing Artli Frontend

## Overview
Artli is a Next.js (App Router) application with Tailwind CSS, styled as a pixiv-like art SNS/browsing platform. It uses mock data (no DB/auth required) so testing is straightforward.

## Dev Server Setup
```bash
cd /home/ubuntu/repos/testest
npm run dev
# Runs on http://localhost:3000
```

No environment variables or secrets are needed - all data is mocked in `src/lib/mock.ts`.

## Vercel Deployment Testing
- Live URL: https://testest-gilt.vercel.app
- After merging changes, Vercel auto-deploys from `main`. Wait ~1 minute for deployment.
- Key verification: check all routes load (especially dynamic routes like `/works/art-1/` and `/artists/artist-1/`) since these use `generateStaticParams` for SSG.
- Note trailing slashes: the deployed site uses trailing slashes (e.g. `/works/` not `/works`).

### Package Version Notes
- The project uses Next.js 15 (not 16 - Next.js 16 does not exist as of early 2026). If `package.json` references `next@16.x`, it will fail to install.
- Dynamic route pages use `params: Promise<{ id: string }>` with `await` - this is the Next.js 15 async params API. If downgrading to Next.js 14, these would need to be changed to synchronous params.
- `eslint-config-next` version should match the Next.js major version.

## Key Routes to Test
- `/` - Home page with SNS-style hero and Featured Works/Artists
- `/works` - Works listing with sidebar (desktop), collapsible License filters, 5-column grid
- `/artists` - Artists listing with sidebar
- `/works/{id}` - Work detail with Overview/License tabs (e.g. `/works/art-1`)
- `/works/{id}#license` - Direct link to License tab via URL hash
- `/artists/{id}` - Artist detail page with Policy Summary

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

### Mobile View (375px or set_mobile)
- Sidebar hidden, "Explore" button visible
- Click "Explore" opens drawer from left with overlay
- Drawer contains same sidebar content as desktop
- Close via X button or clicking overlay

## Build Verification
```bash
npm run build   # Should complete with no errors
npm run lint    # Should show no warnings or errors
```

## Common Pitfalls
- **"use client" directive**: Any component using onClick, useState, or other client-side APIs must have `"use client"` at the top. If you see "Application error: a server-side exception" on page load, check for missing `"use client"` directives in components with event handlers.
- Brand constants are in `src/lib/brand.ts` - the BRAND object should be used for site name/tagline across Header, Footer, layout metadata, and homepage.
- ArtworkCard and AuthorBadge use `e.stopPropagation()` on nested Links to prevent parent link interference - these require client component status.
- **Tailwind CSS v4**: This project uses Tailwind CSS v4 with `@import "tailwindcss"` in `globals.css` and `@tailwindcss/postcss` plugin in `postcss.config.mjs`. Do not use Tailwind v3 syntax.

## Known Issues
- Nested `<a>` tags: ArtworkCard has multiple Link elements (thumbnail+title, AuthorBadge, License chip) which may trigger Next.js dev overlay warnings about nested anchors. This is a known prototype pattern.
- Sidebar filter links (e.g. `/works?commercial=allowed`) navigate but don't actually apply filters since WorksFilter uses local useState.

## Devin Secrets Needed
- `VERCEL_TOKEN` - For Vercel deployment operations (optional, only needed for deploy commands)
