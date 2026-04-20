export const services = [
  {
    title: "Oil Change & Filter",
    description: "Complete oil change with premium synthetic oil and new filter",
    duration: "30 min",
    price: "$49.99",
    popular: true,
  },
  {
    title: "Brake Pad Replacement",
    description: "Front or rear brake pad replacement with inspection",
    duration: "2 hours",
    price: "$199.99",
    popular: true,
  },
  {
    title: "Tire Rotation & Balance",
    description: "Four-wheel rotation and computerized balancing",
    duration: "45 min",
    price: "$69.99",
    popular: false,
  },
  {
    title: "Engine Diagnostics",
    description: "Comprehensive computer diagnostics with detailed report",
    duration: "1 hour",
    price: "$89.99",
    popular: true,
  },
  {
    title: "Battery Service",
    description: "Battery testing, cleaning, and replacement if needed",
    duration: "30 min",
    price: "$129.99",
    popular: false,
  },
  {
    title: "AC Service & Recharge",
    description: "Complete AC system check and refrigerant recharge",
    duration: "1.5 hours",
    price: "$149.99",
    popular: false,
  },
];
export const reviews = [
  {
    name: "John Smith",
    service: "Brake Pad Replacement",
    date: "March 15, 2026",
    rating: 5,
    content:
      "Excellent service! The team was professional and completed the work ahead of schedule. My car drives like new. Highly recommend!",
    helpful: 24,
  },
  {
    name: "Sarah Johnson",
    service: "Oil Change & Filter",
    date: "March 10, 2026",
    rating: 5,
    content:
      "Fast and efficient. They explained everything clearly and the waiting area was comfortable. Will definitely come back.",
    helpful: 18,
  },
  {
    name: "Michael Chen",
    service: "Engine Diagnostics",
    date: "March 5, 2026",
    rating: 4,
    content:
      "Good diagnostic service. Found the issue quickly and provided detailed explanation. Only minor wait time.",
    helpful: 12,
  },
];
export const certifications = ["ASE Certified", "AAA Approved", "Bosch Service"];
export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
    alt: "Gallery 1",
  },
  {
    src: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    alt: "Gallery 2",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    alt: "Gallery 3",
  },
];
export const garages = [
  {
    id: "1",
    title: "Premium Auto Care",
    rating: "4.9",
    reviews: "328",
    price: "$49.99",
    distance: "2.3 miles away",
    address: "1234 Main St, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1632053002928-c6c8763bb0c0?w=400&h=300&fit=crop",
    specialties: ["Brake Service", "Engine Diagnostics", "Oil Change"],
  },
  {
    id: "2",
    title: "AutoTech Pro",
    rating: "4.8",
    reviews: "512",
    price: "$44.99",
    distance: "3.7 miles away",
    address: "5678 Oak Ave, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
    specialties: ["Transmission Service", "AC Service", "Oil Change"],
  },
  {
    id: "3",
    title: "Quick Service Center",
    rating: "4.7",
    reviews: "201",
    price: "$39.99",
    distance: "5.1 miles away",
    address: "9012 Elm St, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    specialties: ["Oil Change", "Tire Rotation", "Battery Service"],
  },
  {
    id: "4",
    title: "Elite Motors Service",
    rating: "5",
    reviews: "89",
    price: "$69.99",
    distance: "1.8 miles away",
    address: "3456 Pine St, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    specialties: [
      "Engine Diagnostics",
      "Transmission Service",
      "Brake Service",
    ],
  },
];




import type { SupplierProduct } from "@/types/site/suppliers"

export const products: SupplierProduct[] = [
  {
    id: 1,
    name: "Front Brake Pad Set - Ceramic",
    partNumber: "BP-2847-C",
    condition: "New - OEM",
    price: "$89.99",
    offers: "3 offers from $79.99",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    href: "/product/1",
    confirmedFit: true,
  },
  {
    id: 2,
    name: "Front Strut Assembly",
    partNumber: "SA-1923-L",
    condition: "New - Aftermarket",
    price: "$249.99",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400",
    href: "/product/2",
    confirmedFit: true,
  },
  {
    id: 3,
    name: "Engine Air Filter",
    partNumber: "AF-7781",
    condition: "New - OEM",
    price: "$34.99",
    offers: "2 offers from $29.99",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400",
    href: "/product/3",
    confirmedFit: true,
  },
]

export const tabs = ["products", "reviews", "about", "rfq"]

export const productFilters = {
  categories: ["All Categories", "Brake Systems", "Suspension", "Engine Parts", "Electrical"],
  conditions: ["All Conditions", "New - OEM", "New - Aftermarket", "Refurbished"],
  sorts: ["Most Relevant", "Price: Low to High", "Price: High to Low", "Newest First"],
}


