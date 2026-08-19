import { fetchPublicContentBySlug, type PublicContentSlug } from "@/lib/public-content"
import { getMainWebsiteSiteSettings } from "@/lib/site-settings"

const configuredWebsiteOrigin =
  process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim()
const publicWebsiteOrigin = (
  process.env.NODE_ENV === "production"
    ? configuredWebsiteOrigin || "https://websitedesignersdubai.ae"
    : process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL?.trim() || "http://localhost:3001"
).replace(/\/+$/, "")

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    "\"": "&quot;",
  })[character] ?? character)

const publicPages: Array<{ path: string; contentSlug?: PublicContentSlug }> = [
  { path: "/", contentSlug: "home" },
  { path: "/search" },
  { path: "/rfq", contentSlug: "rfq" },
  { path: "/services", contentSlug: "services" },
  { path: "/business", contentSlug: "for-business" },
  { path: "/suppliers", contentSlug: "suppliers" },
  { path: "/booking" },
  { path: "/privacy-policy", contentSlug: "privacy-policy" },
  { path: "/terms-of-services", contentSlug: "terms-of-services" },
  { path: "/cookies-settings", contentSlug: "cookies-settings" },
  { path: "/developers/api" },
]

export const dynamic = "force-dynamic"

export async function GET() {
  const siteSettings = await getMainWebsiteSiteSettings()
  const contentBySlug = new Map(
    await Promise.all(
      publicPages
        .flatMap((page) => page.contentSlug ? [page.contentSlug] : [])
        .map(async (slug) => {
          try {
            return [slug, await fetchPublicContentBySlug(slug, { cache: "no-store" })] as const
          } catch {
            return [slug, null] as const
          }
        }),
    ),
  )
  const urls = publicPages
    .filter((page) => {
      if (siteSettings.seo.noIndex) return false
      return !page.contentSlug || !contentBySlug.get(page.contentSlug)?.seo.noIndex
    })
    .map((page) => `  <url><loc>${escapeXml(`${publicWebsiteOrigin}${page.path}`)}</loc></url>`)
    .join("\n")
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  })
}
