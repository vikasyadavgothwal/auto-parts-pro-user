import type { AppIconComponent } from "@/types/icons"

export type ProductHighlight = {
  icon?: AppIconComponent
  label: string
}

export type ProductOffer = {
  id?: string
  productId?: string
  productTitle?: string
  productImage?: string
  partNumber?: string | null
  vendorSku?: string | null
  seller: string
  logo: string
  rating: number
  reviews: number
  price: string
  unitPrice?: number | null
  currency?: string
  condition: string
  stock: string
  shipping: string
  shippingTime: string
  recommended: boolean
  description?: string | null
}

export type RatingStarsProps = {
  rating: number
  size?: string
}
