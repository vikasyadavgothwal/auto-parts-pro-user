import type {
  UserAuthApiResponse,
  UserAuthProfile,
} from "@/types/api/user-auth";
import { getFirebaseClientAuth } from "@/lib/firebase/client";
export { dashboardUrlForRole } from "@/lib/dashboard-url";

let refreshRequest: Promise<boolean> | null = null;

const rotateSiteSession = async () => {
  const refresh = async () => {
    const currentSession = await fetch("/api/auth/me", {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: { accept: "application/json" },
    });
    if (currentSession.ok) return true;
    return fetch("/api/auth/refresh", {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    }).then((response) => response.ok);
  };

  if (typeof navigator !== "undefined" && navigator.locks) {
    return navigator.locks.request("autoparts-user-session-refresh", refresh);
  }
  return refresh();
};

export function refreshSiteSession(): Promise<boolean> {
  if (!refreshRequest) {
    const request = rotateSiteSession().catch(() => false);
    refreshRequest = request;
    void request.finally(() => {
      window.setTimeout(() => {
        if (refreshRequest === request) refreshRequest = null;
      }, 5_000);
    });
  }
  return refreshRequest;
}

export async function siteAuthenticatedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const requestInit: RequestInit = { ...init, credentials: "include" };
  let response = await fetch(input, requestInit);
  if (response.status === 401 && await refreshSiteSession()) {
    response = await fetch(input, requestInit);
  }
  return response;
}

export async function getCurrentUser(): Promise<UserAuthProfile | null> {
  const response = await siteAuthenticatedFetch("/api/auth/me", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as UserAuthApiResponse;
  return payload.ok ? payload.user ?? null : null;
}

export async function logoutCurrentUser(): Promise<void> {
  const [{ signOut }] = await Promise.all([
    import("firebase/auth"),
    fetch("/api/auth/logout", {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    }),
  ]);

  try {
    await signOut(getFirebaseClientAuth());
  } catch {
    // Backend logout still clears the application session when Firebase is unavailable.
  }
}
