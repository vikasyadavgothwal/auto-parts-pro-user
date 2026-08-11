import { proxyToBackend } from "@/lib/backend-proxy"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  return proxyToBackend(request, "/api/v1/public/business-queries")
}
