This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open the URL printed by the dev server with your browser to see the result.

## Firebase User Authentication

Enable Email/Password, Google, and Phone providers in Firebase Authentication,
then configure the Firebase Web application values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_BACKEND_URL=<backend-origin>
NEXT_PUBLIC_SITE_URL=<site-origin>
NEXT_PUBLIC_USER_DASHBOARD_URL=<user-dashboard-url>
USER_DASHBOARD_APP_URL=<internal-or-deployed-user-dashboard-origin>
NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL=<supplier-dashboard-url>
NEXT_PUBLIC_GARAGE_DASHBOARD_URL=<garage-dashboard-url>
NEXT_PUBLIC_FLEET_DASHBOARD_URL=<fleet-dashboard-url>
FLEET_APP_URL=<fleet-app-origin>
```

The public website signup supports User, Fleet, Garage, and Supplier account
selection. User accounts continue to the User Dashboard with the shared
HttpOnly session; other roles are redirected to their matching dashboard.

The main website serves the User Dashboard on the same public domain under
`/user_dashboard`. Set `USER_DASHBOARD_APP_URL` to the origin where the
`user_dashboard` app is running so the public website can rewrite that path to
the dashboard service. Local development defaults this upstream to
`http://localhost:3002`.

The main website automatically refreshes an expired short-lived backend access
token through `/api/auth/refresh` and retries authenticated marketplace actions
once. Users remain signed in while their refresh session is valid.

When the public website runs on `localhost` (including `127.0.0.1` or `::1`),
successful email and Google authentication always redirect to the matching
local dashboard: User `3002`, Garage `3003`, Supplier `3004`, and Fleet `4001`.
Configured `NEXT_PUBLIC_*_DASHBOARD_URL` values continue to control redirects
on deployed hostnames.

Add the deployed frontend hostname to Firebase Authentication's authorized
domains. Phone authentication also requires the Firebase reCAPTCHA flow.
Google sign-in uses the Firebase Google provider, so the Google OAuth client
must be configured in the Firebase project. Do not place the OAuth client secret
in frontend environment variables or source code.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- BEGIN:autoparts-pro-codex-docs -->

## AutoParts Pro App Notes

### App Purpose

Public AutoParts Pro website, marketing pages, marketplace search, product detail pages, RFQ entry, booking entry, Firebase user auth, and frontend API proxy routes.

### Important Folders

- app/(user), app/(business), app/(service), app/(suppliers)
- app/search, app/search2, app/product, app/rfq, app/booking
- app/api/orders, app/api/rfqs, app/api/vin-search
- `components/site`
- `lib/marketplace.ts, lib/api, lib/firebase, lib/user-auth.ts, lib/vin-search.ts`
- `types/`

### Environment Variables

Detected or documented variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_BACKEND_URL`
- `BACKEND_URL`
- `PRIVATE_API_URL`
- `NEXT_PUBLIC_PRIVATE_BACKEND_URL`
- `NEXT_PUBLIC_SITE_URL`
- `SITE_URL`
- `NEXT_PUBLIC_USER_DASHBOARD_URL`
- `USER_DASHBOARD_APP_URL`
- `NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL`
- `NEXT_PUBLIC_GARAGE_DASHBOARD_URL`
- `NEXT_PUBLIC_FLEET_DASHBOARD_URL`
- `FLEET_APP_URL`

### Run, Build, and Test Commands

Install:

```bash
npm install
```

Detected scripts:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run test`

Runtime note: start uses port 3001; dev uses the default Next.js port unless overridden.

### Connected Apps and Services

- auto_parts_admin/backend APIs through BACKEND_URL, NEXT_PUBLIC_BACKEND_URL, PRIVATE_API_URL, and NEXT_PUBLIC_PRIVATE_BACKEND_URL
- Firebase web authentication
- fleet_dashboard through FLEET_APP_URL
- supplier inventory/catalog data exposed by admin APIs

### Common Checks Before Deployment

- Search, product detail, RFQ, booking, and auth pages render
- API proxy routes reach the configured backend
- Public website content stays separate from dashboard-only business logic
- Run lint/build for this app before deployment.
- Re-check affected API, auth, database, and env contracts in connected apps.

<!-- END:autoparts-pro-codex-docs -->
