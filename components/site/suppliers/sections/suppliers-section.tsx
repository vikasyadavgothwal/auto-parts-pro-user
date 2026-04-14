"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Award,
  CircleCheck,
  Clock,
  MapPin,
  Search,
  Shield,
  Star,
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
import type { Supplier } from "@/types/site/suppliers"

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Premium Auto Parts Inc.",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    location: "Detroit, MI",
    responseTime: "1.8 hrs",
    rating: 4.8,
    reviews: "1,234",
    specialties: ["Brake Systems", "Suspension", "Engine Parts"],
    trustScore: 92,
    ordersCompleted: "2,847",
    verified: true,
    topRated: true,
    href: "/suppliers/parts",
  },
  {
    id: 2,
    name: "Quality Parts Direct",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    location: "Los Angeles, CA",
    responseTime: "2.4 hrs",
    rating: 4.6,
    reviews: "892",
    specialties: ["Electrical", "Body Parts", "Interior"],
    trustScore: 88,
    ordersCompleted: "1,923",
    verified: true,
    topRated: false,
    href: "/suppliers/parts",
  },
  {
    id: 3,
    name: "AutoZone Supply Co.",
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=200&h=200&fit=crop",
    location: "Chicago, IL",
    responseTime: "1.2 hrs",
    rating: 4.9,
    reviews: "2,156",
    specialties: ["OEM Parts", "Performance", "Maintenance"],
    trustScore: 95,
    ordersCompleted: "4,521",
    verified: true,
    topRated: true,
    href: "/suppliers/parts",
  },
  {
    id: 4,
    name: "Parts Express USA",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop",
    location: "Houston, TX",
    responseTime: "3.1 hrs",
    rating: 4.5,
    reviews: "678",
    specialties: ["Aftermarket", "Used Parts", "Salvage"],
    trustScore: 85,
    ordersCompleted: "1,456",
    verified: true,
    topRated: false,
    href: "/suppliers/parts",
  },
  {
    id: 5,
    name: "Reliable Auto Supply",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop",
    location: "Phoenix, AZ",
    responseTime: "2.0 hrs",
    rating: 4.7,
    reviews: "1,045",
    specialties: ["Transmission", "Engine Parts", "Drivetrain"],
    trustScore: 90,
    ordersCompleted: "2,234",
    verified: true,
    topRated: true,
    href: "/suppliers/parts",
  },
  {
    id: 6,
    name: "Metro Parts Warehouse",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    location: "Philadelphia, PA",
    responseTime: "2.8 hrs",
    rating: 4.4,
    reviews: "534",
    specialties: ["Body Parts", "Paint", "Collision"],
    trustScore: 83,
    ordersCompleted: "1,187",
    verified: true,
    topRated: false,
    href: "/suppliers/parts",
  },
]

export function SuppliersSection() {
  return (
    <main className="pb-20 pt-24">
      <div className="mb-12 border-b border-border bg-gradient-to-b from-brand-panel to-brand-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Find Trusted Auto Parts Suppliers
            </h1>
            <p className="text-base text-brand-muted sm:text-lg lg:text-xl">
              Browse verified suppliers, compare trust scores, and get the best
              parts for your vehicle
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Card className="mb-8 p-4 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:flex-wrap">
            <div className="min-w-0 flex-1 xl:min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                <Input
                  type="text"
                  placeholder="Search suppliers by name or specialty..."
                  className="h-12 bg-brand-surface py-3 pl-12 pr-4"
                />
              </div>
            </div>

            <FilterSelect
              placeholder="All Locations"
              items={["All Locations", "Michigan", "California", "Illinois", "Texas", "Arizona"]}
              className="w-full sm:w-auto sm:min-w-[160px]"
            />

            <FilterSelect
              placeholder="All Specialties"
              items={[
                "All Specialties",
                "Brake Systems",
                "Suspension",
                "Engine Parts",
                "Electrical",
                "Body Parts",
              ]}
              className="w-full sm:w-auto sm:min-w-[160px]"
            />

            <FilterSelect
              placeholder="Highest Trust Score"
              items={[
                "Highest Trust Score",
                "Highest Rating",
                "Most Orders",
                "Fastest Response",
              ]}
              className="w-full sm:w-auto sm:min-w-[200px]"
            />
          </div>
        </Card>

        <div className="mb-6">
          <p className="text-brand-muted">
            Showing <span className="font-medium text-white">6</span> verified
            suppliers
          </p>
        </div>

        <div className="space-y-4">
          {suppliers.map((supplier) => {
            const isHighTrust = supplier.trustScore >= 90

            return (
              <Card
                key={supplier.id}
                className="group block p-4 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 sm:p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-border bg-white transition-colors group-hover:border-primary">
                    <Image
                      src={supplier.image}
                      alt={supplier.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                          <Link
                            href={supplier.href}
                            className="truncate text-xl font-bold text-white transition-colors group-hover:text-primary sm:text-2xl"
                          >
                            {supplier.name}
                          </Link>

                          {supplier.verified ? (
                            <Badge variant="success" className="px-1.5 py-0.5 text-xs">
                              <CircleCheck className="h-3 w-3" />
                              <span>Verified</span>
                            </Badge>
                          ) : null}

                          {supplier.topRated ? (
                            <Badge variant="warning" className="px-1.5 py-0.5 text-xs">
                              <Star className="h-3 w-3" />
                              <span>Top Rated</span>
                            </Badge>
                          ) : null}
                        </div>

                        <div className="mb-3 flex flex-col gap-2 text-sm text-brand-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{supplier.location}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Responds in {supplier.responseTime}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-medium text-white">
                              {supplier.rating}
                            </span>
                            <span>({supplier.reviews})</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {supplier.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="rounded-md border-border bg-brand-surface px-2.5 py-1 text-xs text-brand-muted"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-left xl:w-[110px] xl:flex-shrink-0 xl:text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <Shield
                            className={`h-4 w-4 ${
                              isHighTrust ? "text-brand-success" : "text-brand-warning"
                            }`}
                          />
                          <span
                            className={`text-lg font-bold ${
                              isHighTrust ? "text-brand-success" : "text-brand-warning"
                            }`}
                          >
                            {supplier.trustScore}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-brand-muted">Trust Score</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:gap-6">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {supplier.ordersCompleted}
                          </div>
                          <div className="text-xs text-brand-muted">
                            Orders Completed
                          </div>
                        </div>
                      </div>

                      <div className="flex-1" />

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          asChild
                          className="rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-brand-primary-hover"
                        >
                          <Link href={supplier.href}>View Products</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-lg border-border px-6 py-2.5 text-sm font-medium text-white hover:border-primary hover:bg-primary/10"
                        >
                          <Link href="/rfq">Request Quote</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="rounded-lg border-border px-8 py-3 font-medium text-white hover:border-primary hover:bg-primary/10"
          >
            Load More Suppliers
          </Button>
        </div>
      </div>
    </main>
  )
}

function FilterSelect({
  placeholder,
  items,
  className,
}: {
  placeholder: string
  items: string[]
  className?: string
}) {
  return (
    <div className={className}>
      <Select defaultValue={items[0]}>
        <SelectTrigger className="h-12 w-full bg-brand-surface py-3">
          <SelectValue placeholder={placeholder} />
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
