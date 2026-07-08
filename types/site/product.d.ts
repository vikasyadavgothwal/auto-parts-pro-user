import type { AppIconComponent } from "@/types/icons"

export type ProductHighlight = {
  icon?: AppIconComponent
  label: string
  svg?: string
}

export type ProductOffer = {
  id?: string
  vendorSku?: string | null
  seller: string
  logo: string
  rating: number
  reviews: number
  price: string
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
