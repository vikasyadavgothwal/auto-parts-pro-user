import { fetchWithTimeout } from "@shared/backend-proxy";

const AUTH_REFRESH_TIMEOUT_MS = 4_000;
const refreshCookieName =
  process.env.USER_REFRESH_COOKIE_NAME ?? "user_refresh_token";

const backendUrl = () => {
  const baseUrl =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  if (!baseUrl) throw new Error("Missing backend API URL");
  return new URL("/api/v1/user/auth/refresh", baseUrl);
};

const getSetCookieHeaders = (headers: Headers): string[] => {
  const enhanced = headers as Headers & { getSetCookie?: () => string[] };
  return enhanced.getSetCookie?.() ?? (headers.get("set-cookie") ? [headers.get("set-cookie")!] : []);
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const headers = new Headers({ accept: "application/json" });
  const cookie = request.headers.get("cookie");
  const origin = request.headers.get("origin");
  const userAgent = request.headers.get("user-agent");
  if (cookie) headers.set("cookie", cookie);
  if (origin) headers.set("origin", origin);
  if (userAgent) headers.set("user-agent", userAgent);
  if (!cookie?.split(";").some((part) => part.trim().startsWith(`${refreshCookieName}=`))) {
    return Response.json(
      { ok: false, success: false, message: "Session expired" },
      { status: 401 },
    );
  }

  let backend: Response;
  try {
    backend = await fetchWithTimeout(backendUrl(), {
      method: "POST",
      cache: "no-store",
      headers,
      timeoutMs: AUTH_REFRESH_TIMEOUT_MS,
    });
  } catch {
    return Response.json(
      { ok: false, success: false, message: "Backend unavailable" },
      { status: 503 },
    );
  }

  const response = new Response(backend.body, {
    status: backend.status,
    headers: { "content-type": backend.headers.get("content-type") ?? "application/json" },
  });
  const retryAfter = backend.headers.get("retry-after");
  if (retryAfter) response.headers.set("retry-after", retryAfter);
  for (const value of getSetCookieHeaders(backend.headers)) response.headers.append("set-cookie", value);
  return response;
}
