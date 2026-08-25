import { NextRequest } from "next/server";

import { dashboardPlansUrlForRole } from "@/lib/dashboard-url";

const roleCookies = {
  Fleet: "fleet_access_token",
  Garage: "garage_access_token",
  Supplier: "supplier_access_token",
} as const;

type BusinessRole = keyof typeof roleCookies;

export const dynamic = "force-dynamic";

const requestHostname = (request: NextRequest) =>
  (request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.hostname)
    .split(",")[0]
    .trim()
    .replace(/:\d+$/, "") || request.nextUrl.hostname;

export async function GET(request: NextRequest) {
  const requestedRole = request.nextUrl.searchParams.get("role") as BusinessRole | null;
  const hostname = requestHostname(request);
  const roles = requestedRole && requestedRole in roleCookies
    ? [requestedRole, ...Object.keys(roleCookies).filter((role) => role !== requestedRole)]
    : Object.keys(roleCookies);

  for (const role of roles as BusinessRole[]) {
    if (request.cookies.get(roleCookies[role])?.value) {
      return Response.json({
        ok: true,
        authenticated: true,
        url: dashboardPlansUrlForRole(role, hostname),
      });
    }
  }

  return Response.json({ ok: true, authenticated: false });
}
