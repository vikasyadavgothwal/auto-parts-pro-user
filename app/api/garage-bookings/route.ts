import { proxyToBackend } from "@/lib/backend-proxy"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  return proxyToBackend(request, "/api/v1/public/garage-bookings")
}

export async function POST(request: Request) {
  return proxyToBackend(request, "/api/v1/public/garage-bookings")
}
