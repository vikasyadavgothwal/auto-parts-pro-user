const backendUrl = () => {
  const baseUrl =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

  if (!baseUrl) {
    throw new Error(
      "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL.",
    )
  }

  return new URL("/api/v1/user/auth/me", baseUrl)
}

export const dynamic = "force-dynamic"

const getSetCookieHeaders = (headers: Headers): string[] => {
  const enhancedHeaders = headers as Headers & { getSetCookie?: () => string[] }
  return enhancedHeaders.getSetCookie?.() ?? (headers.get("set-cookie") ? [headers.get("set-cookie")!] : [])
}

export async function GET(request: Request) {
  const headers = new Headers({ accept: "application/json" })
  const cookie = request.headers.get("cookie")
  if (cookie) headers.set("cookie", cookie)

  const response = await fetch(backendUrl(), {
    method: "GET",
    cache: "no-store",
    headers,
  })

  const body = await response.arrayBuffer()
  const payload = JSON.parse(new TextDecoder().decode(body)) as {
    ok?: boolean
    user?: { activeRole?: string; roles?: string[] }
  }
  const isPublicWebsiteUser = Boolean(
    response.ok &&
      payload.ok &&
      payload.user?.activeRole === "User" &&
      payload.user.roles?.includes("User"),
  )

  if (response.ok && payload.ok && !isPublicWebsiteUser) {
    const logoutResponse = await fetch(new URL("/api/v1/user/auth/logout", backendUrl()), {
      method: "POST",
      cache: "no-store",
      headers: {
        accept: "application/json",
        ...(cookie ? { cookie } : {}),
      },
    })
    const clearedResponse = Response.json(
      { ok: false, success: false, message: "Use your role dashboard to sign in." },
      { status: 401 },
    )
    for (const value of getSetCookieHeaders(logoutResponse.headers)) {
      clearedResponse.headers.append("set-cookie", value)
    }
    return clearedResponse
  }

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  })
}
