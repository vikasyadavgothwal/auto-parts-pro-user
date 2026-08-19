import { proxyToBackend } from "@/lib/backend-proxy"

export const dynamic = "force-dynamic"

type RouteContext = {
  params: Promise<{ path: string[] }>
}

async function forward(request: Request, context: RouteContext) {
  const { path } = await context.params
  const endpoint = path.map(encodeURIComponent).join("/")

  return proxyToBackend(request, `/api/v1/developer/${endpoint}`)
}

export async function GET(request: Request, context: RouteContext) {
  return forward(request, context)
}

export async function POST(request: Request, context: RouteContext) {
  return forward(request, context)
}

export async function PUT(request: Request, context: RouteContext) {
  return forward(request, context)
}

export async function PATCH(request: Request, context: RouteContext) {
  return forward(request, context)
}

export async function DELETE(request: Request, context: RouteContext) {
  return forward(request, context)
}
