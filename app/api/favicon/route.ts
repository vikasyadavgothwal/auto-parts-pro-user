import { getMainWebsiteSiteSettings } from "@/lib/site-settings"

export const dynamic = "force-dynamic"

export async function GET() {
  const settings = await getMainWebsiteSiteSettings()
  if (!settings.faviconUrl) {
    return new Response(null, {
      status: 404,
      headers: { "cache-control": "no-store, max-age=0" },
    })
  }

  try {
    const response = await fetch(settings.faviconUrl, { cache: "no-store" })
    if (!response.ok || !response.body) {
      return new Response(null, { status: 404, headers: { "cache-control": "no-store, max-age=0" } })
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "content-type": response.headers.get("content-type") ?? "image/x-icon",
        "cache-control": "no-store, max-age=0",
      },
    })
  } catch {
    return new Response(null, { status: 404, headers: { "cache-control": "no-store, max-age=0" } })
  }
}
