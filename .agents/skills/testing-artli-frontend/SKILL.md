# Testing Artli Frontend

## Overview
Artli is a Next.js (App Router) application with Tailwind CSS. It uses mock data (no DB/auth required) so testing is straightforward.

## Dev Server Setup
```bash
cd /home/ubuntu/repos/testest
npm run dev
# Runs on http://localhost:3000
```

No environment variables or secrets are needed - all data is mocked in `src/lib/mock.ts`.

## Key Routes to Test
- `/` - Home page
- `/works` - Works listing with sidebar (desktop) and Explore drawer (mobile)
- `/artists` - Artists listing with sidebar
- `/works/{id}` - Work detail with Overview/License tabs (e.g. `/works/art-1`)
- `/artists/{id}` - Artist detail page

## Testing Patterns

### Desktop View
- Sidebar should be visible on `/works` and `/artists` pages (left side, w-64)
- Sidebar contains: Trending Tags, Featured Artists, New Works, License Quick Filters
- ArtworkCard shows: AuthorBadge (artist icon + name), title, likes count, price

### Work Detail Page
- Overview tab (default): AuthorBadge, description, tags, WorkActions (Like/Share/Comments)
- License tab: LicenseBadges, conditions grid, price, disabled Acquire button
- Like button toggles: count increments/decrements, heart icon fills/unfills
- Share button shows browser alert (prototype)
- "ライセンス詳細を確認" link switches to License tab

### Mobile View (375px or set_mobile)
- Sidebar hidden, "Explore" button visible
- Click "Explore" opens drawer from left with overlay
- Drawer contains same sidebar content as desktop
- Close via X button or clicking overlay

## Known Issues
- ArtworkCard wraps content in a Link, and AuthorBadge inside also contains a Link, creating nested `<a>` tags. Browser may show "3 Issues" in Next.js dev overlay. This is a known prototype limitation.
- Sidebar filter links (e.g. `/works?commercial=allowed`) navigate but don't actually apply filters since WorksFilter uses local useState.

## Devin Secrets Needed
None - all data is mocked.
