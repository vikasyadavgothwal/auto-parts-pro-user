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

const BACKEND_ACCESS_COOKIE =
  process.env.USER_ACCESS_COOKIE_NAME ?? "user_access_token";
const BACKEND_REFRESH_COOKIE =
  process.env.USER_REFRESH_COOKIE_NAME ?? "user_refresh_token";

const dashboardCookieNames: Record<string, { access: string; refresh: string }> =
  {
    Fleet: {
      access: "fleet_access_token",
      refresh: "fleet_refresh_token",
    },
    Garage: {
      access: "garage_access_token",
      refresh: "garage_refresh_token",
    },
    Supplier: {
      access: "supplier_access_token",
      refresh: "supplier_refresh_token",
    },
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

const setCookieName = (value: string) => {
  const separator = value.indexOf("=");
  return separator > 0 ? value.slice(0, separator) : value;
};

const rewriteSetCookieName = (value: string, nextName: string) => {
  const separator = value.indexOf("=");
  if (separator <= 0) return value;
  return `${nextName}${value.slice(separator)}`;
};

const dashboardCookiesForRole = (values: string[], role: string | undefined) => {
  const names = role ? dashboardCookieNames[role] : undefined;
  if (!names) return [];

  return values
    .map((value) => {
      const name = setCookieName(value);
      if (name === BACKEND_ACCESS_COOKIE) {
        return rewriteSetCookieName(value, names.access);
      }
      if (name === BACKEND_REFRESH_COOKIE) {
        return rewriteSetCookieName(value, names.refresh);
      }
      return null;
    })
    .filter((value): value is string => Boolean(value));
};

const cookieDomainForRequest = (request: Request) => {
  const configuredDomain = process.env.USER_COOKIE_DOMAIN?.trim();
  if (configuredDomain) return configuredDomain;

  const hostname = new URL(request.url).hostname.toLowerCase();
  return hostname.endsWith(".websitedesignersdubai.ae")
    ? ".websitedesignersdubai.ae"
    : "";
};

const clearUserCookieValues = (request: Request) => {
  const domain = cookieDomainForRequest(request);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const domainAttribute = domain ? `; Domain=${domain}` : "";

  return [BACKEND_ACCESS_COOKIE, BACKEND_REFRESH_COOKIE].map(
    (name) =>
      `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${secure}${domainAttribute}`,
  );
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
  const response = new Response(payloadBuffer, {
    status: backend.status,
    headers: {
      "content-type": backend.headers.get("content-type") ?? "application/json",
    },
  });
  const retryAfter = backend.headers.get("retry-after");
  if (retryAfter) response.headers.set("retry-after", retryAfter);
  if (backend.ok && payload.ok) {
    const role = payload.user?.activeRole;
    const isPublicWebsiteUser =
      role === "User" && payload.user?.roles?.includes("User");
    const cookiesToSet = isPublicWebsiteUser
      ? issuedCookies
      : [
          ...dashboardCookiesForRole(issuedCookies, role),
          ...clearUserCookieValues(request),
        ];

    for (const value of cookiesToSet) {
      response.headers.append("set-cookie", value);
    }
  }
  return response;
}
