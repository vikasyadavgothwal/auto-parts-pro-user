const backendUrl = () => {
  const baseUrl =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

  if (!baseUrl) {
    throw new Error(
      "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL.",
    )
  }

  return new URL("/api/v1/public/garage-bookings", baseUrl)
}

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const source = new URL(request.url)
  const url = backendUrl()
  url.search = source.search
  const response = await fetch(url, { method: "GET", cache: "no-store", headers: { accept: "application/json" } })
  return new Response(await response.arrayBuffer(), {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") ?? "application/json" },
  })
}

export async function POST(request: Request) {
  const headers = new Headers({ accept: "application/json" })
  const contentType = request.headers.get("content-type")
  const cookie = request.headers.get("cookie")
  if (contentType) headers.set("content-type", contentType)
  if (cookie) headers.set("cookie", cookie)

  const response = await fetch(backendUrl(), {
    method: "POST",
    cache: "no-store",
    headers,
    body: await request.arrayBuffer(),
  })

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  })
}
