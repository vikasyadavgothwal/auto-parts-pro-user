import { getMainWebsiteSiteSettings } from "@/lib/site-settings"
import { resolvePublicS3AssetSrc } from "@/lib/site-image"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

const fallbackFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#dc2626"/><path fill="#fff" d="M18 39h28l-3-12H21l-3 12Zm5.5 8a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm17 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9ZM24 22h16l2 5H22l2-5Z"/></svg>`

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
  const faviconSrc = resolvePublicS3AssetSrc(
    settings.faviconKey,
    settings.faviconUrl,
    "",
  )

  if (!faviconSrc) {
    return fallbackResponse()
  }

  try {
    const response = await fetch(new URL(faviconSrc, request.url), { cache: "force-cache" })
    if (!response.ok || !response.body) {
      return fallbackResponse()
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "content-type": response.headers.get("content-type") ?? "image/x-icon",
        "cache-control": response.headers.get("cache-control") ?? "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return fallbackResponse()
  }
}
