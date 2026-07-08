const backendUrl = () =>
  new URL(
    "/api/v1/rfqs",
    process.env.PRIVATE_API_URL?.trim() ||
      process.env.BACKEND_URL?.trim() ||
      process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
      "http://localhost:3000",
  )

export async function POST(request: Request) {
  const headers = new Headers()
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
    headers: { "content-type": response.headers.get("content-type") ?? "application/json" },
  })
}
