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

  return new URL("/api/v1/public/business-queries", baseUrl)
}

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const headers = new Headers({ accept: "application/json" })
  const contentType = request.headers.get("content-type")
  if (contentType) headers.set("content-type", contentType)

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
