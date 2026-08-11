import { getBackendBaseUrl, streamBackendRequest } from "@shared/backend-proxy"

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
