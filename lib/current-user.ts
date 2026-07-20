import type {
  UserAuthApiResponse,
  UserAuthProfile,
} from "@/types/api/user-auth";
import { getFirebaseClientAuth } from "@/lib/firebase/client";
export { dashboardUrlForRole } from "@/lib/dashboard-url";

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
