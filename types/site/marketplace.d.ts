export type MarketplaceBadgeType = "fit" | "likely" | "no"

export type MarketplaceFitment = {
  brand: string | null
  make: string | null
  model: string | null
  series: string | null
  modelYear: number | null
  yearFrom: number | null
  yearTo: number | null
  engine: string | null
  engineNo: string | null
}

export type MarketplaceVendorContent = {
  productName: string
  shortDescription: string | null
  longDescription: string | null
  manufacturerPartNumber: string | null
  status: string | null
  grade: string | null
  condition: string
  features: string[]
}

export type MarketplaceSelectedVendorContent = MarketplaceVendorContent & {
  supplierId: string
  supplierName: string
  vendorSku: string | null
}

export type MarketplaceOffer = {
  id: string
  supplierId: string
  supplierName: string
  supplierLogo: string | null
  vendorSku: string | null
  price: number
  currency: string
  stock: number
  stockLabel: string
  leadTime: string | null
  condition: string
  recommended: boolean
  images: string[]
  content: MarketplaceVendorContent
  warehouseStock: Array<{
    warehouseId: string
    quantity: number
    leadTime: string | null
    lowStockThreshold: number | null
  }>
}

export type MarketplaceProductSummary = {
  partUid: string
  title: string
  partNumber: string | null
  brandName: string | null
  category: string | null
  description: string
  keyFeatures: string[]
  image: string
  images: string[]
  offerCount: number
  totalStock: number
  minPrice: number | null
  currency: string
  badge: string
  badgeType: MarketplaceBadgeType
  fitments: MarketplaceFitment[]
}

export type MarketplaceProductDetail = MarketplaceProductSummary & {
  contentSourceSupplierId: string | null
  selectedVendorContent: MarketplaceSelectedVendorContent | null
  offers: MarketplaceOffer[]
}

export type MarketplaceSearchResponse = {
  ok: true
  searchType: "partNumber" | "vin" | "text"
  query: {
    partNumber: string | null
    vin: string | null
    modelId: string | null
    year: string | null
    make: string | null
    model: string | null
    q: string | null
  }
  count: number
  products: MarketplaceProductSummary[]
}

export type MarketplaceProductResponse =
  | {
      ok: true
      product: MarketplaceProductDetail
    }
  | {
      ok: false
      message: string
    }
