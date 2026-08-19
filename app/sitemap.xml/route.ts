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

const publicPaths = [
  "/",
  "/search",
  "/rfq",
  "/services",
  "/business",
  "/suppliers",
  "/booking",
  "/privacy",
  "/terms",
  "/cookies-settings",
  "/developers/api",
]

export const dynamic = "force-dynamic"

export async function GET() {
  const urls = publicPaths
    .map((path) => `  <url><loc>${escapeXml(`${publicWebsiteOrigin}${path}`)}</loc></url>`)
    .join("\n")
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  })
}
