export type Supplier = {
  id: number
  name: string
  image: string
  location: string
  responseTime: string
  rating: number
  reviews: string
  specialties: string[]
  trustScore: number
  ordersCompleted: string
  verified: boolean
  topRated: boolean
  href: string
}

export type SupplierProduct = {
  id: number
  name: string
  partNumber: string
  condition: string
  price: string
  offers?: string
  image: string
  href: string
  confirmedFit?: boolean
}
