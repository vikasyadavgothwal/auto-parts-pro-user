import { getMainWebsiteSiteSettings } from "@/lib/site-settings"
import { isPublicS3AssetKey, resolveSiteImageSrc } from "@/lib/site-image"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

const PUBLIC_ASSET_PATH = "/api/v1/user/public-asset"
const fallbackFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#dc2626"/><path fill="#fff" d="M18 39h28l-3-12H21l-3 12Zm5.5 8a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm17 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9ZM24 22h16l2 5H22l2-5Z"/></svg>`
const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "")

const getBackendBaseUrl = () =>
  (
    process.env.NEXT_PUBLIC_PRIVATE_BACKEND_URL?.trim() ||
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    ""
  ).replace(/\/+$/, "")

const fallbackResponse = () =>
  new Response(fallbackFavicon, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=3600",
    },
  })

export async function GET(request: NextRequest) {
  const settings = await getMainWebsiteSiteSettings()
  const backendBaseUrl = getBackendBaseUrl()
  const faviconKey = settings.faviconKey.trim()
  let faviconSrc = ""

  if (isPublicS3AssetKey(faviconKey) && backendBaseUrl) {
    const url = new URL(PUBLIC_ASSET_PATH, trimTrailingSlash(backendBaseUrl))
    url.searchParams.set("key", faviconKey)
    faviconSrc = url.toString()
  } else if (settings.faviconUrl.trim()) {
    faviconSrc = resolveSiteImageSrc(settings.faviconUrl, "")
  }

  if (!faviconSrc) {
    return fallbackResponse()
  }

  try {
    const response = await fetch(new URL(faviconSrc, request.url), { cache: "no-store" })
    if (!response.ok || !response.body) {
      return fallbackResponse()
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "content-type": response.headers.get("content-type") ?? "image/x-icon",
        "cache-control": "public, max-age=60, stale-while-revalidate=300",
      },
    })
  } catch {
    return fallbackResponse()
  }
}
