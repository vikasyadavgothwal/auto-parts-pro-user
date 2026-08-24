import type {
  PublicGarageDetail,
  PublicGarageDetailResponse,
  PublicGarageListResponse,
} from "@/types/site/garages"

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "")

const getBackendBaseUrl = () => {
  const value =
    process.env.PRIVATE_API_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_PRIVATE_BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    ""

  if (!value) {
    throw new Error(
      "Missing API base URL. Set PRIVATE_API_URL, BACKEND_URL, NEXT_PUBLIC_PRIVATE_BACKEND_URL, or NEXT_PUBLIC_BACKEND_URL.",
    )
  }

  return trimTrailingSlash(value)
}

const buildBackendUrl = (
  path: string,
  params?: Record<string, string | number | null | undefined>,
) => {
  const url = new URL(path, getBackendBaseUrl())
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === null || value === undefined || value === "") continue
    url.searchParams.set(key, String(value))
  }
  return url
}

const readJsonBody = async (response: Response): Promise<unknown> => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function listPublicGarages(params: {
  q?: string | null
  service?: string | null
  location?: string | null
  page?: string | number | null
  pageSize?: string | number | null
}): Promise<PublicGarageListResponse> {
  const response = await fetch(buildBackendUrl("/api/v1/public/garages", params), {
    cache: "no-store",
    headers: { accept: "application/json" },
  })
  const payload = (await readJsonBody(response)) as PublicGarageListResponse | null

  if (!response.ok || !payload?.ok) {
    throw new Error("Unable to load garages")
  }

  return payload
}

export async function listAllPublicGarages(params: {
  q?: string | null
  service?: string | null
  location?: string | null
  pageSize?: string | number | null
}): Promise<PublicGarageListResponse> {
  const firstPage = await listPublicGarages({
    ...params,
    page: 1,
    pageSize: params.pageSize ?? 5,
  })

  const remainingPages =
    firstPage.pagination.totalPages > 1
      ? await Promise.all(
          Array.from(
            { length: firstPage.pagination.totalPages - 1 },
            (_, index) =>
              listPublicGarages({
                ...params,
                page: String(index + 2),
                pageSize: firstPage.pagination.pageSize,
              }),
          ),
        )
      : []

  return {
    ok: true,
    garages: [
      ...firstPage.garages,
      ...remainingPages.flatMap((pageResponse) => pageResponse.garages),
    ],
    pagination: {
      page: 1,
      pageSize: Math.max(1, firstPage.pagination.total),
      total: firstPage.pagination.total,
      totalPages: 1,
    },
  }
}

export async function getPublicGarage(
  garageId: string,
): Promise<PublicGarageDetail | null> {
  const response = await fetch(
    buildBackendUrl(`/api/v1/public/garages/${encodeURIComponent(garageId)}`),
    {
      cache: "no-store",
      headers: { accept: "application/json" },
    },
  )
  const payload = (await readJsonBody(response)) as PublicGarageDetailResponse | null

  if (!response.ok || !payload?.ok) {
    return null
  }

  return payload.garage
}

export const formatGaragePrice = (
  price: number | null,
  currency = "AED",
) =>
  typeof price === "number"
    ? `${currency} ${Math.round(price / 100)}`
    : "Contact garage"
