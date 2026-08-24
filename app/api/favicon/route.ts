import { getMainWebsiteSiteSettings } from "@/lib/site-settings"
import { resolvePublicS3AssetSrc } from "@/lib/site-image"
import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const settings = await getMainWebsiteSiteSettings()
  const faviconSrc = resolvePublicS3AssetSrc(
    settings.faviconKey,
    settings.faviconUrl,
    "",
  )

  if (!faviconSrc) {
    return new Response(null, {
      status: 404,
      headers: { "cache-control": "no-store, max-age=0" },
    })
  }

  try {
    const response = await fetch(new URL(faviconSrc, request.url), { cache: "force-cache" })
    if (!response.ok || !response.body) {
      return new Response(null, { status: 404, headers: { "cache-control": "no-store, max-age=0" } })
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "content-type": response.headers.get("content-type") ?? "image/x-icon",
        "cache-control": response.headers.get("cache-control") ?? "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return new Response(null, { status: 404, headers: { "cache-control": "no-store, max-age=0" } })
  }
}
