import type {
  UserAccountRole,
  UserAuthApiResponse,
  UserAuthProfile,
} from "@/types/api/user-auth";

export async function getCurrentUser(): Promise<UserAuthProfile | null> {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as UserAuthApiResponse;
  return payload.ok ? payload.user : null;
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const envUrl = (value: string | undefined, fallback: string) =>
  trimTrailingSlash(value?.trim() || fallback);

export const dashboardUrlForRole = (role: string | null | undefined) => {
  const normalizedRole = (role || "User") as UserAccountRole;

  const urls: Record<UserAccountRole, string> = {
    User: envUrl(
      process.env.NEXT_PUBLIC_USER_DASHBOARD_URL,
      "http://localhost:3002/user_dashboard",
    ),
    Supplier: envUrl(
      process.env.NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL,
      "http://localhost:3004/dashboard",
    ),
    Garage: envUrl(
      process.env.NEXT_PUBLIC_GARAGE_DASHBOARD_URL,
      "http://localhost:3003/garage_dashboard",
    ),
    Fleet: envUrl(
      process.env.NEXT_PUBLIC_FLEET_DASHBOARD_URL,
      "http://localhost:4001/fleet",
    ),
  };

  return urls[normalizedRole] ?? urls.User;
};
