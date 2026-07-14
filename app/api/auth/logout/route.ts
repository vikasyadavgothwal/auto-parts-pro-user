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

  return new URL("/api/v1/user/auth/logout", baseUrl);
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

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const headers = new Headers({ accept: "application/json" });
  const cookie = request.headers.get("cookie");
  const origin = request.headers.get("origin");
  if (cookie) headers.set("cookie", cookie);
  if (origin) headers.set("origin", origin);

  const backend = await fetch(backendUrl(), {
    method: "POST",
    cache: "no-store",
    headers,
  });

  const response = new Response(await backend.arrayBuffer(), {
    status: backend.status,
    headers: {
      "content-type": backend.headers.get("content-type") ?? "application/json",
    },
  });
  for (const value of getSetCookieHeaders(backend.headers)) {
    response.headers.append("set-cookie", value);
  }
  return response;
}
