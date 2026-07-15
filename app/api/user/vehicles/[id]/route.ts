const backendUrl = async (
  request: Request,
  context: { params: Promise<{ id: string }> },
) => {
  const { id } = await context.params;
  const baseUrl =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

  if (!baseUrl) {
    throw new Error(
      "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL.",
    );
  }

  const source = new URL(request.url);
  const url = new URL(`/api/v1/user/vehicles/${id}`, baseUrl);
  url.search = source.search;
  return url;
};

async function forward(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const headers = new Headers({ accept: "application/json" });
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);

  const response = await fetch(await backendUrl(request, context), {
    method: request.method,
    cache: "no-store",
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer(),
  });

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    headers: {
      "content-type":
        response.headers.get("content-type") ?? "application/json",
    },
  });
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
