import type { LucideIcon } from "lucide-react"

export type ProductHighlight = {
  icon: LucideIcon
  label: string
}

export type ProductOffer = {
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
}

export type RatingStarsProps = {
  rating: number
  size?: string
}
