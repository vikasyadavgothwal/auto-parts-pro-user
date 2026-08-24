import type { NextRequest } from "next/server"
import { getMainWebsiteSiteSettings } from "@/lib/site-settings"

export const dynamic = "force-dynamic"

const getRequestWebsiteOrigin = (request: NextRequest) => {
  const configuredOrigin = [
    process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
  ].find(Boolean)

  const base = (configuredOrigin || request.nextUrl.origin || "").trim().replace(/\/+$/, "")

  return base
}

const normalizeRobotsTxt = (text: string, websiteOrigin: string) => {
  const hasRelativeSitemap = /^Sitemap:\s*\/\S+/im.test(text)

  if (!websiteOrigin || !hasRelativeSitemap) {
    return text.trimEnd()
  }

  return text
    .replace(/^Sitemap:\s*(\/\S+)$/im, (_, sitemapPath) => {
      const normalizedPath = sitemapPath.startsWith("/") ? sitemapPath : `/${sitemapPath}`
      return `Sitemap: ${websiteOrigin}${normalizedPath}`
    })
    .trimEnd()
}

export async function GET(request: NextRequest) {
  const settings = await getMainWebsiteSiteSettings()
  const websiteOrigin = getRequestWebsiteOrigin(request)
  const robotsTxt = normalizeRobotsTxt(settings.robotsTxt, websiteOrigin)

  return new Response(`${robotsTxt}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
