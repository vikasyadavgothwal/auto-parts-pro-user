const backendUrl = (request: Request) => {
  const source = new URL(request.url)
  const baseUrl =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim()

  if (!baseUrl) {
    throw new Error(
      "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL.",
    )
  }

  const url = new URL("/api/v1/public/garages", baseUrl)
  url.search = source.search
  return url
}

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const response = await fetch(backendUrl(request), {
    method: "GET",
    cache: "no-store",
    headers: { accept: "application/json" },
  })

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  })
}
