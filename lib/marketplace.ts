import type { ProductOffer } from "@/types/site/product"
import type { SearchProduct } from "@/types/site/search"
import type {
  MarketplaceProductDetail,
  MarketplaceProductResponse,
  MarketplaceProductSummary,
  MarketplaceSearchResponse,
} from "@/types/site/marketplace"

const DEFAULT_SUPPLIER_LOGO =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop"

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "")

const getBackendBaseUrl = () => {
  const value =
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    ""

  if (!value) {
    throw new Error("Missing API base URL. Set BACKEND_URL or NEXT_PUBLIC_BACKEND_URL.")
  }

  return trimTrailingSlash(value)
}

const readJsonBody = async (response: Response): Promise<unknown> => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

const buildBackendUrl = (
  path: string,
  params?: Record<string, string | number | null | undefined>,
) => {
  const url = new URL(path, getBackendBaseUrl())

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === null || value === undefined || value === "") {
      continue
    }
    url.searchParams.set(key, String(value))
  }

  return url
}

export const formatPrice = (price: number | null, currency = "AED") =>
  typeof price === "number"
    ? `${currency} ${price.toFixed(2)}`
    : "View offers"

export async function searchMarketplaceProducts(params: {
  partNumber?: string | null
  vin?: string | null
  year?: string | null
  make?: string | null
  model?: string | null
  q?: string | null
  limit?: number
}): Promise<MarketplaceSearchResponse> {
  const response = await fetch(buildBackendUrl("/api/marketplace/search", params), {
    cache: "no-store",
    headers: { Accept: "application/json" },
  })
  const payload = await readJsonBody(response)

  if (!response.ok || !payload || typeof payload !== "object" || !("ok" in payload)) {
    throw new Error("Unable to load marketplace search results")
  }

  return payload as MarketplaceSearchResponse
}

export async function getMarketplaceProduct(
  partUid: string,
): Promise<MarketplaceProductDetail | null> {
  const response = await fetch(
    buildBackendUrl(`/api/marketplace/products/${encodeURIComponent(partUid)}`),
    {
      cache: "no-store",
      headers: { Accept: "application/json" },
    },
  )
  const payload = (await readJsonBody(response)) as MarketplaceProductResponse | null

  if (!response.ok || !payload?.ok) {
    return null
  }

  return payload.product
}

export const marketplaceProductToSearchProduct = (
  product: MarketplaceProductSummary,
): SearchProduct => ({
  id: product.partUid,
  href: `/product/${encodeURIComponent(product.partUid)}`,
  title: product.title,
  partNo: product.partNumber ?? product.brandName ?? product.partUid,
  seller:
    product.offerCount === 1
      ? "1 verified supplier"
      : `${product.offerCount} verified suppliers`,
  price: formatPrice(product.minPrice, product.currency),
  shipping: product.offerCount > 0 ? "Compare offers" : "No live offers",
  rating: "4.8",
  reviews: `(${product.offerCount} offers)`,
  badge: product.badge,
  badgeType: product.badgeType,
  image: product.image,
  images: product.images,
  highlight: product.offerCount > 1,
  highlightLabel: product.offerCount > 1 ? "Compare Vendors" : undefined,
  stockLabel:
    product.totalStock > 0
      ? `${product.totalStock} in stock`
      : product.offerCount === 0
        ? "No supplier stock"
        : undefined,
})

export const marketplaceOffersToProductOffers = (
  product: MarketplaceProductDetail,
): ProductOffer[] =>
  product.offers.map((offer) => ({
    id: offer.id,
    vendorSku: offer.vendorSku,
    seller: offer.supplierName,
    logo: offer.supplierLogo || offer.images[0] || DEFAULT_SUPPLIER_LOGO,
    rating: 4.8,
    reviews: 0,
    price: formatPrice(offer.price, offer.currency),
    condition: offer.condition || "New",
    stock: offer.stockLabel,
    shipping: offer.leadTime ? "Supplier lead time" : "Supplier delivery",
    shippingTime: offer.leadTime || "Confirm at checkout",
    recommended: offer.recommended,
    description:
      offer.content.longDescription ||
      offer.content.shortDescription ||
      null,
  }))
