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

  const backend = await fetch(backendUrl(), { method: "POST", cache: "no-store", headers });
  const response = new Response(await backend.arrayBuffer(), {
    status: backend.status,
    headers: { "content-type": backend.headers.get("content-type") ?? "application/json" },
  });
  const retryAfter = backend.headers.get("retry-after");
  if (retryAfter) response.headers.set("retry-after", retryAfter);
  for (const value of getSetCookieHeaders(backend.headers)) response.headers.append("set-cookie", value);
  return response;
}
