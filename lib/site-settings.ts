import { apiInterpreter } from "@/lib/api/client"
import type {
  MainWebsiteSiteSettings,
  MainWebsiteSiteSettingsResponse,
} from "@/types/api/site-settings"

const SITE_SETTINGS_PATH = "/api/v1/user/site-settings"

export const DEFAULT_MAIN_WEBSITE_SITE_SETTINGS: MainWebsiteSiteSettings = {
  siteName: "AutoParts Pro",
  logoUrl: "",
  logoKey: "",
  faviconUrl: "",
  faviconKey: "",
  robotsTxt: [
    "User-agent: *",
    "Allow: /",
    "Disallow: /cart",
    "Disallow: /checkout",
    "Disallow: /dashboard",
    "Disallow: /login",
    "Sitemap: /sitemap.xml",
  ].join("\n"),
  copyright: "© 2026 DALEEL DEALZ ADVERTISING SERVICES - SOLE PROPRIETORSHIP L.L.C.",
  seo: {
    title: "Auto Parts Pro",
    description: "Quality automotive parts, services, and fleet solutions.",
    keywords: "auto parts, car parts, automotive services, fleet solutions",
    canonicalUrl: "",
    noIndex: false,
    noFollow: false,
  },
  social: { facebook: "", instagram: "", x: "", youtube: "", linkedin: "" },
  contact: {
    phone: "+971585008555",
    email: "info@daleeldealz.com",
    address: "Abu Dhabi, Abu Dhabi 147712",
  },
}

export async function getMainWebsiteSiteSettings(): Promise<MainWebsiteSiteSettings> {
  try {
    const response = await apiInterpreter.public<MainWebsiteSiteSettingsResponse>(
      SITE_SETTINGS_PATH,
      { cache: "no-store" },
    )
    return response.ok ? response.settings : DEFAULT_MAIN_WEBSITE_SITE_SETTINGS
  } catch {
    return DEFAULT_MAIN_WEBSITE_SITE_SETTINGS
  }
}
