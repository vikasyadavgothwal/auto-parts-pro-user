import { proxyToBackend } from "@/lib/backend-proxy"

export const dynamic = "force-dynamic"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params
  return proxyToBackend(request, `/api/v1/payments/${encodeURIComponent(id)}/status`)
}
