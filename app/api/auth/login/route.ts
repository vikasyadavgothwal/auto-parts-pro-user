const backendUrl = () => {
  const baseUrl =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

  if (!baseUrl) {
    throw new Error(
      "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL.",
    );
  }

  return new URL("/api/v1/user/auth/login", baseUrl);
};

const getSetCookieHeaders = (headers: Headers): string[] => {
  const enhancedHeaders = headers as Headers & {
    getSetCookie?: () => string[];
  };
  const values = enhancedHeaders.getSetCookie?.();
  if (values?.length) return values;

  const combinedValue = headers.get("set-cookie");
  return combinedValue ? [combinedValue] : [];
};

const cookieHeaderFromSetCookie = (values: string[]) =>
  values
    .map((value) => value.split(";", 1)[0]?.trim())
    .filter(Boolean)
    .join("; ");

const revokeTemporarySession = async (
  issuedCookies: string[],
  request: Request,
) => {
  const cookie = cookieHeaderFromSetCookie(issuedCookies);
  if (!cookie) return;

  await fetch(new URL("/api/v1/user/auth/logout", backendUrl()), {
    method: "POST",
    cache: "no-store",
    headers: {
      accept: "application/json",
      cookie,
      ...(request.headers.get("user-agent")
        ? { "user-agent": request.headers.get("user-agent")! }
        : {}),
    },
  }).catch(() => undefined);
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const headers = new Headers({
    accept: "application/json",
    "content-type": "application/json",
  });
  const userAgent = request.headers.get("user-agent");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (userAgent) headers.set("user-agent", userAgent);
  if (forwardedFor) headers.set("x-forwarded-for", forwardedFor);

  const backend = await fetch(backendUrl(), {
    method: "POST",
    cache: "no-store",
    headers,
    body: await request.text(),
  });

  const payloadBuffer = await backend.arrayBuffer();
  const payload = JSON.parse(new TextDecoder().decode(payloadBuffer)) as {
    ok?: boolean;
    user?: { activeRole?: string; roles?: string[] };
  };
  const issuedCookies = getSetCookieHeaders(backend.headers);
  const isPublicWebsiteUser = Boolean(
    backend.ok &&
      payload.ok &&
      payload.user?.activeRole === "User" &&
      payload.user.roles?.includes("User"),
  );

  if (backend.ok && payload.ok && !isPublicWebsiteUser) {
    await revokeTemporarySession(issuedCookies, request);
  }

  const response = new Response(payloadBuffer, {
    status: backend.status,
    headers: {
      "content-type": backend.headers.get("content-type") ?? "application/json",
    },
  });
  const retryAfter = backend.headers.get("retry-after");
  if (retryAfter) response.headers.set("retry-after", retryAfter);
  if (isPublicWebsiteUser) {
    for (const value of issuedCookies) {
      response.headers.append("set-cookie", value);
    }
  }
  return response;
}
