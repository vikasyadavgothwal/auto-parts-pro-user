<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:autoparts-pro-codex-docs -->

## AutoParts Pro App Scope

App: `auto-parts-pro-user`  
Role: Main website / public user app

### Responsibility

Public AutoParts Pro website, marketing pages, marketplace search, product detail pages, RFQ entry, booking entry, Firebase user auth, and frontend API proxy routes.

### Important Folders and Files

- app/(user), app/(business), app/(service), app/(suppliers)
- app/search, app/search2, app/product, app/rfq, app/booking
- app/api/orders, app/api/rfqs, app/api/vin-search
- `components/site`
- `lib/marketplace.ts, lib/api, lib/firebase, lib/user-auth.ts, lib/vin-search.ts`
- `types/`

### Connected Apps and Services

- auto_parts_admin/backend APIs through BACKEND_URL, NEXT_PUBLIC_BACKEND_URL, PRIVATE_API_URL, and NEXT_PUBLIC_PRIVATE_BACKEND_URL
- Firebase web authentication
- fleet_dashboard through FLEET_APP_URL
- supplier inventory/catalog data exposed by admin APIs

### Rules for Working Here

- Read the project root `AGENTS.md` and `docs/` files before cross-app work.
- Keep changes inside `auto-parts-pro-user` unless the task explicitly requires another app.
- Do not change API contracts, Prisma schema, auth cookies/JWTs, Firebase config, route base paths, or shared env behavior without listing affected apps first.
- Do not mix public website, admin, user, supplier, garage, and fleet business logic unless existing imports or APIs already connect them.
- Preserve existing Next.js version guidance and local architecture rules.

### What Not to Touch Unless Explicitly Required

- Other app folders.
- Package manager files and lockfiles.
- `.env` files and secrets.
- Generated folders such as `.next` and `node_modules`.
- Backend/API or Prisma code outside this app's scope.

### Check After Changes

- Search, product detail, RFQ, booking, and auth pages render
- API proxy routes reach the configured backend
- Public website content stays separate from dashboard-only business logic
- Run the commands documented in this app README when relevant.
- Update project root `docs/AI_HANDOFF.md` after major changes.

<!-- END:autoparts-pro-codex-docs -->
