export type SearchProductBadgeType = "fit" | "likely" | "no"

export type SearchProduct = {
  id: string | number
  href: string
  title: string
  partNo: string
  seller: string
  price: string
  shipping: string
  rating: string
  reviews: string
  badge: string
  badgeType: SearchProductBadgeType
  image: string
  images?: string[]
  highlight: boolean
  highlightLabel?: string
  stockLabel?: string
  brandName?: string | null
  unitPrice?: number | null
  totalStock?: number
  offerCount?: number
}
