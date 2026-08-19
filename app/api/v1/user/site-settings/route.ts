import { NextResponse } from "next/server"

import { getMainWebsiteSiteSettings } from "@/lib/site-settings"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    return NextResponse.json({ ok: true, settings: await getMainWebsiteSiteSettings() })
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to load website settings" }, { status: 500 })
  }
}
