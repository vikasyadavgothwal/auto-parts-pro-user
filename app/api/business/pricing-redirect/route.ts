import { NextRequest } from "next/server";

import { dashboardUrlForRole } from "@/lib/dashboard-url";

const roleCookies = {
  Fleet: "fleet_access_token",
  Garage: "garage_access_token",
  Supplier: "supplier_access_token",
} as const;

type BusinessRole = keyof typeof roleCookies;

const planUrlForRole = (role: BusinessRole, hostname: string) => {
  const dashboardUrl = dashboardUrlForRole(role, hostname);
  const url = dashboardUrl.startsWith("http")
    ? new URL(dashboardUrl)
    : new URL(dashboardUrl, "http://local.test");
  url.pathname = url.pathname.replace(/\/dashboard\/?$/, "/plans");
  if (!url.pathname.endsWith("/plans")) {
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/plans`;
  }
  return dashboardUrl.startsWith("http") ? url.toString() : `${url.pathname}${url.search}`;
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestedRole = request.nextUrl.searchParams.get("role") as BusinessRole | null;
  const hostname = request.nextUrl.hostname;
  const roles = requestedRole && requestedRole in roleCookies
    ? [requestedRole, ...Object.keys(roleCookies).filter((role) => role !== requestedRole)]
    : Object.keys(roleCookies);

  for (const role of roles as BusinessRole[]) {
    if (request.cookies.get(roleCookies[role])?.value) {
      return Response.json({
        ok: true,
        authenticated: true,
        url: planUrlForRole(role, hostname),
      });
    }
  }

  return Response.json({ ok: true, authenticated: false });
}
