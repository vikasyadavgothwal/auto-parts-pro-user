const DEFAULT_PROXY_TIMEOUT_MS = 10_000

type TimeoutRequestInit = RequestInit & {
  timeoutMs?: number
}

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: TimeoutRequestInit = {},
): Promise<Response> {
  const { timeoutMs = DEFAULT_PROXY_TIMEOUT_MS, signal, ...requestInit } = init
  if (signal) {
    return fetch(input, { ...requestInit, signal })
  }

  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(new Error("Backend request timed out")),
    timeoutMs,
  )

  try {
    return await fetch(input, { ...requestInit, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

const getBackendBaseUrl = ({
  envNames,
  missingMessage,
}: {
  envNames: readonly string[]
  missingMessage: string
}) => {
  for (const name of envNames) {
    const value = process.env[name]?.trim()
    if (value) return value
  }

  throw new Error(missingMessage)
}

const getSetCookieHeaders = (headers: Headers): string[] => {
  const enhancedHeaders = headers as Headers & {
    getSetCookie?: () => string[]
  }
  const values = enhancedHeaders.getSetCookie?.()
  if (values?.length) return values

  const combinedValue = headers.get("set-cookie")
  return combinedValue ? [combinedValue] : []
}

const streamBackendRequest = async ({
  request,
  backendUrl,
  method: requestedMethod,
  responseContentTypeFallback = "application/json",
  responseHeaders,
  includeSetCookie = false,
}: {
  request: Request
  backendUrl: URL
  method?: string
  responseContentTypeFallback?: string
  responseHeaders?: HeadersInit
  includeSetCookie?: boolean
}) => {
  const method = (requestedMethod ?? request.method).toUpperCase()
  const headers = new Headers({ accept: "application/json" })
  const contentType = request.headers.get("content-type")
  const cookie = request.headers.get("cookie")
  const authorization = request.headers.get("authorization")
  const apiKey = request.headers.get("x-api-key")
  const idempotencyKey = request.headers.get("idempotency-key")
  const userAgent = request.headers.get("user-agent")
  const forwardedFor = request.headers.get("x-forwarded-for")

  if (contentType) headers.set("content-type", contentType)
  if (cookie) headers.set("cookie", cookie)
  if (authorization) headers.set("authorization", authorization)
  if (apiKey) headers.set("x-api-key", apiKey)
  if (idempotencyKey) headers.set("idempotency-key", idempotencyKey)
  if (userAgent) headers.set("user-agent", userAgent)
  if (forwardedFor) headers.set("x-forwarded-for", forwardedFor)

  let body: ArrayBuffer | undefined
  try {
    if (method !== "GET" && method !== "HEAD") {
      body = await request.arrayBuffer()
    }
  } catch {
    return Response.json(
      { ok: false, message: "Backend unavailable" },
      { status: 503 },
    )
  }

  let backendResponse: Response
  try {
    backendResponse = await fetchWithTimeout(backendUrl, {
      method,
      cache: "no-store",
      headers,
      body,
    })
  } catch {
    return Response.json(
      { ok: false, message: "Backend unavailable" },
      { status: 503 },
    )
  }

  const proxyHeaders = new Headers(responseHeaders)
  if (!proxyHeaders.has("content-type")) {
    proxyHeaders.set(
      "content-type",
      backendResponse.headers.get("content-type") ?? responseContentTypeFallback,
    )
  }

  const response = new Response(backendResponse.body, {
    status: backendResponse.status,
    headers: proxyHeaders,
  })

  if (includeSetCookie) {
    for (const value of getSetCookieHeaders(backendResponse.headers)) {
      response.headers.append("set-cookie", value)
    }
  }

  return response
}

const BACKEND_URL_ENVS = [
  "PRIVATE_API_URL",
  "BACKEND_URL",
  "NEXT_PUBLIC_BACKEND_URL",
] as const

const MISSING_BACKEND_URL_MESSAGE =
  "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL."

const getBackendBase = () =>
  getBackendBaseUrl({
    envNames: BACKEND_URL_ENVS,
    missingMessage: MISSING_BACKEND_URL_MESSAGE,
  })

export type PublicBackendProxyOptions = {
  method?: string
  includeSearch?: boolean
  responseHeaders?: HeadersInit
  responseContentTypeFallback?: string
  includeSetCookie?: boolean
}

export async function proxyToBackend(
  request: Request,
  path: string,
  options: PublicBackendProxyOptions = {},
): Promise<Response> {
  const {
    method,
    includeSearch = true,
    responseHeaders,
    responseContentTypeFallback,
    includeSetCookie = false,
  } = options

  const baseUrl = getBackendBase()
  const backendUrl = new URL(path, baseUrl)

  if (includeSearch) {
    const sourceUrl = new URL(request.url)
    backendUrl.search = sourceUrl.search
  }

  return streamBackendRequest({
    request,
    backendUrl,
    method,
    responseHeaders,
    responseContentTypeFallback,
    includeSetCookie,
  })
}
