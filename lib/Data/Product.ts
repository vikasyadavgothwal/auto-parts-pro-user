import type {
  ProductHighlight,
  ProductOffer,

} from "@/types/site/product";
import {
  CheckCircleIcon,
  ShieldIcon,
  TruckIcon
} from "@/components/icons/site-icons";
export const productImages = [
  "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&h=1200&fit=crop",
];

export const keyFeatures = [
  "Premium ceramic formula for consistent braking",
  "Multi-layered shims reduce noise and vibration",
  "Low dust formula keeps wheels cleaner",
  "Hardware kit included",
  "Backed by Bosch Limited Lifetime Warranty",
];

export const highlights: ProductHighlight[] = [
  { icon: CheckCircleIcon, label: "OEM Quality" },
  { icon: TruckIcon, label: "Fast Shipping" },
  { icon: ShieldIcon, label: "Warranty" },
];

export const offers: ProductOffer[] = [
  {
    seller: "Bosch Direct",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    rating: 4.9,
    reviews: 2340,
    price: "$124.99",
    condition: "New - OEM",
    stock: "In Stock",
    shipping: "Free 2-Day",
    shippingTime: "2 days",
    recommended: true,
  },
  {
    seller: "AutoZone Pro",
    logo: "https://images.unsplash.com/photo-1557821552-17105176677c?w=200&h=200&fit=crop",
    rating: 4.8,
    reviews: 1892,
    price: "$128.50",
    condition: "New - OEM",
    stock: "In Stock",
    shipping: "Express Delivery",
    shippingTime: "3 days",
    recommended: false,
  },
  {
    seller: "PartsHub Motors",
    logo: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=200&h=200&fit=crop",
    rating: 4.7,
    reviews: 1148,
    price: "$119.90",
    condition: "New - Aftermarket",
    stock: "Limited Stock",
    shipping: "Standard Shipping",
    shippingTime: "4 days",
    recommended: false,
  },
  {
    seller: "Prime Auto Supply",
    logo: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=200&h=200&fit=crop",
    rating: 4.6,
    reviews: 906,
    price: "$132.00",
    condition: "New - OEM",
    stock: "In Stock",
    shipping: "Priority Delivery",
    shippingTime: "1 day",
    recommended: false,
  },
];