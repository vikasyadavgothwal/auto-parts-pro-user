"use client"

import Image from "next/image"
import Link from "next/link"
import {
  CircleCheck,
  Clock,
  MapPin,
  Package,
  Search,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Product = {
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

const products: Product[] = [
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

const tabs = ["products", "reviews", "about", "rfq"]

const productFilters = {
  categories: ["All Categories", "Brake Systems", "Suspension", "Engine Parts", "Electrical"],
  conditions: ["All Conditions", "New - OEM", "New - Aftermarket", "Refurbished"],
  sorts: ["Most Relevant", "Price: Low to High", "Price: High to Low", "Newest First"],
}

export function PartsSection() {
  return (
    <main className="pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/suppliers" className="transition-colors hover:text-white">
              Suppliers
            </Link>
            <span>/</span>
            <span className="text-white">Premium Auto Parts Inc.</span>
          </div>
        </div>

        <Card className="mb-8 rounded-2xl p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 border-border bg-white sm:h-32 sm:w-32">
              <Image
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop"
                alt="Premium Auto Parts Inc."
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                      Premium Auto Parts Inc.
                    </h1>

                    <Badge variant="success">
                      <CircleCheck className="h-4 w-4" />
                      <span>Verified</span>
                    </Badge>

                    <Badge variant="warning">
                      <Star className="h-4 w-4" />
                      <span>Top Rated</span>
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-brand-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Detroit, MI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Avg. response: 1.8 hrs</span>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-brand-success" />
                    <span className="text-lg font-bold text-brand-success">92</span>
                  </div>
                  <p className="mt-2 text-xs text-brand-muted">Trust Score</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button className="rounded-lg px-8 py-3 font-medium hover:bg-brand-primary-hover">
                  View Products
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border-border px-8 py-3 font-medium text-white hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/rfq">Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<Star className="h-5 w-5 text-primary" />}
            value="4.8"
            label="Average Rating"
            detail={
              <div className="flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <Star className="h-4 w-4 text-border" />
                <span className="ml-2 text-xs text-brand-muted">(1,234)</span>
              </div>
            }
          />
          <MetricCard
            icon={<Package className="h-5 w-5 text-primary" />}
            value="2,847"
            label="Orders Completed"
          />
          <MetricCard
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
            value="98%"
            label="Fulfillment Rate"
          />
          <MetricCard
            icon={<Clock className="h-5 w-5 text-primary" />}
            value="1.8 hrs"
            label="Response Time"
          />
        </div>

        <div className="mb-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CircleCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-white">
                  Showing parts for <span className="text-primary">2019 Toyota Camry SE</span>
                </p>
                <p className="mt-0.5 text-xs text-brand-muted">
                  Products are filtered for compatibility with your vehicle
                </p>
              </div>
            </div>

            <button
              type="button"
              className="text-left text-sm font-medium text-primary transition-colors hover:text-brand-primary-hover sm:text-right"
            >
              Change Vehicle
            </button>
          </div>
        </div>

        <div className="sticky top-20 z-10 mb-8 -mx-4 border-b border-border bg-brand-surface px-4 sm:-mx-6 sm:px-6">
          <div className="flex items-center gap-5 overflow-x-auto sm:gap-8">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={
                  index === 0
                    ? "border-b-2 border-primary py-4 text-sm font-medium whitespace-nowrap capitalize text-white"
                    : "border-b-2 border-transparent py-4 text-sm font-medium whitespace-nowrap capitalize text-brand-muted transition-colors hover:text-white"
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div id="products-section">
          <Card className="mb-6 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
              <div className="min-w-0 flex-1 lg:min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="h-10 bg-brand-surface py-2.5 pl-10 pr-4"
                  />
                </div>
              </div>

              <PartsFilterSelect
                items={productFilters.categories}
                className="w-full sm:w-auto sm:min-w-[180px]"
              />
              <PartsFilterSelect
                items={productFilters.conditions}
                className="w-full sm:w-auto sm:min-w-[180px]"
              />
              <PartsFilterSelect
                items={productFilters.sorts}
                className="w-full sm:w-auto sm:min-w-[180px]"
              />
            </div>
          </Card>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Link key={product.id} href={product.href} className="group block">
                <Card className="overflow-hidden transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                  <div className="relative aspect-square overflow-hidden bg-brand-surface">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    {product.confirmedFit ? (
                      <div className="mb-3">
                        <Badge variant="success" className="rounded-md px-2.5 py-1">
                          <CircleCheck className="h-3.5 w-3.5" />
                          <span>Confirmed Fit</span>
                        </Badge>
                      </div>
                    ) : null}

                    <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>

                    <p className="mb-3 text-sm text-brand-muted">
                      Part #: {product.partNumber}
                    </p>

                    <div className="mb-4 text-xs text-brand-muted">
                      {product.condition}
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {product.price}
                        </div>
                        {product.offers ? (
                          <div className="text-xs text-brand-muted">
                            {product.offers}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <Button className="w-full rounded-lg py-2.5 text-sm font-medium hover:bg-brand-primary-hover">
                      View Offers
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function MetricCard({
  icon,
  value,
  label,
  detail,
}: {
  icon: React.ReactNode
  value: string
  label: string
  detail?: React.ReactNode
}) {
  return (
    <Card className="p-6">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-brand-muted">{label}</div>
        </div>
      </div>
      {detail}
    </Card>
  )
}

function PartsFilterSelect({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  return (
    <div className={className}>
      <Select defaultValue={items[0]}>
        <SelectTrigger className="h-10 w-full bg-brand-surface py-2.5">
          <SelectValue placeholder={items[0]} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
