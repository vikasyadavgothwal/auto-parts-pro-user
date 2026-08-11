import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Developer API | Auto Parts Pro",
  description: "Use Auto Parts Pro API keys to connect Garage, Fleet, and Supplier dashboards to your own backend.",
}

const dashboardGuides = [
  {
    title: "Garage API",
    description: "Manage services and bookings from your own garage website or backend.",
    dashboard: "Garage Dashboard → API Keys",
    endpoints: [
      "GET /api/v1/developer/garage/services",
      "POST /api/v1/developer/garage/services",
      "GET /api/v1/developer/garage/bookings",
      "POST /api/v1/developer/garage/bookings",
    ],
  },
  {
    title: "Fleet API",
    description: "Sync vehicles from your fleet system and keep AutoParts Pro data current.",
    dashboard: "Fleet Dashboard → API Keys",
    endpoints: [
      "GET /api/v1/developer/fleet/vehicles",
      "POST /api/v1/developer/fleet/vehicles",
      "PATCH /api/v1/developer/fleet/vehicles/{id}",
      "DELETE /api/v1/developer/fleet/vehicles/{id}",
    ],
  },
  {
    title: "Supplier API",
    description: "Connect your external catalog, ERP, or ecommerce backend to supplier inventory.",
    dashboard: "Supplier Dashboard → API Keys",
    endpoints: [
      "GET /api/v1/developer/supplier/parts",
      "POST /api/v1/developer/supplier/parts",
      "PATCH /api/v1/developer/supplier/parts/{id}",
    ],
  },
]

const errorRows = [
  ["401", "API_KEY_REQUIRED / API_KEY_REVOKED", "The key is missing, invalid, or revoked."],
  ["402", "API_BILLING_REQUIRED", "The plan does not include API access, the add-on is not enabled, or billing has ended."],
  ["403", "API_SCOPE_FORBIDDEN", "The key exists but does not include the required scope."],
  ["429", "API_RATE_LIMITED", "The key has exceeded its per-minute request limit."],
]

export default function DeveloperApiPage() {
  return (
    <main className="bg-brand-surface text-white">
      <section className="site-container py-20">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <KeyRound className="h-4 w-4" /> Developer API
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Connect your own backend to AutoParts Pro.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted">
            Garage, Fleet, and Supplier accounts can create server-side API keys after API access is included in their plan or enabled by Admin as a paid add-on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/business">View business plans <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#quickstart">Read quickstart</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="quickstart" className="site-container grid gap-6 pb-12 md:grid-cols-3">
        {[
          ["1", "Enable API access", "Free plans do not include API access. Request the API add-on or upgrade, then Admin enables it after billing confirmation."],
          ["2", "Create a key", "Open API Keys in your Garage, Fleet, or Supplier dashboard. Name the key and choose only the scopes your integration needs."],
          ["3", "Call from your server", "Store the key in your backend environment and call AutoParts Pro APIs from your server, not from browser JavaScript."],
        ].map(([step, title, description]) => (
          <Card key={step} className="border-border bg-brand-surface-strong text-white">
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">{step}</div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-brand-muted">{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="site-container grid gap-8 py-12 lg:grid-cols-[1fr_0.9fr]">
        <Card className="border-border bg-brand-surface-strong text-white">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription className="text-brand-muted">Send the API key in every request using a server-side HTTP client.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg border border-border bg-black p-4 text-sm text-emerald-300">
{`curl https://api.autopartspro.com/api/v1/developer/garage/services \\
  -H "Authorization: Bearer app_live_garage_xxxxx"`}
            </pre>
            <p className="mt-4 text-sm leading-6 text-brand-muted">
              You may also send <code className="rounded bg-black px-1 py-0.5">x-api-key</code>. Never put the key in frontend code, mobile bundles, public GitHub repos, or screenshots.
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-brand-surface-strong text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Access rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-brand-muted">
            <p>API keys inherit your active plan, enabled add-ons, and account limits.</p>
            <p>If the billing period ends or Admin disables the add-on, API calls return a billing error instead of exposing data.</p>
            <p>Write endpoints still respect plan limits such as service, vehicle, and product capacity.</p>
          </CardContent>
        </Card>
      </section>

      <section className="site-container grid gap-6 py-12">
        <div>
          <h2 className="text-3xl font-semibold">Dashboard API coverage</h2>
          <p className="mt-3 max-w-3xl text-brand-muted">Start with the routes below. Admin/internal/auth/payment routes are intentionally not available through API keys.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {dashboardGuides.map((guide) => (
            <Card key={guide.title} className="border-border bg-brand-surface-strong text-white">
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription className="text-brand-muted">{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm font-medium text-primary">{guide.dashboard}</p>
                <ul className="space-y-2">
                  {guide.endpoints.map((endpoint) => (
                    <li key={endpoint} className="rounded-md border border-border bg-black px-3 py-2 font-mono text-xs text-brand-muted">{endpoint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="site-container pb-20">
        <Card className="border-border bg-brand-surface-strong text-white">
          <CardHeader>
            <CardTitle>Professional error handling</CardTitle>
            <CardDescription className="text-brand-muted">Every developer API error returns JSON with <code>ok</code>, <code>code</code>, and <code>message</code>.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-brand-muted">
                <tr><th className="border-b border-border py-3">HTTP</th><th className="border-b border-border py-3">Code</th><th className="border-b border-border py-3">Meaning</th></tr>
              </thead>
              <tbody>
                {errorRows.map(([status, code, meaning]) => (
                  <tr key={code}><td className="border-b border-border py-3 font-mono">{status}</td><td className="border-b border-border py-3 font-mono text-primary">{code}</td><td className="border-b border-border py-3 text-brand-muted">{meaning}</td></tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
