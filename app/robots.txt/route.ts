import { getMainWebsiteSiteSettings } from "@/lib/site-settings"

export const dynamic = "force-dynamic"

export async function GET() {
  const settings = await getMainWebsiteSiteSettings()
  return new Response(`${settings.robotsTxt.trimEnd()}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}
