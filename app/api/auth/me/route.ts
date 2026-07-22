import type { NextRequest } from "next/server"

const accessCookieName =
  process.env.USER_ACCESS_COOKIE_NAME ?? "user_access_token"
const refreshCookieName =
  process.env.USER_REFRESH_COOKIE_NAME ?? "user_refresh_token"

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

const cookieDomainForRequest = (request: NextRequest) => {
  const configuredDomain = process.env.USER_COOKIE_DOMAIN?.trim()
  if (configuredDomain) return configuredDomain

  const hostname = request.nextUrl.hostname.toLowerCase()
  return hostname.endsWith(".websitedesignersdubai.ae")
    ? ".websitedesignersdubai.ae"
    : ""
}

const clearUserCookieValues = (request: NextRequest) => {
  const domain = cookieDomainForRequest(request)
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
  const domainAttribute = domain ? `; Domain=${domain}` : ""

  return [accessCookieName, refreshCookieName].map(
    (name) =>
      `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${secure}${domainAttribute}`,
  )
}

export async function GET(request: NextRequest) {
  const hasAccessSession = Boolean(request.cookies.get(accessCookieName)?.value)
  const hasRefreshSession = Boolean(request.cookies.get(refreshCookieName)?.value)

  if (!hasAccessSession && !hasRefreshSession) {
    return Response.json({
      ok: true,
      authenticated: false,
      user: null,
    })
  }

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
    const mainResponse = Response.json({
      ok: true,
      authenticated: false,
      user: null,
    })
    for (const value of clearUserCookieValues(request)) {
      mainResponse.headers.append("set-cookie", value)
    }
    return mainResponse
  }

  return new Response(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  })
}
