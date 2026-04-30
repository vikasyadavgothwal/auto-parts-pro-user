import type {
  ProductHighlight,
  ProductOffer,
} from "@/types/site/product";
import {
  CheckCircleIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/icons/site-icons";

export const productImages = [
  "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&h=1200&fit=crop",
] as const;

export const keyFeatures = [
  "Premium ceramic formula for consistent braking",
  "Multi-layered shims reduce noise and vibration",
  "Low dust formula keeps wheels cleaner",
  "Hardware kit included",
  "Backed by Bosch Limited Lifetime Warranty",
] as const;

export const highlights: ProductHighlight[] = [
  {  label: "OEM Quality" , svg  : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73Z" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 22V12" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.29004 7L12 12L20.71 7" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 4.27002L16.5 9.42002" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
` },
  { icon: TruckIcon, label: "Fast Shipping" },
  { icon: ShieldIcon, label: "Warranty" },
];

export const offers: ProductOffer[] = [
  {
    seller: "Bosch Direct",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    rating: 4.9,
    reviews: 2340,
    price: "AED 124.99",
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
    price: "AED 128.50",
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
    price: "AED 119.90",
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
    price: "AED 132.00",
    condition: "New - OEM",
    stock: "In Stock",
    shipping: "Priority Delivery",
    shippingTime: "1 day",
    recommended: false,
  },
];
