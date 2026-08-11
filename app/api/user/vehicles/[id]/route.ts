import { proxyToBackend } from "@/lib/backend-proxy"

async function forward(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  return proxyToBackend(
    request,
    `/api/v1/user/vehicles/${encodeURIComponent(id)}`,
    { includeSearch: true },
  )
}

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return forward(request, context);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return forward(request, context);
}
