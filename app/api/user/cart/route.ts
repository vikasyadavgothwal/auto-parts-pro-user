import { proxyToBackend } from "@/lib/backend-proxy"

async function forward(request: Request) {
  return proxyToBackend(request, "/api/v1/user/cart")
}

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  return forward(request)
}

export async function PUT(request: Request) {
  return forward(request)
}

export async function DELETE(request: Request) {
  return forward(request)
}
