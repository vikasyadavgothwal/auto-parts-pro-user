import { NextRequest, NextResponse } from "next/server"

import { isPublicS3AssetKey } from "@/lib/site-image"

const PUBLIC_ASSET_PATH = "/api/v1/user/public-asset"
const CACHE_CONTROL = "public, max-age=31536000, immutable"

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "")

const getBackendBaseUrl = () => {
  const value =
    process.env.NEXT_PUBLIC_PRIVATE_BACKEND_URL?.trim() ||
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    process.env.BACKEND_URL?.trim()

  return value ? trimTrailingSlash(value) : ""
}

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key")?.trim() ?? ""

  if (!isPublicS3AssetKey(key)) {
    return NextResponse.json({ ok: false, message: "Asset not found." }, { status: 404 })
  }

  const backendBaseUrl = getBackendBaseUrl()
  if (!backendBaseUrl) {
    return NextResponse.json({ ok: false, message: "Backend URL is not configured." }, { status: 503 })
  }

  const assetUrl = new URL(PUBLIC_ASSET_PATH, backendBaseUrl)
  assetUrl.searchParams.set("key", key)

  try {
    const response = await fetch(assetUrl, { cache: "force-cache" })
    if (!response.ok || !response.body) {
      return NextResponse.json({ ok: false, message: "Asset not found." }, { status: 404 })
    }

    const headers = new Headers({
      "content-type": response.headers.get("content-type") ?? "application/octet-stream",
      "cache-control": response.headers.get("cache-control") ?? CACHE_CONTROL,
    })
    const contentLength = response.headers.get("content-length")
    if (contentLength) headers.set("content-length", contentLength)

    return new Response(response.body, { status: 200, headers })
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to load asset." }, { status: 502 })
  }
}
